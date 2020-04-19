import { initPeerSocketHandlers } from "./peerSocketHandler.js";
import { wsUri, addWebSocketHandlers } from "./localhost.js";

initPeerSocketHandlers();
addWebSocketHandlers(new WebSocket(wsUri));
