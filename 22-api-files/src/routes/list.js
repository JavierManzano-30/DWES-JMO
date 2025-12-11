const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const { app: appConfig } = require('../config');

const router = Router();

router.get('/', (req, res, next) => {
  fs.readdir(appConfig.filesDir, { withFileTypes: true }, (err, entries) => {
    if (err) return next(err);
    const files = entries
      .filter((e) => e.isFile())
      .map((e) => {
        const filePath = path.join(appConfig.filesDir, e.name);
        const stats = fs.statSync(filePath);
        return {
          name: e.name,
          size: stats.size,
          modifiedAt: stats.mtime,
          url: `/files/${encodeURIComponent(e.name)}`,
          download: `/download/${encodeURIComponent(e.name)}`,
        };
      });
    return res.json({ total: files.length, files });
  });
});

module.exports = router;
