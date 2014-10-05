var app = require('express')();
var http = require('http').Server(app);
var path = require('path');

// Routers

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname,'title.html'));
});


// Host function



// Join function




http.listen(3000, function(){
  console.log('listening on *:3000');
});