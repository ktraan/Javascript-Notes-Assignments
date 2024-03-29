const API_KEY = '097S0L4ON78BMIRE';
const ENDPOINT = 'https://www.alphavantage.co/query?function=';


const Stock = function(attributes) 
{
    this.symbol = "";
    this.stockData = {};
    this.stockHistoryData = [];
    if(attributes) 
    {
        Object.assign(this, attributes);
    }
}

Stock.prototype.getStockPrice = function() {
    return fetch(`${ENDPOINT}GLOBAL_QUOTE&symbol=${this.symbol}&apikey=${API_KEY}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let symbol = data["Global Quote"]["01. symbol"],
        price = data["Global Quote"]["05. price"],
        date = data["Global Quote"]["07. latest trading day"];

        return Object.assign(this.stockData, {symbol, price, date});
    });
}


Stock.prototype.getStockFiveDayHistory = function() {
    return fetch(`${ENDPOINT}TIME_SERIES_WEEKLY&symbol=${this.symbol}&apikey=${API_KEY}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let weeklyTimeArray = Object.getOwnPropertyNames(data["Weekly Time Series"]);
        let fiveDayArray = weeklyTimeArray.slice(0,5);
        let priceHistoryArray = [];
         
        for (let index = 0; index < fiveDayArray.length; index++)
        {
            priceHistoryArray.push(data["Weekly Time Series"][fiveDayArray[index]]);
        }

        open = priceHistoryArray[0]['1. open'];
        high = priceHistoryArray[0]['2. high'];
        low = priceHistoryArray[0]['3. low'];
        close = priceHistoryArray[0]['4. close'];
        date = fiveDayArray[0];
        return Object.assign(this.stockHistoryData, priceHistoryArray);
    });
}

Stock.prototype.getStockPriceAndHistory = function() {
    return this.getStockPrice(this.symbol)
    .then(() => {
        return this.getStockFiveDayHistory(this.symbol);
    })
    .then(() => {
        return this.stockData, this.stockHistoryData
    })
}

export { Stock };