const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cjo8u.mongodb.net/${process.env.DB_NAME}retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Hello I am now working on TheGem Restaurant Project')
})

client.connect(err => {
    const foodCollection = client.db(`${process.env.DB_NAME}`).collection("devices");
    console.log('database connected')
  });
  
  

app.listen(process.env.PORT || 8080);