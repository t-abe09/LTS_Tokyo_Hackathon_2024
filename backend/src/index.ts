// import { Server } from "./lib/app";

import { fetchStockData } from "./lib/service/fetchYahooFinance";

// const server = new Server();
// server.Run();

const stocks = ["AAPL", "GOOG", "TSLA", "MSFT"];

const data = fetchStockData(stocks);
console.log(data);

// const data = await fetchStockData(stocks);)