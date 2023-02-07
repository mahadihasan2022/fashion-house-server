const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h8k01.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const database = client.db("fashionHouse");
    const usersCollection = database.collection("users");
    const forumCollection = database.collection("forum");
    const applyEmployeeCollection = database.collection("applyEmployee");
    const productsCollection = database.collection("Products");
    const discountProductsCollection = database.collection("discount");
    const newProductsCollection = database.collection("newProducts");
    
    app.get("/products", async (req, res) => {
        const query = {};
        const cursor = productsCollection.find(query);
        const products = await cursor.toArray();
        res.json(products);
      });
    app.get("/discountProducts", async (req, res) => {
        const query = {};
        const cursor = discountProductsCollection.find(query);
        const products = await cursor.toArray();
        res.json(products);
      });
    app.get("/newProducts", async (req, res) => {
        const query = {};
        const cursor = newProductsCollection.find(query);
        const products = await cursor.toArray();
        res.json(products);
      });
      app.get("/products/:id", async (req, res) => {
        const category = req.params.id;
        const query = { category };
        const cursor = productsCollection.find(query);
        const product = await cursor.toArray();
        res.json(product);
      });
      app.get("/products/brand/:id", async (req, res) => {
        const brand = req.params.id;
        const query = { brand };
        const cursor = productsCollection.find(query);
        const product = await cursor.toArray();
        res.json(product);
      });
      app.get("/products/size/:id", async (req, res) => {
        const size = req.params.id;
        const query = { size };
        const cursor = productsCollection.find(query);
        const product = await cursor.toArray();
        res.json(product);
      });
      app.get("/products/color/:id", async (req, res) => {
        const color = req.params.id;
        const query = { color };
        const cursor = productsCollection.find(query);
        const product = await cursor.toArray();
        res.json(product);
      });
      app.get("/products/variants/:id", async (req, res) => {
        const variants = req.params.id;
        const query = { variants };
        const cursor = productsCollection.find(query);
        const product = await cursor.toArray();
        res.json(product);
      });
      app.get("/products/subCategory/:id", async (req, res) => {
        const subCategory = req.params.id;
        const query = { subCategory };
        const cursor = productsCollection.find(query);
        const product = await cursor.toArray();
        res.json(product);
      });
    
 
    
    
    
    
    
    
    
    
    
     app.post("/addPromotion", async (req, res) => {
       const getPost = req.body;
       const result = await discountProductsCollection.insertOne(getPost);
       res.send(result);
      });
    
    
    
    
      // app.get("/addPromotion", async (req, res) => {
      //   const email = req.params.email;
      //   const query = { email };
      //   const user = await discountProductsCollection.findOne(query);
      //   res.send(user);
      // });
    
      // app.put("/addPromotion", async (req, res) => {
      //   const email = req.params.email;
      //   const user = req.body;
      //   const filter = { email: email };
      //   const options = { upsert: true };
      //   const updateDoc = {
      //     $set: user,
      //   };
      //   const result = await discountProductsCollection.updateOne(filter, updateDoc, options);
      //   res.send({ result });
      // });
      app.get("/forum/:email", async (req, res) => {
        const email = req.params.email;
        const query = { email };
        const user = await forumCollection.findOne(query);
        res.send(user);
      });
    
      app.put("/forum/:email", async (req, res) => {
        const email = req.params.email;
        const user = req.body;
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
          $set: user,
        };
        const result = await forumCollection.updateOne(filter, updateDoc, options);
        res.send({ result });
      });
      app.get("/applyEmployee/:email", async (req, res) => {
        const email = req.params.email;
        const query = { email };
        const user = await applyEmployeeCollection.findOne(query);
        res.send(user);
      });
    
      app.put("/applyEmployee/:email", async (req, res) => {
        const email = req.params.email;
        const user = req.body;
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
          $set: user,
        };
        const result = await applyEmployeeCollection.updateOne(filter, updateDoc, options);
        res.send({ result });
      });
    
    
    app.get("/user", async (req, res) => {
      const getUserEmail = req?.query?.email;
      if (getUserEmail) {
        const query = { email: getUserEmail };
        const user = await usersCollection.findOne(query);
        res.json(user);
      } else {
        const cursor = usersCollection.find({});
        const users = await cursor.toArray();
        res.json(users);
      }
    });

    app.put("/user", async (req, res) => {
      const addUser = req.query.addUser;
      const addFriends = req.query.addFriends;
      const options = { upsert: true };
      if (addUser) {
        const newUsers = req.body;
        const filter = { email: addUser };
        const updateDoc = {
          $set: {
            name: newUsers?.name,
            email: newUsers?.email,
            img: newUsers?.img,
          },
        };
        const result = await usersCollection.updateOne(
          filter,
          updateDoc,
          options
        );
        // console.log(result)
        res.send(result);
      }
      if (addFriends) {
        const newFriends = req.body;
        // console.log(newFriends)
        const filter = { email: addFriends };
        const updateDoc = {
          $set: { friends: newFriends },
        };
        const result = await usersCollection.updateOne(
          filter,
          updateDoc,
          options
        );
        // console.log(result)
        res.send(result);
      }
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
// const port = process.env.PORT || 5000;
// require('dotenv').config()

// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ucfjq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// async function run() {
//     try {
//         await client.connect();
//         const database = client.db("boring_chat");
//         const usersCollection = database.collection("users");
//         const postsCollection = database.collection("posts");
//         const messagesCollection = database.collection("messages");

//         app.get('/users', async (req, res) => {
//             const getUserEmail = req?.query?.email;
//             if (getUserEmail) {
//                 const query = { email: getUserEmail };
//                 const user = await usersCollection.findOne(query);
//                 res.json(user);
//             }
//             else {
//                 const cursor = usersCollection.find({});
//                 const users = await cursor.toArray();
//                 res.json(users);
//             }
//         });

//         app.get('/posts', async (req, res) => {
//             const cursor = postsCollection.find({});
//             const posts = await cursor.toArray();
//             res.json(posts);
//         });

//         app.get('/userPosts/:userEmail', async (req, res) => {
//             const getUserEmail = req.params.userEmail;
//             const query = { email: getUserEmail };
//             const cursor = postsCollection.find(query);
//             const posts = await cursor.toArray();
//             res.json(posts);

//         });

//         app.get('/sendMessage/:email', async (req, res) => {
//             const getUserEmail = req.params.email;
//             const query = { senderEmail: getUserEmail };
//             const cursor = messagesCollection.find(query);
//             const message = await cursor.toArray();
//             res.json(message);
//         })

//         app.get('/receiveMessage/:email', async (req, res) => {
//             const getUserEmail = req.params.email;
//             const query = { receiverEmail: getUserEmail };
//             const cursor = messagesCollection.find(query);
//             const message = await cursor.toArray();
//             res.json(message);
//         })

//         app.post('/sendMessage', async (req, res) => {
//             const getMessage = req.body;
//             const result = await messagesCollection.insertOne(getMessage);
//             res.send(result);
//         })

//         app.post('/posts', async (req, res) => {
//             const getPost = req.body;
//             const result = await postsCollection.insertOne(getPost);
//             res.send(result);
//         })

//         app.put('/users', async (req, res) => {
//             const addUser = req.query.addUser;
//             const addFriends = req.query.addFriends;
//             const options = { upsert: true };
//             if (addUser) {
//                 const newUsers = req.body;
//                 const filter = { email: addUser };
//                 const updateDoc = {
//                     $set: { name: newUsers?.name, email: newUsers?.email, img: newUsers?.img },
//                 };
//                 const result = await usersCollection.updateOne(filter, updateDoc, options);
//                 // console.log(result)
//                 res.send(result)
//             }
//             if (addFriends) {
//                 const newFriends = req.body;
//                 // console.log(newFriends)
//                 const filter = { email: addFriends };
//                 const updateDoc = {
//                     $set: { friends: newFriends },
//                 };
//                 const result = await usersCollection.updateOne(filter, updateDoc, options);
//                 // console.log(result)
//                 res.send(result)
//             }
//         })

//         app.put('/posts/comment/:id', async (req, res) => {
//             const getId = req.params.id;
//             const postComments = req.body;
//             const filter = { _id: ObjectId(getId) };
//             const updateDoc = {
//                 $set: {
//                     postComments
//                 },
//             };
//             const result = await postsCollection.updateMany(filter, updateDoc);
//             console.log(`Updated ${result.modifiedCount} documents`);
//             res.send(result)
//         })

//     } finally {
//         // await client.close();
//     }
// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });
// app.listen(port, () => {
//     console.log('listening on port ', port)
// })
