'use strict';
const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;

router.get('/', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'bucket-owner-full-control'
  };
  // console.log('*****************',s3Params);
  s3.getSignedUrl('postObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    // console.log('*************', data);
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

module.exports = router;
