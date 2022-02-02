const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9uobc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = process.env.PORT || 4040

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors())
app.use(express.json())

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log(err);
    const registeredUserscollection = client.db("usersDatabase").collection("registeredUsers");
    const storeUsersInfocollection = client.db("usersDatabase").collection("userInfo");


    app.post('/resgisterUser', (req, res)=>{
        const data = req.body;
        registeredUserscollection.insertOne(data)
        .then((err, document) =>{
            res.send(document);
        })
    })

    app.post('/storeUserInfo', (req, res)=>{
        const data = req.body;
        console.log(data);
        storeUsersInfocollection.insertOne(data)
        .then((err, document) =>{
            console.log(err);
            res.send(document);
        })
    })

    app.get('/getUserInfo',(req, res) =>{
        storeUsersInfocollection.find({},{name:1, email: 1, address:1, income:0, maritalStatus:0, registrationNumber:0,date:0})
        .toArray((err, document) => {
            res.send(document)
            console.log(document);
        })
    })


});



// undone multiple connectionDB, mognoDB feild filtering, nodemailer email varification"    

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})