'use strict';
var path = require('path');

exports.seed = function(knex, Promise) {
  var uploadDir = path.join(__dirname, '../public/uploads');
  // Deletes ALL existing entries
  return knex('uploads').del()
    .then(function() {
        // Inserts seed entries
        return knex('uploads').insert([{
          id: 1,
          name: 'seed1test.txt',
          path: uploadDir,
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
        }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('uploads_id_seq', (SELECT MAX(id) FROM uploads));"
      );
    });
};
