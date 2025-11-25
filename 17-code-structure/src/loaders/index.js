const expressLoader = require('./express');

function init(app) {
  expressLoader(app);
}

module.exports = {
  init,
};
