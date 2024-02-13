// import { Server } from "./lib/app";

// const server = new Server();
// server.Run();

import { fetchStockData } from "./lib/service/fetchYahooFinance";

async function main() {
  const stocks = ["AAPL", "GOOG", "TSLA", "MSFT"];

  const data = await fetchStockData(stocks);

  // 取得結果の表示
  data.map((stock) => {
    console.log(stock);
  });
}

main();
