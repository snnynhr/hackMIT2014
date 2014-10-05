var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var model = require('./model');
var fs = require('fs');
var exec = require('child_process').exec;
var generator = require('./generate');

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

app.get('/makeroom/:room', makeRoom);

// Core functions

function hostHandler(req, res) {
  var roomName = getRoomName();
  var newRoom = new model.Room();
  model.rooms[roomName] = newRoom;

  res.statusCode = 302;
  res.setHeader('Location', '/host/' + roomName);
  res.end();
}

function makeRoom(req, res) {
  var roomName = req.param('room');
  var numRows = req.param('rows');
  var numCols = req.param('cols');
  var imageName = req.param('name');

  var room = model.rooms[roomName];
  room.makeRoom(numRows, numCols);
  room.setImagePath('public/' + roomName + '-' + imageName);

  // Make sockets
  var nsp = io.of('/' + roomName);
  nsp.on('connection', function(socket){
    console.log('received client connection');
    socket.on('finalizePosition', function (position) {
      console.log(position.row, position.col);
      room.positionSocket(position.row, position.col, socket);
      if (room.ready()) {
        distributeImage(room);
      }
    });
  });

  res.statusCode = 302; 
  res.setHeader('Location', '/join/' + roomName);
  res.end();
}

function joinHandler(req, res) {
  if (model.rooms[req.param('room')] == undefined)
  {
    res.statusCode = 400;
    res.send('Not a valid room.');
    res.end();
  }

  var room = model.rooms[req.param('room')];

  res.send(generator.generate(room.cols, room.rows));
  //res.sendFile(path.join(__dirname, 'tmpjoin.html'));
}

function distributeImage(room) {
  var imagePath = room.imagePath;
  console.log(imagePath);
  fragmentImage(room, imagePath, room.rows, room.cols);
}

// Utilities

function getRoomName() {
  return Math.round(Math.random()*1000);
}

function fragmentImage(myroom, myimagePath, myrows, mycols) {
  console.log('Main Path: ' + myimagePath);
  var command = 'java -cp "MuSc/MuSc.jar:MuSc/lib/commons-cli-1.2.jar" org.expee.musc.SplitMedia -i -f '+myimagePath + ' -n ' + (myrows*mycols) + ' -d ' + mycols + ':' + myrows;
  //console.log(command);
  // var f = function () {
    var room = myroom;
    var imagePath = room.imagePath;
    console.log(imagePath);
    var rows = myrows;
    var cols = mycols;
    exec(command, function (error, stdout, stderr) {
      console.log(imagePath);
      var extensionLoc = imagePath.lastIndexOf('.');
      var extension = imagePath.substring(extensionLoc, imagePath.length); //Extension will be like ".jpeg"
      var basepath = imagePath.substring(0, extensionLoc);

      // Distribute the images to the devices.
      for (var i = 0; i < room.rows; i++) {
        for (var j = 0; j < room.cols; j++) {
          var socket = room.socketArray[i][j];
          var imagePath = "./" + basepath + '.' + j.toString() + '.' + i.toString() + extension;
          console.log(imagePath);
          var f = function () {
            var mysocket = socket;
            var myi = i;
            var myj = j;
            fs.readFile(imagePath, function(err, buf){
              console.log(imagePath);
              console.log(err);
              mysocket.emit('image', { image: true, buffer: buf});
            });
          };
          f();
        }
      }
    });
  // };

  // f();
}

http.listen(3000, function(){
  console.log('listening on *:3000');
});