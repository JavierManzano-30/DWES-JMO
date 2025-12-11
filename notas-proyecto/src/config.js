const app = {
  port: process.env.PORT || 3000,
  secretMessage: process.env.SECRET_MESSAGE || 'I know your secret.',
  pageSize: Number(process.env.PAGE_SIZE) || 5,
};

const config = {
  app,
};

module.exports = config;
