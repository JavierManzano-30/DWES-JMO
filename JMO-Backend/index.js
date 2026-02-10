// Punto de entrada principal de la aplicacion.
import app from './src/app.js';
import config from './src/config.js';

app.listen(config.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${config.app.port}`);
});
