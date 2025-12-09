const app = {
  port: process.env.PORT || 3000,
  pageSize: Number(process.env.PAGE_SIZE) || 5,
};

const config = {
  app,
};

module.exports = config;
