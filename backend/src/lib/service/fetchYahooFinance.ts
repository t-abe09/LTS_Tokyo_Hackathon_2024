import yahooFinance from "yahoo-finance2";
import { createObjectCsvWriter } from 'csv-writer';
import { Chart } from "chart.js";
import * as fs from "fs";

export async function fetchStockData(symbols: string[]): Promise<StockData[]> {
  // 開始日
  const startDate = new Date('2022-02-12');

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

export function toCsv(data: StockData[]) {
  for(let i = 0; i < data.length; i++) {
    const csvWriter = createObjectCsvWriter({
      path: `${data[i].company}.csv`,
      header: [
        { id: 'date', title: 'date' },
        { id: 'open', title: 'open' },
        { id: 'high', title: 'high' },
        { id: 'low', title: 'low' },
        { id: 'close', title: 'close' },
      ],
    });

    csvWriter.writeRecords(data[i].stockHistory)
    .then(() => console.log(`The CSV file was written successfully: ${data[i].company}.csv`));
  }
}

export function toChart(data: StockData[]) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((d) => d.stockHistory.map((s) => s.date)),
      datasets: [
        {
          label: "株価",
          data: data.map((d) => d.stockHistory.map((s) => s.close)),
        },
      ],
    },
  });

  const image = chart.toBase64Image();

fs.writeFile("output.png", image, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("PNG画像を出力しました。");
});
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