import { addWebSocketHandlers, sendHealthDataMessage, sendConnectedMessage } from "./localhost";

var messaging = importMessaging();

function onOpen(evt) {
  console.log("companion|","PeerSocket Opened");
}

function onPeerMessage(event) {
  var message = event.data
  console.log("companion|",`MESSAGE: ${message}`);
  if (message[0] == "hb") {
    sendHealthDataMessage(message);
  } else if (message[0] == "c") {
    sendConnectedMessage();
  }
}

function onError(evt) {
  console.log("companion|",`PeerSocket Error ${evt.data}`);
}

function onClose(evt) {
  console.log("companion|","PeerSocketClosed");
}

export function importMessaging() {
  var messagingPath;

  // Fitbit does not support process
  try {
    // Testing environment
    messagingPath = process.env.TEST ?  "../tests/companion/api/messaging"
     : "messaging";
  } catch(error) {
    // Production environment
    messagingPath = "messaging";
  }

  return require(messagingPath);
}

export function initPeerSocketHandlers() {
  // add peerSocket handlers
  messaging.peerSocket.addEventListener("message", onPeerMessage);
  messaging.peerSocket.addEventListener("open", onOpen);
  messaging.peerSocket.addEventListener("error", onError);
  messaging.peerSocket.addEventListener("close", onClose);

}
