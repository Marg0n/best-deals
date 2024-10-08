// // Function to save state to localStorage
// export const saveState = (state, userId) => { 
//     console.log(userId);
    
//     try {
//         // if there is no user then return, nothing to save in local storage
//         if (!userId) return;

//         const serializedState = JSON.stringify(state);
//         // Save the state under 'cartState' with userId
//         localStorage.setItem(`cartState-${userId}`, serializedState);
//     } catch (e) {
//         console.warn('Could not save state', e);
//     }
// };

// // Function to load state from localStorage
// export const loadState = (userId) => {
//     try {
//         // If there is no user, return undefined
//         if (!userId) return undefined;

//         const serializedState = localStorage.getItem(`cartState-${userId}`);
//         if (serializedState === null) {
//             // If no state in localStorage, return undefined
//             return undefined;
//         }
//         return JSON.parse(serializedState);
//     } catch (e) {
//         console.warn('Could not load state', e);
//         return undefined;
//     }
// };
