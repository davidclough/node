var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

// Dictionary of users (as properties) and sockets (as property values).
var userSockets = {};

// Allow "non-routed" access to folders.
//app.use(express.static('.'));
app.use('/public', express.static('public'));

server.listen(3011);

// Route.
app.get("/", function (req, res) {
  res.sendFile(__dirname + "\\index.html")
});

var updateUsernames = function () {
  io.sockets.emit("usernames", Object.keys(userSockets));
};

// This like a "socket ready" handler.
io.sockets.on("connection", function (socket) {
  socket.on("new user", function (data, callback) {
    if (data in userSockets) {
      callback(false);
      //callback({ isValid:false });
    } else {
      callback(true);
      socket.username = data;
      userSockets[data] = socket;
      updateUsernames();
    }
  });

  // Here "send message" is a custom event??? Iassume it corresponds to the emit in client-side.
  socket.on("send message", function (data) {
    io.sockets.emit("new message", { msg: data, uname: socket.username } );         // including me
    //socket.broadcast.emit("new message", data);   // excluding me
  });

  socket.on("disconnect", function (data) {
    if (socket.username in userSockets) {
      delete userSockets[socket.username];
      updateUsernames();
    }
  });
});
