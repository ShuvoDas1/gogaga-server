const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()



const app = express()
app.use(cors());
app.use(bodyParser.json());
const port = 5000


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vktpy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
client.connect(err => {
  const collection = client.db("GoGaGa").collection("userInfo");

  app.post('/addCollection', (req, res) =>{
      console.log(req.body);
      collection.insertOne(req.body)
      .then(result =>{
        res.send(result)
      })
  })

  app.get('/allCollections', (req,res)=>{
      const search = req.query.search;
      collection.find({name: {$regex: search}})
      .toArray((err, documents)=>{
          res.send(documents);
      } )
  })


  
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)