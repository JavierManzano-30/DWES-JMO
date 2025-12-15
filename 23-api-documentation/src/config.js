const path = require('path');

const app = {
  port: process.env.PORT || 3000,
  filesDir: process.env.FILES_DIR || path.join(__dirname, '..', 'files'),
  maxFileSize: Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024,
};

module.exports = { app };
