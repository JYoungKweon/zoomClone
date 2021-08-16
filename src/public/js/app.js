const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const frontEndSocket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

frontEndSocket.addEventListener("open", () => {
  console.log("Connected to Server ✔");
});

frontEndSocket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

frontEndSocket.addEventListener("close", () => {
  console.log("Disconnected from Server. ❌");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  frontEndSocket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  frontEndSocket.send(makeMessage("nickname", input.value));
  let tempString = input.value;
  input.value = "Saved. Nickname: " + tempString;
}
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
