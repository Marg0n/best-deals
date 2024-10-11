import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "./../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // get the user
  const [user, setUser] = useState(null);

  // loading
  const [loading, setLoading] = useState(true);
  // console.log(loading)
  // console.log("user ase?", user)

  // social auth Providers
  const googleProvider = new GoogleAuthProvider();

  // create a user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login the user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const googleLogin = async () => {
    setLoading(true);
    return await signInWithPopup(auth, googleProvider);
  };

  // Update user Profile
  const updateUserProfile = async (name, image) => {
    return await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  // logout onauthstatechange
  const loggedOut = async () => {
    // setLoading(true);
    // await axios(`${import.meta.env.VITE_SERVER}/logout`,{withCredentials: true});
    // setUser(null);
    // return signOut(auth);
    try {

      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/logout`,
        {
          withCredentials: true,
        }

      );

      if (response.data.success) {
        setUser(null);
        await signOut(auth);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get token from server
  const getToken = async email => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER}/jwt`,
      { email },
      { withCredentials: true }
    )
    // console.log(data)
    if (data.token) {
      await localStorage.setItem('token', data.token)
    }
    return data
  }

  // Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {

      setUser(currentUser);
      //token get
      if (currentUser) {
        await getToken(currentUser.email)
      } else {
        await localStorage.removeItem('token')
      }
      setLoading(false);
    });

    // cleanup function
    return () => {
      return unsubscribe();
  };
}, []);

// console.log(user);

const userInfo = {
  createUser,
  signInUser,
  googleLogin,
  loggedOut,
  user,
  loading,
  setLoading,
  updateUserProfile,
};

return (
  <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
);
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
