// import { Server } from "./lib/app";

import { fetchStockData, toCsv } from "./lib/service/fetchYahooFinance";

// const server = new Server();
// server.Run();


async function main() {
    const symbols = ['4452.T', '8113.T', '4912.T'];
    const data = await fetchStockData(symbols);
    toCsv(data);
}

main();

