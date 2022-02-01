const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://adminDashboard:124qazxsw@cluster0.9uobc.mongodb.net/usersDatabase?retryWrites=true&w=majority`;

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


    app.post('/resgisterUser', (req, res)=>{
        const data = req.body;
        registeredUserscollection.insertOne(data)
        .then((err, document) =>{
            res.send(document);
        })
    })


});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})