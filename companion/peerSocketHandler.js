import { addWebSocketHandlers, sendHealthDataMessage, sendConnectedMessage } from "./localhost.js";
import { importMessaging } from "./imports.js"
import { isConMessage, isHBMessage } from "../common/com-protocol.js"

var messaging = importMessaging();

export function initPeerSocketHandlers() {
  // add peerSocket handlers
  console.log("companion|", "addingPeerSocketHandlers");
  messaging.peerSocket.addEventListener("message", onPeerMessage);
  messaging.peerSocket.addEventListener("open", onOpen);
  messaging.peerSocket.addEventListener("error", onError);
  messaging.peerSocket.addEventListener("close", onClose);

}

function onOpen(evt) {
  console.log("companion|","PeerSocket Opened");
}

function onPeerMessage(event) {
  var message = event.data
  console.log("companion|",`MESSAGE: ${message}`);
  if (isHBMessage(message)) {
    sendHealthDataMessage(message);
  } else if (isConMessage(message)) {
    sendConnectedMessage();
  }
}

function onError(evt) {
  console.log("companion|",`PeerSocket Error ${evt.data}`);
}

function onClose(evt) {
  console.log("companion|","PeerSocketClosed");
}
