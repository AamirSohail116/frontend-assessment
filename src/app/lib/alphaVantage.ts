/* eslint-disable @typescript-eslint/no-explicit-any */
const API_KEY = process.env.NEXT_PUBLIC_ALPHA_KEY!;

export interface StockSearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
  matchScore: number;
}

export interface StockData {
  symbol: string;
  price: number;
  changePercent: string;
  name: string;
}

export interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

async function handleApiResponse(response: any) {
  if (response.Information && response.Information.includes("API rate limit")) {
    throw new Error("API_RATE_LIMIT");
  }
  if (response.Note && response.Note.includes("API call frequency")) {
    throw new Error("API_RATE_LIMIT");
  }
  if (response["Error Message"]) {
    throw new Error("API_ERROR");
  }
  return response;
}

export async function searchStocks(
  query: string
): Promise<StockSearchResult[]> {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`
  );
  const json = await res.json();
  await handleApiResponse(json);

  return (
    json.bestMatches?.map((match: any) => ({
      symbol: match["1. symbol"],
      name: match["2. name"],
      type: match["3. type"],
      region: match["4. region"],
      currency: match["8. currency"],
      matchScore: parseFloat(match["9. matchScore"]),
    })) || []
  );
}

export async function getStockQuote(symbol: string): Promise<StockData> {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
  );
  const json = await res.json();
  const data = json["Global Quote"];
  await handleApiResponse(json);

  return {
    symbol: data["01. symbol"],
    price: parseFloat(data["05. price"]),
    changePercent: data["10. change percent"],
    name: symbol,
  };
}

export async function getHistoricalData(
  symbol: string
): Promise<HistoricalData[]> {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}&outputsize=compact`
  );
  const json = await res.json();
  await handleApiResponse(json);
  const timeSeries = json["Time Series (Daily)"];

  return Object.entries(timeSeries || {})
    .map(([date, values]: [string, any]) => ({
      date,
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
      volume: parseInt(values["5. volume"]),
    }))
    .slice(0, 30);
}
