const ws = require('ws');
const express = require('express');

class ServerSocket {
  constructor(wss, ws) {
    console.log('ws init ran');

    wss.on('connection', (socket) => {
      ws.on('message', (msg) => {
        let parsedData = JSON.parse(data);
        console.log(parsedData);
      });
    });

  }
}

module.exports = ServerSocket;
