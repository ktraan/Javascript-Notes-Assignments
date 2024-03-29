// Test suite for the Stock module
import mocha from 'mocha';
import chai from 'chai';
import chaiAsPromissed from 'chai-as-promised';
import fetchMock from 'fetch-mock';

// TODO: import Stock from the stock.js file
import { Stock } from "../js/src/stock.js";

// TODO: choose your desired assertion style
chai.should();
chai.use(chaiAsPromissed); // easier testing of async/promises

const API_KEY = '097S0L4ON78BMIRE';
const ENDPOINT = 'https://www.alphavantage.co/query?function=';

const TEST_SYMBOL = "VOO";
const TEST_PRICE = 9000
const TEST_DATE = "2020-05-14";
const TEST_OPEN = 9000;
const TEST_HIGH = 9002;
const TEST_LOW = 8999;
const TEST_CLOSE = 9001;
const STOCK_GLOBAL_URL = `${ENDPOINT}GLOBAL_QUOTE&symbol=${TEST_SYMBOL}&apikey=${API_KEY}`
const STOCK_WEEKLY_URL = `${ENDPOINT}TIME_SERIES_WEEKLY&symbol=${TEST_SYMBOL}&apikey=${API_KEY}`


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
            before("Populated Stock instance", function() {
                stock = new Stock({ symbol: TEST_SYMBOL,
                                    stockData: {
                                        symbol: TEST_SYMBOL,
                                        price: TEST_PRICE,
                                        date: TEST_DATE,
                                    },
                                    stockHistoryData: {
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
                stock.stockData.symbol.should.equal(TEST_SYMBOL);
                stock.stockData.price.should.equal(TEST_PRICE);
                stock.stockHistoryData.should.be.an("Object");
                stock.stockHistoryData.open.should.equal(TEST_OPEN);
                stock.stockHistoryData.high.should.equal(TEST_HIGH);
                stock.stockHistoryData.low.should.equal(TEST_LOW);
                stock.stockHistoryData.close.should.equal(TEST_CLOSE);
                
            });
        });
    });

    describe('#getStockPrice()', function () {
        let stock;
        const TEST_STOCK_DATA = {
            symbol: TEST_SYMBOL,
            price: TEST_PRICE,
            date: TEST_DATE
        };
        before("Setup FetchMock", function() {
            fetchMock.get(STOCK_GLOBAL_URL, {
                "Global Quote": {
                    "01. symbol": TEST_SYMBOL,
                    "02. open": "240.6600",
                    "03. high": "241.6350",
                    "04. low": "228.1000",
                    "05. price": TEST_PRICE,
                    "06. volume": "8412546",
                    "07. latest trading day": TEST_DATE,
                    "08. previous close": "226.4800",
                    "09. change": "8.3599",
                    "10. change percent": "3.6912%"
                }
             })
                
        })
        beforeEach(`Setup stock object for ${TEST_SYMBOL}`, function() {
            stock = new Stock({ symbol: TEST_SYMBOL });            
        })
        it('returns the symbol, price, and date', function () {
            // TODO: assert that the method resolves an object that has at a minimum the
            // required properties
            let stockData = stock.getStockPrice();
            stockData.should.eventually.have.property("symbol")
            stockData.should.eventually.have.property("price");
            stockData.should.eventually.have.property("date");
            
            // TODO: assert that the instance has the required data saved to its stockData
            // property
            fetchMock.lastUrl().should.equal(STOCK_GLOBAL_URL);
            return stockData.should.eventually.deep.equal(TEST_STOCK_DATA);


        });
    });

    describe('#getStockFiveDayHistory()', function() {
        let stock;
        const TEST_STOCK_DATA = {

        }
        before("Setup fetch mock", function() {
            fetchMock.get(STOCK_WEEKLY_URL, {
                "Weekly Time Series": {
                    "2020-03-13": {
                      "1. open": "253.8900",
                      "2. high": "263.8100",
                      "3. low": "225.8100",
                      "4. close": "233.0600",
                      "5. volume": "71369923"
                    },
                    "2020-03-06": {
                      "1. open": "274.0000",
                      "2. high": "288.3197",
                      "3. low": "266.6000",
                      "4. close": "273.1900",
                      "5. volume": "40261997"
                    },
                    "2020-02-28": {
                      "1. open": "296.9600",
                      "2. high": "299.3780",
                      "3. low": "262.2500",
                      "4. close": "271.7400",
                      "5. volume": "63788745"
                    },
                    "2020-02-21": {
                      "1. open": "309.2400",
                      "2. high": "311.5900",
                      "3. low": "305.6200",
                      "4. close": "306.4900",
                      "5. volume": "12531720"
                    },
                    "2020-02-14": {
                      "1. open": "304.3900",
                      "2. high": "310.7200",
                      "3. low": "304.3500",
                      "4. close": "310.2800",
                      "5. volume": "10423360"
                    }
                }
            })
        })
        beforeEach("Setup stock object", function() {
            stock = new Stock({ symbol:TEST_SYMBOL });
        })
        xit('returns an array of the previous five days open, high, low, close, and date', function () {
            // TODO: assert that the method resolves an array with five objects that each
            // contain at a minimum the required properties
            let stockHistory = stock.getStockFiveDayHistory();
            stockHistory.should.eventually.be.an("array")
            stockHistory.should.eventually.have.property("open")
            // stockHistory.should.eventually.have.property("high")
            // stockHistory.should.eventually.have.property("low")
            // stockHistory.should.eventually.have.property("close")
            // stockHistory.should.eventually.have.property("date")
            // TODO: assert that the instance has the required data saved to its stockData
            // property
        });
    });

    // TODO: define a suite to test the #getCurrentAndFiveDayHistory method. This
    // method should resolve an object that contains both the current stock price
    // details (see test above) and the array of five history objects
    describe("getPriceAndHistory()", function() {
        let stock;
        before("setup stock object", function() {
            stock = new Stock({symbol:TEST_SYMBOL})
        });
        xit("returns an object that contains both price and history", function() {
            let stockData = stock.getStockPriceAndHistory();
            stockData.should.eventually.be.an("object");
            stockData.should.eventually.have.property("object");
            stockData.should.eventually.have.property("array")

        })
    });

});
