var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

var usernames = [];

// Allow "non-routed" access to folders.
//app.use(express.static('.'));
app.use('/public', express.static('public'));

server.listen(3011);

// Route.
app.get("/", function (req, res) {
  res.sendFile(__dirname + "\\index.html")
});

var updateUsernames = function () {
  io.sockets.emit("usernames", usernames);         // including me
};

// This like a "socket ready" handler.
io.sockets.on("connection", function (socket) {
  socket.on("new user", function (data, callback) {
    if (usernames.indexOf(data) !== -1) {
      callback(false);
      //callback({ isValid:false });
    } else {
      callback(true);
      socket.name = data;
      usernames.push(socket.name);
      updateUsernames();
    }
  });

  // Here "send message" is a custom event??? Iassume it corresponds to the emit in client-side.
  socket.on("send message", function (data) {
    io.sockets.emit("new message", { msg: data, uname: socket.name } );         // including me
    //socket.broadcast.emit("new message", data);   // excluding me
  });

  socket.on("disconnect", function (data) {
    var userIndex;
    if (socket.name && (userIndex = usernames.indexOf(socket.name) >= 0)) {
      usernames.splice(userIndex, 1);
      updateUsernames();
    }
  });
});
