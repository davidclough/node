var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

// Allow "non-routed" access to folders.
//app.use(express.static('.'));
app.use('/public', express.static('public'));

server.listen(3011);

// Route.
app.get("/", function (req, res) {
  res.sendFile(__dirname + "\\index.html")
});

// This like a "socket ready" handler.
io.sockets.on("connection", function (socket) {
  socket.on("send message", function (data) {
    io.sockets.emit("new message", data);         // including me
    //socket.broadcast.emit("new message", data);   // excluding me
  });
});
