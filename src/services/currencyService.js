const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL });

const getExchangeRates = async (baseCurrency) => {
  const cacheKey = `exchangeRates_${baseCurrency}`;
  const cachedRates = cache.get(cacheKey);
  if (cachedRates) {
    return cachedRates;
  }

  try {
    const response = await axios.get(
      `${process.env.EXCHANGE_API_URL}/${baseCurrency}`,
      {
        params: { apikey: process.env.EXCHANGE_API_KEY },
      }
    );
    const rates = response.data.rates;
    cache.set(cacheKey, rates);
    return rates;
  } catch (error) {
    throw new Error('Failed to fetch exchange rates');
  }
};

module.exports = { getExchangeRates };
