function sendMessage(message, itsMe) {
  // ...Mario
  var messageList = document.getElementById("message-list");

  var scrollToBottom =
    messageList.scrollHeight -
      messageList.scrollTop -
      messageList.clientHeight <
    80;

  var lastMessage = messageList.children[messageList.children.length - 1];

  var newMessage = document.createElement("span");
  newMessage.innerHTML = message;

  var className;

  if (itsMe) {
    className = "me";
    scrollToBottom = true;
  } else {
    className = "not-me";
  }

  if (lastMessage && lastMessage.classList.contains(className)) {
    lastMessage.appendChild(document.createElement("br"));
    lastMessage.appendChild(newMessage);
  } else {
    var messageBlock = document.createElement("div");
    messageBlock.classList.add(className);
    messageBlock.appendChild(newMessage);
    messageList.appendChild(messageBlock);
  }

  if (scrollToBottom) messageList.scrollTop = messageList.scrollHeight;
}

var message = document.getElementById("message-input");
message.addEventListener("keypress", function (event) {
  var key = event.which || event.keyCode;
  if (key === 13 && this.value.trim() !== "") {
    sendMessage(this.value, true);
    talkToSuki(this.value);
    this.value = "";
  }
});

sendMessage("Hey!", false);
sendMessage("How are you doing?", false);
sendMessage("My name is Suki, your Zimnat assistant, Do you have an account with us, Yes/No", false);

function talkToSuki(inputValue) {
  // Data to send in the POST request
  const postData = {
    input: inputValue,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  };
  let indicator = document.getElementById("indicator");
  indicator.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;Typing ...";
  fetch("http://127.0.0.1:5000/hey/suki", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
       indicator.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;Online";
      sendMessage(data.response, false);
    })
    .catch((error) => {
      console.log(error);
       indicator.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;Online";
      sendMessage( "Sorry I am not available now, please check back some time.🥹", false);
    });
}




