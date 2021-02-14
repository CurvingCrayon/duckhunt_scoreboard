const express = require('express');
const path = require('path');
const cors = require('cors');

const mongo = require('./mongo.js');
const app = express();


app.use(cors());

// app.get('/', function(req, res) { //Route main page
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
app.get('/setName/:id/:name',function (req,res){
    mongo.setName(req.params.id, req.params.name, function(count){
        res.send(String(count));
    });
}); 
app.get('/score/:score', function(req, res) { //Route main page
    //req.params.score

    var score = Number(req.params.score);
    if(isNaN(score)){
        res.status(200).send("0");
        return;
    }
    
    console.log("New score received: " + score);
    mongo.addScore(score, function(success){
        if(!success){
            res.status(200).send("0");
            console.log("Failed to add score.");
            return;
        }
        console.log("Getting rank...");
        mongo.getRank(score, function(rank){
            res.status(200).send(String(rank));
        });
    });
});

app.get('/getScores', function(req, res){
    mongo.getAllScores(function(result){
        if(result){
            var obj = {
                scores: result
            };
            res.send(JSON.stringify(obj));
        }
        else{
            res.status(200).send("0");
        }
        
    });
});
app.get('/deleteScore/:id', function(req, res){
    mongo.deleteScore(req.params.id, function(num){
        res.status(200).send(String(num));
    });
});
//===========
// Begin
//===========

app.listen((process.env.PORT || 5000), function(){
	console.log("API Server Started on port " + (process.env.PORT || 5000));
});