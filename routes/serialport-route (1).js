'use strict';

///////////////////////////////////////////////////////////
////////   SERIALPORT RUN  node app.js /dev/ttyACM0
///////////////////////////////////////////////////////////

const express = require('express');
const router = express.Router();
const arduino = require('../devices/arduino');

router.get('/:event/:data', sendToSerial);

function sendToSerial(request, res) {
  console.log("f:sendToSerial");
  // get the parameters from the URL:
  var eventAndCommand = request.params.event + request.params.data;
  console.log("received "+ eventAndCommand);
  // xmit to serial port close connection
  arduino.myPort.write(eventAndCommand);
}

module.exports = router;

///////////////////////////////////////////////////////////
// sample of sending a request to this route - to be used in other routes
// function setColor(slider, textbox) {
// 	textbox.value = slider.value;
// 	var request = new XMLHttpRequest();
// 		// GET /output/color/level, and make an asynchronous request:
// 		request.open( "GET", '/serialport/' + textbox.id + "/" + slider.value, true );
// 		// close the request:
// 		request.send( null );
// }
