const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const AuthRoutes = require("./Routes/AuthRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config(); // .env file
const port = 8888;
const url =
  "mongodb+srv://kishoremurgan0077:bO2EyEAZtlxK5JnX@cluster0.29k33hr.mongodb.net/?retryWrites=true&w=majority";
const app = express();
// app.use(express.json());   // middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", AuthRoutes); // importing routes

// mongoose.connect(process.env.MONGODB_URI)

const uri = "mongodb+srv://kishoremurgan0077:bO2EyEAZtlxK5JnX@cluster0.29k33hr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.listen(port, () => {
  console.log(`Server is running on ${port}`); // checking port
});
