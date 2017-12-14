'use strict';

describe('Book', function() {
  var $httpBackend;
  var Book;
  var booksData = [
    {name: 'Book X'},
    {name: 'Book Y'},
    {name: 'Book Z'}
  ];

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Book` service before each test
  beforeEach(module('core.book'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Book_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('books/books.json').respond(booksData);

    Book = _Book_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the books data from `/books/books.json`', function() {
    var books = Book.query();

    expect(books).toEqual([]);

    $httpBackend.flush();
    expect(books).toEqual(booksData);
  });

});
