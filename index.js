const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

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
    const foodCollection = client.db(`${process.env.DB_NAME}`).collection("Foods");
    
    app.post('/addFood', (req, res) => {
      foodCollection.insertOne(req.body)
      .then(result => {
        res.send(result.insertedCount > 0);
      })
    })

    app.get('/foods', (req, res) => {
      foodCollection.find({})
      .toArray((err, foods) => {
        res.send(foods)
      })
    })

    app.delete('/deleteFood', (req, res) => {
      foodCollection.deleteOne({_id: ObjectID(req.body.id)})
      .then(result => {
        res.send(result.deletedCount > 0)
      })
    })

    app.get('/singleFood/:id', (req, res) => {
      foodCollection.find({_id: ObjectID(req.params.id) })
      .toArray((err, food) => {
        res.send(food[0])
      })
    })

  });
  
  

app.listen(process.env.PORT || 8080);