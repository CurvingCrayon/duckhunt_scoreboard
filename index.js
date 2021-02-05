const express = require('express');
const path = require('path');

const app = express();




// app.get('/', function(req, res) { //Route main page
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
app.get('/score/:score', function(req, res) { //Route main page
    //req.params.score
    var score = req.params.score;
    var rank = 34;
    res.status(200).send(String(rank));
    console.log("new score: " + score + ", rank: " + rank);
});

//===========
// Begin
//===========

app.listen((process.env.PORT || 5000), function(){
	console.log("API Server Started on port " + (process.env.PORT || 5000));
});