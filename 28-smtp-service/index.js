const app = require('./src/app');
const config = require('./src/config');

const { port } = config.app;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
