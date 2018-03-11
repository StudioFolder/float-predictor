/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  const ip = req.connection.remoteAddress;
  console.log(`New Connection from ${ip}`);
  ws.on('message', (message) => {
    console.log('received: %s', message);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(1337, () => {
  console.log('Listening on %d', server.address().port);
});
