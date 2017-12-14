'use strict';

// Register `bookDetail` component, along with its associated controller and template
angular.
  module('bookDetail').
  component('bookDetail', {
    templateUrl: 'book-detail/book-detail.template.html',
    controller: ['$routeParams', 'Book',
      function BookDetailController($routeParams, Book) {
        var self = this;
        self.book = Book.get({bookId: $routeParams.bookId}, function(book) {
          self.setImage(book.images[0]);
        });

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };
      }
    ]
  });
