(function() {
  'use strict';
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
