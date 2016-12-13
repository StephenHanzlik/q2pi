'use strict';

///////////////////////////////////////////////////////////
////////   SERIALPORT RUN  node app.js /dev/ttyACM0
///////////////////////////////////////////////////////////

const express = require('express');
const router = express.Router();
const arduino = require('../devices/arduino');

router.get('/:color/:brightness', sendToSerial);

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



function sendToSerial(request, res) {
console.log("f:sendToSerial");
  console.log(arduino.myPort);
  // get the parameters from the URL:
  var brightnessCommand = request.params.color + request.params.brightness;
  console.log("received "+ brightnessCommand);
  // xmit to serial port close connection
  arduino.myPort.write(brightnessCommand);
  }


module.exports = router;
