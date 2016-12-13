'use strict';

//////////////////////////////////////////////////////////////////
////////      SERIALPORT:  node app.js /dev/ttyACM0
//////////////////////////////////////////////////////////////////

// const express = require('express');
// const router = express.Router();
var portName = process.argv[2];

if (portName ) {
  var serialport = require("serialport"); // include the serialport library
  var SerialPort  = serialport.SerialPort;	   // make a local instance of serial

  console.log("opening serial port: " + portName);
  exports.myPort = new SerialPort(portName, {
  	baudRate: 9600,
  	parser: serialport.parsers.readline("\r\n") // delimit new line on end of data packet
  });
} else {
  return;
}

/*

router.get('/:color/:brightness', sendToSerial);

// this function responds to a GET request with the index page:
function sendIndexPage(request, res) {
res.redirect('/index.html');
}

function sendToSerial(request, res) {
  // get the parameters from the URL:
  var brightnessCommand = request.params.color + request.params.brightness;
  console.log("received "+ brightnessCommand);
  // xmit to serial port close connection
  myPort.write(brightnessCommand);
  }
*/
// module.exports = myPort;

// Alt way to initiate serialport
// START: new serial
// var SerialPort = require('serialport');
// var myPort = new SerialPort('/dev/ttyACM0', {
//  parser: SerialPort.parsers.readline('\n')
// });
// END: new serial
