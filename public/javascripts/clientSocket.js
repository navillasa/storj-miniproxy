let ws = new WebSocket('ws://localhost:9000');

ws.onopen = () => {
  console.log('open')
}

ws.onmessage = (ev) => {
  let _data = JSON.parse(ev.data);
  console.log(_data);
}
