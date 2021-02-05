const auth = require('./auth.js');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://"+auth.user + ":" + auth.pass + "@cluster0.pzcsk.mongodb.net/"+auth.db+"?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    if(err){
        console.log("Error connecting to db");
    }
    else{
        console.log("Successfully connected to db.");
    }

    
  const collection = client.db("scores").collection("general_scores");
  collection.find().toArray(function(err, result){
    if(err){
        console.log("Error retrieving records from db: "+ err);
        return;
    }
    console.log("results: ");
    console.log(result);
  });
  // perform actions on the collection object
  
  client.close();
});
