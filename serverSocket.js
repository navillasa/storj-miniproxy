const ws = require('ws');
const express = require('express');

class ServerSocket {
  constructor(wss, ws) {
    console.log('ws init ran');

    // wss.on('connection', (socket) => {
    //  ws.on('message', (msg) => {
    //    let parsedData = JSON.parse(data);
    //    console.log(parsedData);
    //  });
    // });

    wss.on('connection', (ws) => {
      console.log('websocket connection open');

      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({
          msg1: 'hello i\'m message 1'
        }))
      }
   });
        

  }
}

module.exports = ServerSocket;
