import { addWebSocketHandlers, sendHealthDataMessage, sendConnectedMessage } from "./localhost.js";
import { importMessaging } from "./imports.js"

var messaging = importMessaging();

export function initPeerSocketHandlers() {
  // add peerSocket handlers
  console.log("companion|", "addingPeerSocketHandlers");
  messaging.peerSocket.addEventListener("message", onPeerMessage);
  messaging.peerSocket.addEventListener("open", onOpen);
  messaging.peerSocket.addEventListener("error", onError);
  messaging.peerSocket.addEventListener("close", onClose);

}

export function isHBMessage(msg) {
  let re = RegExp('[\[]hb.*');
  return re.test(msg);
}

function onOpen(evt) {
  console.log("companion|","PeerSocket Opened");
}

function onPeerMessage(event) {
  var message = event.data
  console.log("companion|",`MESSAGE: ${message}`);
  if (isHBMessage(message)) {
    sendHealthDataMessage(message);
  } else if (message == "[c]") {
    sendConnectedMessage();
  }
}

function onError(evt) {
  console.log("companion|",`PeerSocket Error ${evt.data}`);
}

function onClose(evt) {
  console.log("companion|","PeerSocketClosed");
}
