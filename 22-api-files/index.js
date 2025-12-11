const app = require('./src/app');
const config = require('./src/config');

app.listen(config.app.port, () => {
  console.log(`Servidor de ficheros escuchando en el puerto ${config.app.port}`);
});
