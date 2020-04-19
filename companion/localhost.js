import { importMessaging } from "./imports.js";
import { isConMessage, isHBMessage } from "../common/com-protocol.js"


var messaging = importMessaging();

export const wsUri = "ws://127.0.0.1:4500/";
var websocket;

export function addWebSocketHandlers(ws) {
  websocket = ws;
  websocket.addEventListener("open", onOpen);
  websocket.addEventListener("close", onClose);
  websocket.addEventListener("message", onAppMessage);
  websocket.addEventListener("error", onError);
  console.log("companion|","Websocket is currently: " + websocket.readyState);
}

function send(msg) {
  if (websocket.readyState === WebSocket.OPEN) {
    websocket.send(msg);
  } else {
    console.log("companion|","Websocket not open. Cannot send message.");
  }
}

function onOpen(evt) {
   console.log("companion|","ws|","CONNECTED");
   websocket.send("[c]");
}

function onClose(evt) {
   console.log("companion|","ws|","DISCONNECTED");
}

function onAppMessage(evt) {
  console.log("companion|","ws|",`MESSAGE: ${evt.data}`);
  var message = String(evt.data);
  if (isHBMessage(message) || isConMessage(message)) {
    messaging.peerSocket.send(message);
  }
}

function onError(evt) {
  console.error("companion|","ws|",
    `Websocket is currently: ${websocket.readyState}`);
  // evt.preventDefault();
  console.error("companion|","ws|",`ERROR: ${evt.type}`);
}

export function sendHealthDataMessage(msg) {
  console.log(`Sending message over websocket ${msg}`);
  send(msg);
}

export function sendConnectedMessage() {
  send("[c]");
}
