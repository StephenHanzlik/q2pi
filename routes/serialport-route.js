'use strict';

///////////////////////////////////////////
////////      TO RUN THE SERVER AND ACCESS SERIALPORT RUN  node app.js /dev/ttyACM0
///////////////////////////////////////////

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom'); // error logging module
const morgan = require('morgan'); // req/res logging module
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');

//app.disable('x-powered-by');
//var port = process.argv.PORT || 8000;

// START: Setup Routes
//var morgan = require('morgan');
//app.use(morgan('short'));
//var bodyParser = require('body-parser');
//app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'public')));
//app.get('/', sendIndexPage);
//app.route('/index*', sendIndexPage);
//router.get('/', sendIndexPage);

// take anything that begins with /output as an LED request:
//app.route('/output/:color/:brightness', sendToSerial);
router.get('/:color/:brightness', sendToSerial);
// END: Setup Routes


// START: old serial
var serialport = require("serialport"); // include the serialport library
var SerialPort  = serialport.SerialPort;	   // make a local instance of serial
// the third word of the command line command is serial port name:
var portName = process.argv[2];
// print out the port you're listening on:
console.log("opening serial port: " + portName);
// END: old serial

// open the serial port. Uses the command line parameter:
var myPort = new SerialPort(portName, {
	baudRate: 9600,
	// look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline("\r\n")
});

// START: new serial
// var SerialPort = require('serialport');
// var myPort = new SerialPort('/dev/ttyACM0', {
//  parser: SerialPort.parsers.readline('\n')
// });
// END: new serial

// app.use(function(req, res) {
// res.send('Yeat');
// });

// this function responds to a GET request with the index page:
function sendIndexPage(request, res) {
res.redirect('/index.html');
}

function sendToSerial(request, res) {


  // get the parameters from the URL:
  var brightnessCommand = request.params.color + request.params.brightness;
  console.log("received "+ brightnessCommand);
  // send it out the serial port:
  myPort.write(brightnessCommand);
  // send the data and close the connection:
  //request.respond(brightnessCommand);
}

//app.listen(port, function() {
//console.log('Ears on port', port);
//});

module.exports = router;
