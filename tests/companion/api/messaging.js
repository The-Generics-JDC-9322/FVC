var index = require("../../../app/index.js");
const appMessaging = require("../../app/api/messaging");


class PeerSocket {
  
  constructor() {
    this.onOpen = [];
    this.onMessage = [];
    this.onError = [];
    this.onClose = [];
  }

  addEventListener(type, handler) {
    switch (type) {
      case 'open': 
        this.onOpen.push(handler);
        break;
      case 'message':
        this.onMessage.push(handler);
        break;
      case 'error':
        this.onError.push(handler);
        break;
      case 'close':
        this.onClose.push(handler);
        break;
      default:
        break;
    }
  }

  send(msg) {
    var sendEvent = new Event(msg);
    sendEvent.data = msg;

    // console.log("companion|","messaging|",messaging);

    //to the other one
    appMessaging.peerSocket.onMessage.forEach( func => {
      func(sendEvent);
    });
  }

}

const peerSocket = new PeerSocket()

const messaging = {
  peerSocket
};

module.exports = messaging;