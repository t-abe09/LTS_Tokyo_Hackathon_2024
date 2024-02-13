import yahooFinance from "yahoo-finance2";

export function fetchStockData(symbols: string[]):StockData[]{
  // 開始日
  const startDate = new Date('2018-01-01');
  
  // 終了日
  const endDate = new Date();

  const stockData = symbols.map((symbol: string) => {
    // 5年分の株価情報取得
    return yahooFinance.historical(symbol, { period1: startDate, period2: endDate })
    .then((historicalData: any) => {  
      // 取得結果
      const stock: StockData = {
        company: symbol,
        stockHistory: []
      };
      // 取得結果の表示
      for (const data of historicalData) {
        stock.stockHistory.push({
          date: data.date,
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close
        });
      }
      return stock;
    }).then((stock: StockData) => {
      stockData.push(stock);
    }).catch((err: any) => {
      console.log(err);
    });
  });
  return stockData;
}

type StockData = {
  company: string;
  stockHistory: StockHistory[];
}

type StockHistory = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}