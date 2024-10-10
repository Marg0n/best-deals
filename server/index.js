// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Configuration Start
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_API_KEY_SERVER);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Configuration End
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Middleware Start
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://best-deal-909.web.app",
      "https://magenta-peony-5d02de.netlify.app",
      
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// ===================================
// CookieParser Options
// ===================================
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

// ===================================
// jwt validation middleware
// ===================================
const verifyToken = async (req, res, next) => {
  const initialToken = await req.headers.authorization;

  // ===================================
  // for local storage only
  // ===================================
  if (!initialToken) {
    return res.status(401).send({ message: "Unauthorized access!!" });
  }

  // ===================================
  // validate local storage token
  // ===================================
  const token = await initialToken.split(" ")[1];

  // const token = req?.cookies?.token;
  // console.log('token :::>', token)

  if (!token) {
    return res.status(401).send({ message: "Unauthorized access..." });
  }

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log("err token :::>", err);
        return res.status(401).send({ message: "Unauthorized access" });
      }
      // console.log(decoded)
      req.decoded = decoded;
      next();
    });
  }
};

// ===================================
// creating Token
// ===================================
app.post("/jwt", async (req, res) => {
  const user = req.body;
  // console.log(user);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10h",
  });

  res
    // .cookie("token", token, cookieOptions)
    // .send({ success: true });
    .send({ token });
});

