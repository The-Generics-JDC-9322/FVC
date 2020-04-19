import { importMessaging, importDocument, importSystem } from "./imports";
import writeHeartData, { getLastDataPoint, timeSinceWrite } from "./author";

var document = importDocument();
var messaging = importMessaging();
var system = importSystem();
// import { inbox, outbox } from "file-transfer";

console.log("app|","JS memory: ", system.memory.js.used, "/", system.memory.js.total);

let hrLabel = document.getElementById("hrm");
let updatedLabel = document.getElementById("updated");
let lastValueTimestamp = Date.now();
let statusText = document.getElementById("status");

// Initialize the UI with some values
hrLabel.text = "--";
updatedLabel.text = "...";
statusText.text = "Waiting For Connection...";

function updateDisplay() {
  hrLabel.text = getLastDataPoint();
  updatedLabel.text = timeSinceWrite();
}

function onOpen(evt) {
  console.log("app|","PeerSocket Opened");
}

function onError(evt) {
  console.log("app|",`PeerSocket Error ${evt.data}`);
}

function onMessage(evt) {
  console.log("app|",`PeerSocket Recv ${evt.data}`);
  //if the message says read the file then send the file data
  var message = evt.data
  console.log("app|",`MESSAGE: ${message}`);
  if (message == "[hb]") {
    let last = getLastDataPoint();
    messaging.peerSocket.send(`[hb,${last}]`);
  } else if (message == "[c]") {
    statusText.text = "Connected to VERA";
    messaging.peerSocket.send("[c]");
  }
}

function onClose(evt) {
  console.log("app|","PeerSocketClosed");
}

messaging.peerSocket.addEventListener("open", onOpen);
messaging.peerSocket.addEventListener("error", onError);
messaging.peerSocket.addEventListener("message", onMessage);
messaging.peerSocket.addEventListener("close", onClose);

writeHeartData();

setInterval(updateDisplay, 500);


