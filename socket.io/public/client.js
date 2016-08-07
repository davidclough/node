$(function () {
  var socket = io.connect();

  var nameForm = $("#nameForm");
  var nameError = $("#nameError");
  var nameBox = $("#nameBox");

  var messageForm = $("#send-message");
  var messageBox = $("#message");
  var chat = $("#chat");


  var sendName = function () {
    var name = nameBox.val();
    if (name !== "") {
      // emit with callback.
      socket.emit("new user", name, function (data) {
        if (data) {
          $("#nameWrap").slideUp();
          $("#contentWrap").slideDown();
        } else {
          nameError.html("Name already taken")
        }
      });
      nameBox.val("");
    }
  };

  nameForm.submit(function (e) {
    e.preventDefault();
    sendName();
  });

  socket.on("usernames", function (data) {
    $("#userList").html("");
    $.each(data, function(index, value) {
      $("#userList").append("<li>" + value +"</li>");
    });
  });


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
