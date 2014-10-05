var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var model = require('./model');

// Serve static files

app.use('/static', express.static(__dirname + '/static'));

// Routers

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname,'title.html'));
});

// Host function

app.get('/host', function(req, res){
  res.sendFile(path.join(__dirname,'host.html'));
});

// Join function

app.get('/join', function(req, res){
  res.sendFile(path.join(__dirname,'join.html'));
});

app.get('/upload', uploadFile);

app.get('/upload', uploadFile);

// Core files

function makeRoom(req, res) {

}

function uploadFile(req, res) {
  
}

function updateGridPositions(req, res) {

}

function tryDistributeImage() {

}

function distributeImage() {

}

function fragmentImage() {

}

http.listen(3000, function(){
  console.log('listening on *:3000');
  console.log(model.lol);
});