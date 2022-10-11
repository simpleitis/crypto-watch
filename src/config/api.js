export const CoinList = (currency, count = 10) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${count}&page=1&sparkline=false`;

export const HistoricalChart = (id, currency, days) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const CurrencyList = () =>
  `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`;

export const ExchangeRate = (id, currency) =>
  `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${currency}`;
