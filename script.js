let isAuthicated = false;
if (!isAuthicated) {
  document.getElementById("message-input").style.display = "none";
  showLoginForm();
} else {
  sendMessage("Hey !", false);
  sendMessage("How are you doing?", false);
  sendMessage("My name is Suki, your Zimnat assistant, How may I be of service to today?", false);
  showSuggessions()
}

function showSuggessions() {
  var messageList = document.getElementById("message-list");
  var lastMessage = messageList.children[messageList.children.length - 1];
  const suggessions = ["Yes, I have an account", "I don't have one"];
  let pillContainer = document.createElement("div");
  pillContainer.classList.add("pill-container");
  // 
  suggessions.forEach(text => {
    let pill = document.createElement("span");
    pill.classList.add("badge");
    pill.classList.add("bg-secondary-soft");
    pill.innerHTML = text;
    pill.addEventListener("click", () => {
      sendMessage(text, false);
    });
    pillContainer.appendChild(pill);


  });

  console.log(pillContainer);
  lastMessage.insertAdjacentElement("afterend", pillContainer);
}

function showLoginForm() {
  const messageList = document.getElementById("message-list");
  messageList.innerHTML = "";
  const loginForm = `
        <form id="login-form">
            <h1>Sign In to continue.</h1>
          <div class="form-input">
          <label for="phone_number">Phone Number</label>
          <input type="number" name="phone_number" placeholder="0712345678" required>
        </div>
        <div class="form-input">
          <label for="id_number">ID Number</label>
          <input type="text" placeholder="12-3456789Z02" name="id_number" required>
        </div>
        <button type="submit" class="form-btn">Sign In</button>
        </form>
    `;
  messageList.innerHTML = loginForm;
  const switchFormText = document.getElementById("switch-form-text");
  switchFormText.innerHTML =
    'Don\'t have an account? <a href="#" id="register-link">Register</a>';

  const registerLink = document.getElementById("register-link");
  registerLink.removeEventListener("click", showLoginForm);
  registerLink.addEventListener("click", showRegisterForm);
  // : login form submit
  const loginFormSubmit = document.getElementById("login-form");
  loginFormSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(loginFormSubmit);
    const phone_number = formData.get("phone_number");
    const id_number = formData.get("id_number");
    console.log(phone_number);
    console.log(id_number);
    // show bot ui
    messageList.innerHTML = "";
    document.getElementById("message-input").style.display = "initial"
    sendMessage("Hey Polite !", false);
    sendMessage("How are you doing?", false);
    sendMessage("My name is Suki, your Zimnat assistant, How may I be of service to today?", false);

  });
}

function showRegisterForm() {
  const messageList = document.getElementById("message-list");
  messageList.innerHTML = "";

  const registerForm = `
            <form id="register-form">
                <h1>Create Free Account</h1>
                <div class="form-input">
                  <label for="fullname">Full Name</label>
                  <input type="text" placeholder="Full Name" name="fullname">
                </div>
                <div class="form-input">
                  <label for="phone_number">Phone Number</label>
                  <input type="number" name="phone_number" placeholder="0712345678" required>
                </div>
                <div class="form-input">
                  <label for="id_number">ID Number</label>
                  <input type="text" placeholder="12-3456789Z02" name="id_number" required>
                </div>
                <div class="form-input">
                  <label for="dob">Date of Birth</label>
                  <input type="date" placeholder="Date of Birth" id="dob" required>
                </div>
                <div class="form-input">
                  <label for="policy_type">Policy Type</label>
                  <select name="policy_type" id="policy_type" required>
                    <option value="" disabled selected>Select Policy Type</option>
                    <option value="General Insurance">General Insurance</option>
                    <option value="Personal">Personal</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Specialist Insurance">Specialist Insurance</option>
                  </select>
                </div>
                <div class="form-input">
                  <label for="policy_number">Policy Number</label>
                  <input type="text" placeholder="Policy Number" id="policy_number" required>
                </div>
                <button type="submit" class="form-btn">Create Account</button>
            </form>
      `;
  messageList.innerHTML = registerForm;

  const switchFormText = document.getElementById("switch-form-text");
  switchFormText.innerHTML =
    'Already have an account? <a href="#" id="login-link">Login</a>';

  const loginLink = document.getElementById("login-link");
  loginLink.removeEventListener("click", showRegisterForm);
  loginLink.addEventListener("click", showLoginForm);
  // : register form submit
  const registerFormSubmit = document.getElementById("register-form");
  registerFormSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(registerFormSubmit);
    const fullname = formData.get("fullname");
    const phone_number = formData.get("phone_number");
    const id_number = formData.get("id_number");
    const dob = formData.get("dob");
    const policy_type = formData.get("policy_type");
    const policy_number = formData.get("policy_number");
    console.log(fullname);
    console.log(phone_number);
    console.log(id_number);
    console.log(dob);
    console.log(policy_type);
    console.log(policy_number);
    // show bot ui
    messageList.innerHTML = "";
    document.getElementById("message-input").style.display = "initial"
    sendMessage("Hey Polite", false);
    sendMessage("How are you doing?", false);
    sendMessage("My name is Suki, your Zimnat assistant, How may I be of service to today?", false);
  });
}

function sendMessage(message, itsMe) {
  // ...Mario
  var messageList = document.getElementById("message-list");

  var scrollToBottom =
    messageList.scrollHeight -
    messageList.scrollTop - messageList.clientHeight < 80;

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
      sendMessage("Sorry I am not available now, please check back some time.🥹", false);
    });
}

// : close suki
const closeSuki = document.getElementsByClassName("close-button")[0];
closeSuki.addEventListener("click", () => {
  document.getElementById("message-input").style.display = "none";
  showLoginForm();
});




