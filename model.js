// Array of rooms.

exports.rooms = {};

// Room class.

exports.Room = function () {};

exports.Room.prototype.makeRoom = function (numRows, numColumns)
{
  this.rows = numRows;
  this.cols = numColumns;
  this.socketArray = [];
  for (var i = 0; i < numRows; i++) {
    (this.socketArray).push([]);
    for (var j = 0; j < numColumns; j++) {
      (this.socketArray[i]).push(undefined);
    }
  }
  this.socketList = [];
  this.imagePath = undefined;
  this.numSocketsChosen = 0;
};

exports.Room.prototype.setImagePath = function (path)
{
  this.imagePath = path;
};


exports.Room.prototype.addSocket = function (socket)
{
  (this.socketList).push(socket);
}

exports.Room.prototype.positionSocket = function (row, col, socket)
{
  if (!this.socketArray[row][col]) {
    this.numSocketsChosen += 1;
  }
  this.socketArray[row][col] = socket;
};

// Return true iff the image has been uploaded and all the clients are ready.
exports.Room.prototype.ready = function ()
{
  return (this.imagePath != undefined && this.numSocketsChosen == this.rows * this.cols);
}
