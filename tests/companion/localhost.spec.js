const test = require('ava');
import { WebSocket, Server } from 'mock-socket';
import { addWebSocketHandlers } from '../../companion/localhost.js';
import { initPeerSocketHandlers } from "../../companion/peerSocketHandler.js";

const fakeURL = 'ws://127.0.0.1:4500/';

test("my passing test", t => {
  t.pass();
});

test("connect to companion", t => {
  // WebSocket = WebSocket; // Here we stub out the window object
  const mockServer = new Server(fakeURL);
  // console.log("mockServer", mockServer);
  mockServer.on('connection', socket => {
    console.log("got connection");
    socket.on('message', data => {
      t.is(data, 'test message from app', 'we have intercepted the message and can assert on it');
      socket.send('test message from mock server');
    });
    t.fail();
  });
  var socket = new WebSocket(fakeURL);

  addWebSocketHandlers(socket);
  // console.log(mockServer.clients());

  t.is(mockServer.clients().length, 1);
  socket.close();

  mockServer.stop(t.done)

});


test.cb("connect to companion with NOPs and [c]", t => {
  const mockServer = new Server(fakeURL);

  let recvQueue = [];

  mockServer.on('connection', socket => {
    console.log("got connection");
    socket.on('message', data => {
      recvQueue.push(data);
    });
    socket.send('[c]');

    socket.send('[hb]');

    socket.send('[hb]');

    socket.send('[hb]');
  });

  initPeerSocketHandlers();
  addWebSocketHandlers(new WebSocket(fakeURL));
  // t.is(mockServer.clients().length, 1);

  // NOTE: this timeout is for creating another micro task that will happen after the above one
  setTimeout(() => {
    t.is(recvQueue[0], '[c]', "first message from companion is connected");
    t.is(recvQueue.indexOf('[hb,-1]') >= 0, true, "recvQueue got a heartbeat value");
    
    t.end();
  }, 2000);

  console.log("Last thing in test");
});




