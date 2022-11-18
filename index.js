const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h8k01.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const database = client.db("fashionHouse");
        const usersCollection = database.collection("users");
           app.get('/user', async (req, res) => {
            const getUserEmail = req?.query?.email;
            if (getUserEmail) {
                const query = { email: getUserEmail };
                const user = await usersCollection.findOne(query);
                res.json(user);
            }
            else {
                const cursor = usersCollection.find({});
                const users = await cursor.toArray();
                res.json(users);
            }
        });
        
        app.put('/user', async (req, res) => {
            const addUser = req.query.addUser;
            const addFriends = req.query.addFriends;
            const options = { upsert: true };
            if (addUser) {
                const newUsers = req.body;
                const filter = { email: addUser };
                const updateDoc = {
                    $set: { name: newUsers?.name, email: newUsers?.email, img: newUsers?.img },
                };
                const result = await usersCollection.updateOne(filter, updateDoc, options);
                // console.log(result)
                res.send(result)
            }
            if (addFriends) {
                const newFriends = req.body;
                // console.log(newFriends)
                const filter = { email: addFriends };
                const updateDoc = {
                    $set: { friends: newFriends },
                };
                const result = await usersCollection.updateOne(filter, updateDoc, options);
                // console.log(result)
                res.send(result)
            }
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})












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