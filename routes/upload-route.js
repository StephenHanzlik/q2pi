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

  knex('uploads')
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
    // var newPath = path.join(form.uploadDir, file.name);

    //////// duplicate file name handling attempt 1
    // if (fs.existsSync(path.join(form.uploadDir, file.name))) {
    //   // next(boom.create(400, 'A file with that name already exists, please choose a different name for your upload.'));
    //   file.name = 'copy of ' + file.name;
    //   fs.rename(file.path, path.join(form.uploadDir, file.name));
    // } else {
    //   // console.log(file.path);
    //   path.join(form.uploadDir, file.name);
    // }
    ////// duplicate file name handling attempt 2
    // if (fs.existsSync(path.join(form.uploadDir, file.name))) {
    //   while (fs.existsSync(path.join(form.uploadDir, file.name))) {
    //     console.log(form.uploadDir, file.name, file.path);
    //     file.name = 'copyof-' + file.name;
    //     fs.rename(file.path, path.join(form.uploadDir, file.name));
    //     file.path = path.join(form.uploadDir, file.name);
    //   }
    // } else {
    //   fs.rename(file.path, path.join(form.uploadDir, file.name));
    // }


    ////// duplicate file name handling attempt 3
    // create a unique string of characters plus the original file's name
    // this allows a file to be uploaded multiple times, but not overwrite existing files in the filesystem
    // for example '.../upload_39fe0713af8bbbbcc7ceceeeac031a69' + "_" 'G36_Notes.txt'
    var uniqueFileName = file.path + "_" + file.name;

    fs.rename(file.path, uniqueFileName);
    knex('uploads')
        .insert({
            name: file.name,
            path: uniqueFileName,
            category: 'text',
            user_id: 1
        }, '*')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            next(err);
        });
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
