'use strict';
var path = require('path');

exports.seed = function(knex, Promise) {
  var uploadDir = path.join(__dirname, '../public/uploads');
  // Deletes ALL existing entries
  return knex('uploads').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('uploads').insert([{
          id: 1,
          name: 'G36_Notes.txt',
          path: uploadDir + '/upload_39fe0713af8bbbbcc7ceceeeac031a69_G36_Notes.txt',
          category: 'Text',
          user_id: 1,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 2,
          name: 'dinkydink.png',
          path: uploadDir,
          category: 'Image',
          user_id: 1,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 3,
          name: 'spider.mp4',
          path: uploadDir,
          category: 'Movie',
          user_id: 1,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 4,
          name: 'tron.mp4',
          path: uploadDir,
          category: 'Movie',
          user_id: 1,
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }]),
        knex.raw("SELECT setval('uploads_id_seq', (SELECT MAX(id) FROM uploads))")
      ]);
    });
};
