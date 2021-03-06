var auth;
if(process.env.env_auth){
    auth = {
        user: process.env.user,
        pass: process.env.pass,
        db: process.env.db
    };
}
else{
    auth = require('./auth.js');
}
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://"+auth.user + ":" + auth.pass + "@cluster0.pzcsk.mongodb.net/"+auth.db+"?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

var connected = false;
var collection;

const DEFAULT_NAME = "EMPTY";
client.connect(err => {
    if(err){
        console.log("Error connecting to db");
        return;
    }

    console.log("Successfully connected to db.");
    connected = true;
    collection = client.db("scores").collection("general_scores");
  //client.close();
});

module.exports.addScore = async function(score, callback){
    if(!connected){
        callback(false);
        return;
    }
    var result = await collection.insertOne({
        name: DEFAULT_NAME,
        score: score
    }).then(function(result, err){
        var success = (result.result.ok == 1) ? true : false;
        console.log("New score added with success: " + String(success));
        callback(success);
        
    }).catch(function(){
        callback(false);
    });
};

module.exports.getRank = function(score, callback){
    if(!connected){
        callback(0);
        return;
    }
    //Get all records with a score greater than the passed score
    collection.find({score: {$gt: score}}, {_id: 0, name: 0, score: 1}).toArray(function(err, result){
        if(err){
            console.log("Error retrieving rank from db: "+ err);
            callback(0);
            return;
        }
        console.log("Rank successfully obtained");

        //Results will be filled with scores better than the queried one
        callback(result.length + 1);
    });
}

function rankScores(arr){
    //Sort values
    function compare(b, a){
        if(a.score < b.score){
            return -1;
        }
        else if(a.score > b.score){
            return 1;
        }
        return 0;
    }
    var sortedArr = arr.sort(compare);
    
    var prevVal = 0;
    var prevRank = 1;
    //rank vals
    for(var i = 0; i < sortedArr.length; i++){
        if(sortedArr[i].score == prevVal){
            sortedArr[i].rank = prevRank;
        }
        else{
            sortedArr[i].rank = i + 1;
            prevRank = i + 1;
        }
        prevVal = sortedArr[i].score;
    }
    return sortedArr;
}
module.exports.getAllScores = function(callback){
    if(!connected){
        callback(false);
        return;
    }
    collection.find({score:{$type: "int"}}, {}).toArray(function(err, result){
        if(err){
            console.log("Error retrieving all records from db: "+ err);
            callback(false);
            return;
        }
        console.log("All results successfully obtained");

        //Results will be filled with scores better than the queried one
        callback(rankScores(result));
    });
}

module.exports.setName = function(id, name, callback){
    if(!connected){
        callback(0);
        return;
    }
    collection.updateOne({_id:ObjectID(id)},{$set:{name:name}}).then(res => {
        callback(res.matchedCount);
    });
};

module.exports.deleteScore = function(id, callback){
    if(!connected){
        callback(0);
        return;
    }
    collection.deleteOne({_id:ObjectID(id)}, true).then( res=>{
        callback(res.nRemoved);
    });
}