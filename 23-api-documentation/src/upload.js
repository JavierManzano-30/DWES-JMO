const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { app: appConfig } = require('./config');

if (!fs.existsSync(appConfig.filesDir)) {
  fs.mkdirSync(appConfig.filesDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, appConfig.filesDir),
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const baseName = path.basename(file.originalname);
    const safeName = baseName.replace(/[\\s]+/g, '_');
    const unique = `${timestamp}-${safeName}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: appConfig.maxFileSize },
  fileFilter: (_req, file, cb) => {
    if (!file.originalname) {
      return cb(new Error('Nombre de fichero invalido'));
    }
    const base = path.basename(file.originalname);
    if (base.includes('..')) {
      return cb(new Error('Nombre de fichero invalido'));
    }
    return cb(null, true);
  },
});

module.exports = upload;
