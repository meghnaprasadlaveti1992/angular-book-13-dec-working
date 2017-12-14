'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('BookCat Application', function() {

  it('should redirect `index.html` to `index.html#!/books', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toBe('/books');
  });

  describe('View: Book list', function() {

    beforeEach(function() {
      browser.get('index.html#!/books');
    });

    it('should filter the book list as a user types into the search box', function() {
      var bookList = element.all(by.repeater('book in $ctrl.books'));
      var query = element(by.model('$ctrl.query'));

      expect(bookList.count()).toBe(20);

      query.sendKeys('nexus');
      expect(bookList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect(bookList.count()).toBe(8);
    });

    it('should be possible to control book order via the drop-down menu', function() {
      var queryField = element(by.model('$ctrl.query'));
      var orderSelect = element(by.model('$ctrl.orderProp'));
      var nameOption = orderSelect.element(by.css('option[value="name"]'));
      var bookNameColumn = element.all(by.repeater('book in $ctrl.books').column('book.name'));

      function getNames() {
        return bookNameColumn.map(function(elem) {
          return elem.getText();
        });
      }

      queryField.sendKeys('tablet');   // Let's narrow the dataset to make the assertions shorter

      expect(getNames()).toEqual([
        'Motorola XOOM\u2122 with Wi-Fi',
        'MOTOROLA XOOM\u2122'
      ]);

      nameOption.click();

      expect(getNames()).toEqual([
        'MOTOROLA XOOM\u2122',
        'Motorola XOOM\u2122 with Wi-Fi'
      ]);
    });

    it('should render book specific links', function() {
      var query = element(by.model('$ctrl.query'));
      query.sendKeys('nexus');

      element.all(by.css('.books li a')).first().click();
      expect(browser.getLocationAbsUrl()).toBe('/books/nexus-s');
    });

  });

  describe('View: Book detail', function() {

    beforeEach(function() {
      browser.get('index.html#!/books/nexus-s');
    });

    it('should display the `nexus-s` page', function() {
      expect(element(by.binding('$ctrl.book.name')).getText()).toBe('Nexus S');
    });

    it('should display the first book image as the main book image', function() {
      var mainImage = element(by.css('img.book.selected'));

      expect(mainImage.getAttribute('src')).toMatch(/img\/books\/nexus-s.0.jpg/);
    });

    it('should swap the main image when clicking on a thumbnail image', function() {
      var mainImage = element(by.css('img.book.selected'));
      var thumbnails = element.all(by.css('.book-thumbs img'));

      thumbnails.get(2).click();
      expect(mainImage.getAttribute('src')).toMatch(/img\/books\/nexus-s.2.jpg/);

      thumbnails.get(0).click();
      expect(mainImage.getAttribute('src')).toMatch(/img\/books\/nexus-s.0.jpg/);
    });

  });

});
