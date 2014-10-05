// Array of rooms.

exports.rooms = {};

// Room class.

exports.Room = function () {};

exports.Room.prototype.makeRoom = function (numRows, numColumns)
{
  this.rows = numRows;
  this.cols = numColumns;
  this.sockets = {};
  for (var i = 0; i < numRows; i++) {
    (this.sockets).push([]);
    for (var j = 0; j < numColumns; j++) {
      (this.sockets[i]).push(undefined);
    }
  }
  this.imagePath = undefined;
  this.numSocketsChosen = 0;
};

exports.Room.prototype.setImagePath = function (path)
{
  this.imagePath = path;
};

exports.Room.prototype.addSocket = function (row, col, socket)
{
  if (!this.sockets[row][col]) {
    this.numSocketsChosen += 1;
  }
  this.sockets[row][col] = socket;
};

// Return true iff the image has been uploaded and all the clients are ready.
exports.Room.prototype.ready = function ()
{
  return (this.imagePath != undefined && this.numSocketsChosen == numRows * numColumns);
}
