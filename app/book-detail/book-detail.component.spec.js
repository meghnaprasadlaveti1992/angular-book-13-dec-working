'use strict';

describe('bookDetail', function() {

  // Load the module that contains the `bookDetail` component before each test
  beforeEach(module('bookDetail'));

  // Test the controller
  describe('BookDetailController', function() {
    var $httpBackend, ctrl;
    var xyzBookData = {
      name: 'book xyz',
      images: ['image/url1.png', 'image/url2.png']
    };

    beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('books/xyz.json').respond(xyzBookData);

      $routeParams.bookId = 'xyz';

      ctrl = $componentController('bookDetail');
    }));

    it('should fetch the book details', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.book).toEqual({});

      $httpBackend.flush();
      expect(ctrl.book).toEqual(xyzBookData);
    });

  });

});
