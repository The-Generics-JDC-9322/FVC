import { initPeerSocketHandlers } from "./message-utils";
import { wsUri, addWebSocketHandlers } from "./localhost.js";

initPeerSocketHandlers();
addWebSocketHandlers(new WebSocket(wsUri));
