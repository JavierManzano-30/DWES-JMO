const app = {
  port: process.env.PORT || 3000,
  secretMessage: process.env.SECRET_MESSAGE || 'I know your secret.',
};

const config = {
  app,
};

module.exports = config;
