$(function () {
  var socket = io.connect();

  var nameForm = $("#nameForm");
  var nameBox = $("#nameBox");

  var messageForm = $("#send-message");
  var messageBox = $("#message");

  nameForm.submit(function (e) {
    e.preventDefault();
    UTILS.sendName(nameBox, socket);
  });

  socket.on("usernames", function (data) {
    $("#userList").html("");
    $.each(data, function(index, value) {
      $("#userList").append("<li>{0}</li>".format(UTILS.htmlEncode(value)));
    });
  });

  messageForm.submit(function (e) {
    e.preventDefault();
    UTILS.sendNonEmptyMessage(messageBox, socket);
  });

  socket.on("new message", function (data) {
    UTILS.outputMessage(data.msg, data.uname);
  });

  socket.on("whisper", function (data) {
    UTILS.outputMessage(data.msg, data.uname, "whispered-message");
  });
});
