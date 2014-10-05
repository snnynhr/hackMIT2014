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
  // TODO: Dynamically create an html file for clients to select position on grid.
}

function uploadFile(req, res) {
  var roomName = req.param('room');
  var imageName = 'FILL THIS IN';
  var imagePath = 'images/' + roomName + '/' + imageName;
  model.rooms[roomName].setImagePath(imagePath);
  // TODO: retrieve file and store in the folder specified by imagePath.
  // TODO: if we have grid information, run Peijin's program to frag image.
  tryDistributeImage(model.rooms[roomName]);
}

function updateGridPositions(req, res) {
  // TODO: Add a socket connection to the client.
}

function tryDistributeImage(room) {
  if (room.ready()) {
    distributeImage(room);
  }
}

function distributeImage(room) {
  // TODO: Use Peijin's program to frag image.
}

// Utilities

function getRoomName() {
  return Math.round(Math.random()*1000);
}

function fragmentImage() {
  // TODO: Call Peijin's code to frag image.
}

http.listen(3000, function(){
  console.log('listening on *:3000');
  console.log(model.lol);
});