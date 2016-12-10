(function() {
  'use strict';
  $.getJSON('/uploads')
    .done((files) => {
      // const $books = $('#books');
      // var fileObj = JSON.parse(files);

      for (let file of files) {
        var id = file.id;
        var name = file.name;
        var category = file.category;
        var user_id = file.user_id;
        var created_at = file.created_at;

        $('#table tr:last').after('<tr><th scope="row">' + id + '<td>' + name + '</td><td class="right">' + category + '</td><td>' + user_id + '</td><td>' + created_at + '</td></tr>');

      }
    })
    .fail(() => {
      console.log("Unable to retrieve files");
    });
})();
