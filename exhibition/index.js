
const _ = require('lodash');
/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const copydir = require('copy-dir');
const mv = require('mv');

const mbs = [10, 30, 100, 250, 500, 850, 1000];
const urls = [];
const filenames = [];
const app = express();
app.use(express.static('../dist'));
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

/* DOWNLOAD WIND DATA */

for (let i = 0; i < mbs.length; i += 1) {
  for (let j = 0; j <= 360; j += 24) {
    const f = `${j}.json`;
    const filename = `../static/data/gfs/tmp/${mbs[i]}/${f}`;
    const url = `http://float.aerocene.org/gfs/data/${mbs[i]}/${f}`;
    urls.push(url);
    filenames.push(filename);
    console.log(url);
  }
}

function download(i, cb) {
  const file = fs.createWriteStream(filenames[i]);
  http.get(urls[i], (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(() => {
        console.log(`Downloaded ${urls[i]} to ${filenames[i]}`);
        if (i < urls.length - 1) {
          download(i + 1, cb);
        } else {
          cb();
        }
      }); // close() is async, call cb after close completes.
    });
  }).on('error', (err) => { // Handle errors
    fs.unlink(filenames[i]); // Delete the file async. (But we don't check the result)
    console.log(`Unable to download wind data ${err.message}`);
  });
}

function onDownload() {
  // copydir.sync('../static/data/gfs/tmp/', '../static/data/gfs/data/');
  mv('../static/data/gfs/tmp/', '../static/data/gfs/data/', (err) => {
    if (err) {
      console.log(`Unable to mv tmp to data error: ${err.message}`);
    }
  });
  console.log('Done');
}

function startDownload() {
  copydir.sync('../static/data/gfs/data/', '../static/data/gfs/tmp/');
  download(0, onDownload);
}

startDownload();

setInterval(() => {
  startDownload();
}, 1000 * 60 * 60 * 12);
