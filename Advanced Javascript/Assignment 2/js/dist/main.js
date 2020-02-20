;

(function () {
  "use strict";

  /** API key for signing the request */
  var API_KEY = 'YOUR_API_HERE';
  /** Alpha Vantage REST endpoint */

  var ENDPOINT = 'https://www.alphavantage.co/query?function=';
  /**
   * Display the current price and other information for a stock.
   * @param {HTMLElement} el DOM element parent for the display of the data. Must
   * contain a .symbol, .price, and .date elements.
   * @param {Object} data The returned stock symbol data
   */
  // const displayResults = (el, data) => {
  //     let {'01. symbol':symbol, '05. price':price, '07. latest trading day':date} = data['Global Quote'];
  //     el.querySelector('.price').innerHTML = `$${Number(price).toFixed(2)}`;
  //     el.querySelector('.symbol').innerHTML = symbol.toUpperCase();
  //     el.querySelector('.date').innerHTML = `${date} ${date.includes(':')? date : ''}`;
  // };

  var renderStock = function renderStock(data) {
    var _data$GlobalQuote = data['Global Quote'],
        symbol = _data$GlobalQuote['01. symbol'],
        price = _data$GlobalQuote['05. price'],
        date = _data$GlobalQuote['07. latest trading day'];
    var stockObject = {
      "symbol": symbol,
      "price": price,
      "date": date
    };
    document.querySelector(".stock-display").innerHTML = Handlebars.templates['stock'](stockObject);
  };
  /**
   * Handle symbol form submit to fetch the desired symbol information.
   * @param {Event} evt Event object for this listener function
   */


  var fetchTickerData = function fetchTickerData(evt) {
    evt.preventDefault(); // get the symbol

    var symbol = evt.target.elements['symbol'].value;
    fetch("".concat(ENDPOINT, "GLOBAL_QUOTE&symbol=").concat(symbol, "&apikey=").concat(API_KEY)).then(function (response) {
      return response.json();
    }).then(function (data) {
      // log and export all data
      if (data['Error Message']) {
        // BONUS
        throw new Error("There was an error fulfilling your request. Be sure you've entered a valid symbol");
      }

      renderStock(data); //displayResults(document.querySelector('.stock-display'), data);
    })["catch"](function (err) {
      // BONUS
      alert("There was an error: ".concat(err));
    });
  }; // add the submit listener


  document.querySelector('.frm.symbol').addEventListener('submit', fetchTickerData);
})();
