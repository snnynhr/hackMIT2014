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

app.get('/host', hostHandler);

app.get('/host/:room', function(req, res){
  res.sendFile(path.join(__dirname,'host.html'));
});

app.get('/join', function(req, res){
  res.sendFile(path.join(__dirname,'join.html'));
});

app.get('/join/:room', joinHandler);

app.post('/upload', uploadFile);

app.post('/makeroom/:room', makeRoom);

// Core functions

function hostHandler(req, res) {
  var roomName = getRoomName();
  model.rooms[roomName] = new model.Room();
  res.statusCode = 302; 
  res.setHeader('Location', '/host/' + roomName);
  res.end();
}

function makeRoom(req, res) {
  var roomName = req.param('room');
  var numRows = req.param('rows');
  var numCols = req.param('cols');

  model.rooms[roomName].makeRoom(numRows, numCols);
  res.statusCode = 302; 
  res.setHeader('Location', '/join/' + roomName);
  res.end();
}

function joinHandler(req, res) {
  
}

function uploadFile(req, res) {
  
}

function updateGridPositions(req, res) {
  
}

function tryDistributeImage() {

}

function distributeImage() {

}

// Utilities

function getRoomName() {
  return Math.round(Math.random()*1000);
}

function fragmentImage() {

}

http.listen(3000, function(){
  console.log('listening on *:3000');
  console.log(model.lol);
});