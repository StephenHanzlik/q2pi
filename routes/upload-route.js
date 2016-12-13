'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const boom = require('boom');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = 'my_awesome_cookie_signing_key';


const authorize = function(req, res, next) {
  const token = req.cookies.token;
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      return res.redirect('/signin.html');
    }
    req.token = decoded;
    next();
  });
};


router.get('/', authorize, function(req, res, next){

  knex('uploads')
    .join('users', 'users.id', '=', 'uploads.user_id')
    .select('uploads.name', 'uploads.category', 'users.username', 'uploads.created_at', 'uploads.path')
    .orderBy('users.username')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.post('/', authorize, function(req, res, next){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../public/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    ////// duplicate file name handling attempt 3
    // create a unique string of characters plus the original file's name
    // this allows a file to be uploaded multiple times, but not overwrite existing files in the filesystem
    // for example '.../upload_39fe0713af8bbbbcc7ceceeeac031a69' + "_" 'G36_Notes.txt'
    var uniqueFileName = file.path + "_" + file.name;
    console.log(file);
    // const userId = function () {
    //   // knex('users').where({
    //   //   first_name: 'Test',
    //   //   last_name:  'User'
    //   // }).select('id')
    //   // console.log(req.token);
    //  knex('users')
    //   .where({email: req.token})
    //   .select('id')
    //   .first()
    //   .then((result) => {
    //     console.log(result);
    //   });
    // };
    // console.log(userId());

    fs.rename(file.path, uniqueFileName, function(){
      // get uploader's user id
      knex('users')
       .where({email: req.token})
       .select('id')
       .first()
       .then((user) => {
         knex('uploads')
          .insert({
              name: file.name,
              path: uniqueFileName,
                // TODO: change category to the download_path, category is temporarily being used as the download path for client's 'file download' links
                category: uniqueFileName.slice(uniqueFileName.indexOf('uploads/upload_')),
              user_id:
              user.id
            }, '*')
          .then((result) => {
                res.end('success\n' + result);
          })
          .catch((err) => {
              next(err);
          });
        });
      });

  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // parse the incoming request containing the form data
  form.parse(req);

});
// router.use(function (req, res, next) {
//   if(!req.user.isAdmin){
//     res.sendStatus(401);
//   } else {
//     next();
//   }
// });
router.delete('/', (req, res, next) => {

      fs.unlink('/Users/stephenhanzlik/Workspace/Q2/Week10/q2pi/public/' + req.body.fileCat, function(){
            knex('uploads')
           .where({category: req.body.fileCat})
           .first()
           .then((result) => {
                   if(result.id) {
                         return knex('uploads')
                         .del()
                         .where('id', result.id)
                        .then((result) => {
                              res.end('success\n' + result);
                        })
                        .catch((err) => {
                              next(err);
                        });
                  }
          });
      });
});



module.exports = router;
