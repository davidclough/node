// OK the namespace would normally be declared as an empty object. Code only small here.
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {   // number is the value of the 1st capture.
            return typeof args[number] != "undefined"
                    ? args[number]
                    : match;
        });
    };
}

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
          $("#usernameIndicator").html(UTILS.htmlEncode(name));
          $("#contentWrap").slideDown();
        } else {
          var nameError = $("#nameError");
          nameError.html("Name already taken")
        }
      });
      nameBox.val("");
    }
  };

  pub.outputMessage = function (message, username, cssClass) {
    cssClass = cssClass || "";
    message = UTILS.htmlEncode(message);
    username = UTILS.htmlEncode(username);

    var chat = $("#chat");
    var time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    chat.append("<span class='{0}'>{1}<span class='message-sender'>{2} </span><span class='message-time'>{3}</span></span><br />".format(
                cssClass, message, username, time));
  }

  // Copied from Stack Overflow: http://stackoverflow.com/questions/1219860/html-encoding-in-javascript-jquery
  pub.htmlEncode = function (value){
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
  }

  pub.htmlDecode = function (value){
    return $('<div/>').html(value).text();
  }

  return pub;
}());
