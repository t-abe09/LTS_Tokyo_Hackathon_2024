import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as pdfjsLib from "pdfjs-dist";

export async function genAI(text:string):Promise<string> {
    // ライブラリのインスタンスを生成
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_PRO_API_KEY!);
    // modelを生成
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    // promptを生成
    const prompt = `画像を読み取って、要約してください。
    ## 要約対象文章
    ${text}
    ## 制限
    「出力=」に続けて出力すること
    ## 要約結果
    出力=
    `;
    
    // 生成
    const result = await model.generateContent(prompt);
    // レスポンスからテキストを取得
    const response = await result.response;
    const summary = response.text();
    return summary;
}

// PDFファイルからテキストを取得する処理
export async function getTextFromPdf(pdfPath: string): Promise<string> {
  const pdfData = new Uint8Array(fs.readFileSync(pdfPath));

  const loadingTask = pdfjsLib.getDocument({ data: pdfData });
  const pdf = await loadingTask.promise;
  const maxPages = pdf.numPages;
  let pdfText = "";

  for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent({ disableNormalization: true, includeMarkedContent: false });
    const pageText = content.items.map((item) => ("str" in item ? item.str : "")).join("\n");
    pdfText += pageText + "\n";
  }
  
  return pdfText;
  }