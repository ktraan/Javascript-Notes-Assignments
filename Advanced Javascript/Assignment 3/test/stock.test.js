// Test suite for the Stock module
import mocha from 'mocha';
import chai from 'chai';
import chaiAsPromissed from 'chai-as-promised';
import fetchMock from 'fetch-mock';

// TODO: import Stock from the stock.js file
import { Stock } from "../js/src/stock.js";

chai.should();
chai.use(chaiAsPromissed); // easier testing of async/promises

// TODO: choose your desired assertion style

// NOTE: all tests are currently pending. Your task is to create the assertions,
// then remove the pending status and see that all tests are currently failing.
// Then, progresively implement the changes to your codebase so that each test
// passes.
describe('Stock constructor', function () {
    it('should exist', function () {
        // TODO: assert that the Stock function exists
        Stock.should.exist
    });

    describe('Constructor', function () {
        let stock;
        context('without attributes - new Stock()', function () {
            before("Empty stock instance", function() {
                stock = new Stock();
            });
            
            it('should create a new Stock object with default #symbol property', function () {
                // TODO: assert #symbol should be an empty string
                stock.symbol.should.equal("");
                // TODO: assert #stockData should be an empty object
                stock.stockData.should.deep.equal({});
            });
        });

        context('with attributes - new Stock({ attributes })', function () {
            const TEST_SYMBOL = "VOO";
            const TEST_PRICE = 9000
            const TEST_DATE = "2020-05-14";
            const TEST_OPEN = 9000;
            const TEST_HIGH = 9002;
            const TEST_LOW = 8999;
            const TEST_CLOSE = 9001;
            before("Populated Stock instance", function() {
                stock = new Stock({ symbol: TEST_SYMBOL,
                                    stockData: {
                                        price: TEST_PRICE,
                                        date: TEST_DATE,
                                        open: TEST_OPEN,
                                        high: TEST_HIGH,
                                        low: TEST_LOW,
                                        close: TEST_CLOSE
                                    }});
            });
            it('should assign attribute values as properties on the instance', function () {
                // TODO: assert that when the constructor is called with an object of attributes
                // that the attributes are all assigned as properties on the insance
                stock.symbol.should.equal(TEST_SYMBOL);
                stock.stockData.price.should.equal(TEST_PRICE);
                stock.stockData.date.should.equal(TEST_DATE);
                stock.stockData.open.should.equal(TEST_OPEN);
                stock.stockData.high.should.equal(TEST_HIGH);
                stock.stockData.low.should.equal(TEST_LOW);
                stock.stockData.close.should.equal(TEST_CLOSE);
            });
        });
    });

    describe('#getStockPrice()', function () {
        let stock;
        const SYMBOL = "VOO";
        const PRICE = 300;
        

        xit('returns the symbol, price, and date', function () {
            // TODO: assert that the method resolves an object that has at a minimum the
            // required properties
            // TODO: assert that the instance has the required data saved to its stockData
            // property
        });
    });

    describe('#getStockFiveDayHistory()', function () {
        xit('returns an array of the previous five days open, high, low, close, and date', function () {
            // TODO: assert that the method resolves an array with five objects that each
            // contain at a minimum the required properties
            // TODO: assert that the instance has the required data saved to its stockData
            // property
        });
    });

    // TODO: define a suite to test the #getCurrentAndFiveDayHistory method. This
    // method should resolve an object that contains both the current stock price
    // details (see test above) and the array of five history objects

});