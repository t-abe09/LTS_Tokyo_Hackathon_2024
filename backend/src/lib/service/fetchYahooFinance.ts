import yahooFinance from "yahoo-finance2";

export async function fetchStockData(symbols: string[]): Promise<StockData[]> {
  // 開始日
  const startDate = new Date('2024-02-12');

  // 終了日
  const endDate = new Date();

  // 取得結果
  const stockData: StockData[] = [];

  // 非同期処理を並列実行
  const historicalDataPromises = symbols.map(async (symbol) => {
    // 5年分の株価情報取得
    return await yahooFinance.historical(symbol, { period1: startDate, period2: endDate });
  });

  // 全ての株価情報取得完了を待機
  const historicalData = await Promise.all(historicalDataPromises);

  // 取得結果を加工
  for (let i = 0; i < historicalData.length; i++) {
    const stock: StockData = {
      company: symbols[i],
      stockHistory: historicalData[i].map((d: { date: any; open: any; high: any; low: any; close: any; }) => ({
        date: d.date,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      })),
    };
    stockData.push(stock);
  }
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