import app from './app.js';
import config from './config.js';

app.listen(config.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${config.app.port}`);
});
