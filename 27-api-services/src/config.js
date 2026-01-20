const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  externalApi: {
    baseUrl: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
    timeoutMs: Number(process.env.API_TIMEOUT_MS || 8000),
  },
};

module.exports = config;
