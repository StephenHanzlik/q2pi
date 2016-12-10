(function() {
  'use strict';
<<<<<<< HEAD

  $.getJSON('/uploads')
    .done((files) => {
      // const $books = $('#books');
      // var fileObj = JSON.parse(files);

      for (const file of files) {
        var id = file.id;
        var name = file.name;
        var category = file.category;
        var user_id = file.user_id;
        var created_at = file.created_at;

        $('#table tr:last').after('<th scope="row">' + id + '<td>' + name + '</td><td class="right">' + category + '</td><td>' + user_id + '</td><td>' + created_at + '</td></tr>');

      }
    })
    .fail(() => {
      console.log("Unable to retrieve files");
    });
})();
=======
  $.getJSON('/upload')
    .done((files) => {
      const $fileData = $('#fileData');

      for (const fileData of fileData) {
        const $anchor = $('<a>')
          .attr({
            href: `/book.html?id=${book.id}`,
            'data-delay': '50',
            'data-tooltip': book.title
          })
          .tooltip();

        const $card = $('<div>').addClass('card');
        const $cardImage = $('<div>').addClass('card-image');
        const $col = $('<div>').addClass('col s6 m4 l3');
        const $img = $('<img>').attr({ src: book.coverUrl, alt: book.title });

        $cardImage.append($img);
        $anchor.append($cardImage);
        $card.append($anchor);
        $col.append($card);
        $books.append($col);
      }
    })
})
>>>>>>> de586add44f04032b92e3a4a0715208766431c7c
