const cron = require("node-cron");
const mongoose = require("mongoose");
const yahooFinance = require("yahoo-finance2").default;
const StockFundamentals = require("../models/Stock.js");
require("dotenv").config({ path: "../.env" });

const url = process.env.MONGO_URL;

const stockSymbols = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "BHARTIARTL.NS", "LT.NS", "KOTAKBANK.NS", "SBIN.NS", "HINDUNILVR.NS",
  "VOLTAS.NS", "CROMPTON.NS", "PERSISTENT.NS", "DIXON.NS", "DEEPAKNTR.NS",
  "TATAELXSI.NS", "MPHASIS.NS", "ZYDUSLIFE.NS", "SUPREMEIND.NS", "JKCEMENT.NS",
  "ABB.NS", "BALKRISIND.NS", "POLYCAB.NS", "TRENT.NS", "AIAENG.NS","SUZLON.NS","PERSISTENT.NS","HINDALCO.NS"
];

function formatMarketCapInCrores(value) {
  if (!value) return "N/A";
  return `₹${(value / 1e7).toFixed(2)} Cr`;
}

async function updateStockFundamentals() {
  console.log("Fetching latest stock data...");

  try {
    const results = await Promise.all(stockSymbols.map(symbol => yahooFinance.quote(symbol)));

    for (const data of results) {
      const updatedStock = {
        symbol: data?.symbol ?? "N/A",
        marketCap: formatMarketCapInCrores(data?.marketCap),
        currentPrice: data?.regularMarketPrice ?? "N/A",
        previousPrice: data?.regularMarketPreviousClose ?? "N/A",
        dailyChangePercent: data?.regularMarketChangePercent !== undefined
          ? `${data.regularMarketChangePercent.toFixed(2)}%`
          : "0.00%",
        highLow: `${data?.fiftyTwoWeekHigh ?? "N/A"} / ${data?.fiftyTwoWeekLow ?? "N/A"}`,
        peRatio: data?.trailingPE ?? "N/A",
        bookValue: data?.bookValue ?? "N/A",
        roe: data?.returnOnEquity
          ? `${(data.returnOnEquity * 100).toFixed(2)}%`
          : "N/A"
      };

      await StockFundamentals.findOneAndUpdate(
        { symbol: data.symbol },
        updatedStock,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`Updated: ${data.symbol} (${updatedStock.dailyChangePercent})`);
    }

    console.log(" All stocks updated successfully.");
  } catch (err) {
    console.error(" Error during update:", err);
  }
}

//  Wrap in function and export
function startCronJob() {
  mongoose.connect(url)
    .then(() => console.log(" MongoDB connected"))
    .catch(err => console.error(" MongoDB connection error:", err));

  updateStockFundamentals();

  cron.schedule("0 9,12,15 * * *", () => {
    console.log(" Running scheduled stock update...");
    updateStockFundamentals();
  });

  console.log(" Cron job scheduled: 9:00 AM, 12:00 PM, 3:00 PM daily.");
}

module.exports = startCronJob;
