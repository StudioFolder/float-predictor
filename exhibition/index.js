
const _ = require('lodash');
/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const data = {};
wss.on('connection', (ws, req) => {
  ws.send(JSON.stringify(data));
  const ip = req.connection.remoteAddress;
  console.log(`New Connection from ${ip}`);
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    _.each(parsedMessage, (value, key) => {
      data[key] = value;
    });
    // console.log(data);
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
