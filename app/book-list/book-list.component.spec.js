'use strict';

describe('bookList', function() {

  // Load the module that contains the `bookList` component before each test
  beforeEach(module('bookList'));

  // Test the controller
  describe('BookListController', function() {
    var $httpBackend, ctrl;

    beforeEach(inject(function($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('books/books.json')
                  .respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      ctrl = $componentController('bookList');
    }));

    it('should create a `books` property with 2 books fetched with `$http`', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.books).toEqual([]);

      $httpBackend.flush();
      expect(ctrl.books).toEqual([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });

    it('should set a default value for the `orderProp` property', function() {
      expect(ctrl.orderProp).toBe('age');
    });

  });

});