//clearing Token
app.get("/logout", async (req, res) => {
  const user = req.body;
  console.log("logging out", user);
  res
    // .clearCookie("token", { ...cookieOptions, maxAge: 0 })
    .send({ success: true });
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Middleware End
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// MongoDB connection Start
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zuxua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ===================================
// Check if the server is up and running
// ===================================
app.get("/", (req, res) => {
  res.send("Best Deal Is A Running");
});

app.listen(port, () => {
  console.log(`Best Deal is listening on port ${port}`);
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// MongoDB connection End
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

async function run() {
  try {
    await client.connect();

    // ===================================
    // DB Connection
    // ===================================

    const usersCollection = client.db("BestDeals").collection("UserCollection");
    const productCollection = client.db("BestDeals").collection("ProductCollection");
    const orderCollection = client.db("BestDeals").collection("OrderManagement");

    // ==================================
    // Admin verify
    // ==================================
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      // console.log('from verify admin -->', email);
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role === "Admin";

      if (!isAdmin) {
        return res.status(403).send({ message: "Unauthorized!!" });
      }

      next();
    };

    // =================================
    // Stripe payment connection
    // =================================

    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const { price } = req.body;

      const amounts = parseFloat(price * 100);


      // return if...
      // if (amounts <= 0) return

      // =================================
      // Create a PaymentIntent with the order amount and currency
      // =================================
      const paymentIntent = await stripe.paymentIntents.create({
        // amount: calculateOrderAmount(amounts),
        amount: amounts,
        currency: "usd",
        payment_method_types: ["card"],
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default. it cannot be used with 'payment_method_types' parameter
        // automatic_payment_methods: {
        //   enabled: true,
        // },
      });



      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // API Connections Starts
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // ==================================
    // Users registration
    // ==================================
    app.post("/users", async (req, res) => {
      try {
        const newUser = req.body;


        // Check if user already exists
        const query = await usersCollection.findOne({ email: newUser?.email });

        if (!query) {
          // const newUser = req.body;
          const result = await usersCollection.insertOne(newUser);
          res.send(result);
        } else {
          const mail = newUser?.email;
          const results = await usersCollection.find({ email: mail }).toArray();
          res.send(results);
        }
      } catch {
        // If an error occurs during execution, catch it here
        console.error("Error updating user status:", err);
        // Send an error response to the client
        res
          .status(500)
          .json({ message: "Internal server error during registration" });
      }
    });

    // ==================================
    // Users login / profile data
    // ==================================
    app.get("/users/:email", async (req, res) => {
      const mail = req.params?.email;
      const results = await usersCollection.find({ email: mail }).toArray();
      res.send(results);
    });

    // ==================================
    // Users profiles' Purchase History data
    // ==================================
    app.post("/purchaseHistory/:email", async (req, res) => {
      const mail = req.params?.email;
      const body = req?.body;
      try {
        const result = await usersCollection.updateOne(
          { email: mail },
          { $push: { purchaseHistory: body } },
          { upsert: true }
        );

        res.send(result);
      } catch (error) {
        console.error('Error inserting purchase history:', error);
        res.status(500).send({ error: 'Failed to insert purchase history' });
      }
    });

    // ==================================
    // all users data
    // ==================================
    app.get('/allUsers', async function (req, res) {
      const vendor = req?.query?.role;
      let query = {};
      if (vendor) {
        query = { role: { $eq: vendor } };
      }
      const results = await usersCollection.find(query).toArray();
      res.send(results);
    })

    // ==================================
    // Users profiles' Billing Address data
    // ==================================
    app.post("/billingAddress/:email", async (req, res) => {
      const mail = req.params?.email;
      const body = req?.body;
      try {
        const result = await usersCollection.updateOne(
          { email: mail },
          { $push: { billingAddress: body } },
          { upsert: true }
        );

        res.send(result);
      } catch (error) {
        console.error('Error inserting billing address:', error);
        res.status(500).send({ error: 'Failed to insert billing address' });
      }
    });

    // ==================================
    // All products API
    // ==================================

    app.get("/all-products", async (req, res) => {
      const search = req.query.search || "";
      const minPrice = parseFloat(req.query.minPrice) || 0;
      const maxPrice = parseFloat(req.query.maxPrice) || Number.MAX_VALUE;
      const isFeatured = req.query.isFeatured === "true";
      const category = req.query.selectedCategory
        ? req.query.selectedCategory
        : "";

      // search by products name and filter by price
      let query = {
        productName: { $regex: search, $options: "i" },
        price: { $gte: minPrice, $lte: maxPrice },
      };

      // If the client sets the category, then filter by category from MongoDB
      if (category) {
        query.category = category;
      }

      // If the `isFeatured` query param is passed and it's true, filter by `isFeatured`
      if (req.query.isFeatured) {
        query.isFeatured = isFeatured; // Filter for featured products
      }

      const results = await productCollection.find(query).toArray();
      res.send(results);
    });

    // ==================================
    // get all products
    // ==================================

    app.get('/allVendorProducts', async (req, res) => {
      const results = await productCollection.find().toArray();
      res.send(results);
    })

    // ==================================
    // Get All orders
    // ==================================
    app.get("/all-orders", async (req, res) => {
      const results = await orderCollection.find().toArray();
      res.send(results);
    })

    // ==================================
    // Post Products
    // ==================================

    app.post("/all-products", async (req, res) => {
      const postProduct = req.body;
      const results = await productCollection.insertOne(postProduct);
      res.send(results);
    })

    // ==================================
    // Patch Users' last login
    // ==================================
    app.patch("/lastLogin/:email", async (req, res) => {
      try {
        const mail = req.params?.email;
        const updateBody = req.body;
        const query = { email: mail };
        const updateDoc = {
          $set: {
            lastLogin: updateBody.lastLogin,
          },
        };
        const results = await usersCollection.updateOne(query, updateDoc);
        res.send(results);
      } catch {
        // If an error occurs during execution, catch it here
        console.error("Error updating user status:", err);
        // Send an error response to the client
        res
          .status(500)
          .json({ message: "Internal server error from last login" });
      }
    });
//.......................
app.put('/vendors/:id/warning', async (req, res) => {
  const { id } = req.params;
  const { isWarning } = req.body;

  // console.log('Received vendor ID:', id);
  // console.log('Received isWarning value:', isWarning);

  // Ensure ID is valid
  if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid vendor ID format' });
  }

  // Ensure isWarning is a boolean
  if (typeof isWarning !== 'boolean') {
      return res.status(400).json({ message: 'Invalid isWarning value' });
  }

  // Perform the update
  try {
      const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { isWarning: isWarning } }
      );

      if (result.modifiedCount > 0) {
          return res.status(200).json({ message: 'Warning status updated successfully' });
      } else {
          return res.status(404).json({ message: 'Vendor not found' });
      }
  } catch (error) {
      console.error('Error updating warning status:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/vendorss/:id/ban', async (req, res) => {
  const { id } = req.params;
  const { isBanned } = req.body;

  // Validate vendor ID and isBanned value
  if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid vendor ID format' });
  }
  if (typeof isBanned !== 'boolean') {
      return res.status(400).json({ message: 'Invalid isBanned value' });
  }

  try {
      const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { isBanned: isBanned } }
      );

      if (result.modifiedCount > 0) {
          return res.status(200).json({ message: 'Ban status updated successfully' });
      } else {
          return res.status(404).json({ message: 'Vendor not found' });
      }
  } catch (error) {
      console.error('Error updating ban status:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/Users/:id/warning', async (req, res) => {
  const { id } = req.params;
  const { isWarning } = req.body;

  // console.log('Received vendor ID:', id);
  // console.log('Received isWarning value:', isWarning);

  // Ensure ID is valid
  if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid vendor ID format' });
  }

  // Ensure isWarning is a boolean
  if (typeof isWarning !== 'boolean') {
      return res.status(400).json({ message: 'Invalid isWarning value' });
  }

  // Perform the update
  try {
      const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { isWarning: isWarning } }
      );

      if (result.modifiedCount > 0) {
          return res.status(200).json({ message: 'Warning status updated successfully' });
      } else {
          return res.status(404).json({ message: 'Vendor not found' });
      }
  } catch (error) {
      console.error('Error updating warning status:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/Userss/:id/ban', async (req, res) => {
  const { id } = req.params;
  const { isBanned } = req.body;

  // Validate user ID and isBanned value
  if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid vendor ID format' });
  }
  if (typeof isBanned !== 'boolean') {
      return res.status(400).json({ message: 'Invalid isBanned value' });
  }

  try {
      const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { isBanned: isBanned } }
      );

      if (result.modifiedCount > 0) {
          return res.status(200).json({ message: 'Ban status updated successfully' });
      } else {
          return res.status(404).json({ message: 'Vendor not found' });
      }
  } catch (error) {
      console.error('Error updating ban status:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/usersDelete/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount > 0) {
          res.status(200).json({ message: 'User deleted successfully' });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/vendorsDelete/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount > 0) {
          res.status(200).json({ message: 'User deleted successfully' });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/totalUsers', async (req, res) => {
  try {
      const totalUsers = await usersCollection.countDocuments({ role: 'User' }); // Adjust query if needed (e.g., filtering by role)
      res.json({ totalUsers });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching total users', error });
  }
});

app.get('/totalVendors', async (req, res) => {
  try {
      const totalVendors = await usersCollection.countDocuments({ role: 'Vendor' }); // Adjust query if needed
      res.json({ totalVendors });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching total vendors', error });
  }
});
app.get('/totalTransactionss', async (req, res) => {
  try {
      const totalTransactions = await orderCollection.countDocuments({});
      
      const totalAmountResult = await orderCollection.aggregate([
          {
              $group: {
                  _id: null,
                  totalAmount: { $sum: "$totalAmount" }
              }
          }
      ]).toArray();

      const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;
      res.json({ totalTransactions, totalAmount });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching total transactions or amount', error });
  }
});



    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // fetch comments
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    app.get('/api/products/:id', async (req, res) => {
      const productId = req.params.id;

      try {
        // Find product using string _id
        const product = await productCollection.findOne({ _id: new ObjectId(productId) });

        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // add comments
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    app.post('/api/products/:id/comments', async (req, res) => {
      const productId = req.params.id;
      const { comment, userRating, name, userPhoto } = req.body;

      // Check if all required fields are provided
      if (!comment || !userRating || !name || !userPhoto) {
        return res.status(400).json({ message: 'Missing fields' });
      }

      const newComment = { name, userPhoto, comment, userRating: userRating };

      try {
        const result = await productCollection.updateOne(
          { _id: new ObjectId(productId) },
          { $push: { comments: newComment } }
        );

        if (result.modifiedCount === 1) {
          res.status(200).json({ message: 'Comment added successfully' });
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });



    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // API Connections End
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    app.use("/user", async (req, res) => { });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
