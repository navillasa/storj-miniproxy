let ws = new WebSocket('ws://localhost:9000');
// const createBucketButton = document.getElementById('createBucket');
const bucketSection = document.getElementById('buckets');
var div = document.createElement('div');

ws.onopen = () => {
  console.log('open')
}

ws.onmessage = (message) => {
  let parsedData = JSON.parse(message.data);
  console.log(parsedData);
  console.log(parsedData.bucketList);
  var divList = parsedData.bucketList.map((bucket) => {
    // bucketSection.appendChild('<p>', bucket, '</p>');
    return bucket
  });
  console.log(divList);

  for (var i in divList) {
    var newElement = document.createElement('a');
    newElement.id = divList[i];
    newElement.href = divList[i];
    newElement.className = 'bucket';
    newElement.innerHTML = 'bucket id: ' + divList[i];
    document.body.appendChild(newElement);
  }

}

// createBucketButton.onclick = () => {
//   let message = {
//     option: 'createBucket'
//   }
//   ws.send(JSON.stringify(message));
// }
