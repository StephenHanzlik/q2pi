'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom'); // error logging module
const morgan = require('morgan'); // req/res logging module
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

// app.use(express.static(path.join(__dirname, 'public')));

router.get('/', function(req, res, next){
  //original line from file-uploader
  // res.sendFile(path.join(__dirname, 'views/index.html'));
    knex()
      .select('*')
      .from('uploads')
      .join('users', 'users.id', '=', 'uploads.user_id')
      .orderBy('id')
      .then((result) => {
          res.send(result);
      })
      .catch((err) => {
          next(err);
      });
});

router.post('/', function(req, res, next){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../public/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});
module.exports = router;
