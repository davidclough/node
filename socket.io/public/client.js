$(function () {
  var socket = io.connect();
  var messageForm = $("#send-message");
  var messageBox = $("#message");
  var chat = $("#chat");

  var sendNonEmptyMessage = function () {
    var message = messageBox.val();
    if (message !== "") {
      socket.emit("send message", message);
      messageBox.val("");
    }
  };

  messageForm.submit(function (e) {
    e.preventDefault();
    sendNonEmptyMessage();
  });

  socket.on("new message", function (data) {
    chat.append(data + "<br />");
  });
});
