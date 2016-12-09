'use strict';
var path = require('path');

exports.seed = function(knex, Promise) {
    var uploadDir = path.join(__dirname, '../public/uploads');
    // Deletes ALL existing entries
    return knex('uploads').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('uploads').insert({
                    id: 1,
                    name: 'seed1test.txt',
                    path: uploadDir,
                    category: 'text',
                    user_id: 1,
                    created_at: new Date('2016-06-26 14:26:16 UTC'),
                    updated_at: new Date('2016-06-26 14:26:16 UTC')
                }),
                knex.raw("SELECT setval('uploads_id_seq', (SELECT MAX(id) FROM uploads))")
            ]);
        });
};
