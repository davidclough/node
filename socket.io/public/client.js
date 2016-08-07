// OK the namespace would normally be declared as an empty object. Code only small here.
var UTILS = (function () {
  var pub = {};

  pub.sendNonEmptyMessage = function (messageBox, socket) {
    var message = messageBox.val();
    if (message !== "") {
      socket.emit("send message", message);
      messageBox.val("");
    }
  };

  pub.sendName = function (nameBox, socket) {
    var name = nameBox.val();
    if (name !== "") {
      // emit with callback.
      socket.emit("new user", name, function (data) {
        if (data) {
          $("#nameWrap").slideUp();
          $("#contentWrap").slideDown();
        } else {
          var nameError = $("#nameError");
          nameError.html("Name already taken")
        }
      });
      nameBox.val("");
    }
  };

  return pub;
}());

$(function () {
  var socket = io.connect();

  var nameForm = $("#nameForm");
  var nameBox = $("#nameBox");

  var messageForm = $("#send-message");
  var messageBox = $("#message");
  var chat = $("#chat");

  nameForm.submit(function (e) {
    e.preventDefault();
    UTILS.sendName(nameBox, socket);
  });

  socket.on("usernames", function (data) {
    $("#userList").html("");
    $.each(data, function(index, value) {
      $("#userList").append("<li>" + value +"</li>");
    });
  });

  messageForm.submit(function (e) {
    e.preventDefault();
    UTILS.sendNonEmptyMessage(messageBox, socket);
  });

  socket.on("new message", function (data) {
    chat.append(data.msg + "<span class='message-sender'>" + data.uname + "</span><br />");
  });
});
