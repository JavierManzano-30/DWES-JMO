import chalk from 'chalk';

function mostrarFecha() {
  const ahora = new Date();

  const dia = String(ahora.getDate()).padStart(2, '0');
  const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Enero es 0
  const anio = ahora.getFullYear();

  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');

  const fecha = `${dia}-${mes}-${anio}`;
  const tiempo = `${horas}:${minutos}:${segundos}`;

  if (ahora.getSeconds() % 10 === 0) {
    console.log(`${fecha} ${chalk.green.bold(tiempo)}`);
  } else {
    console.log(`${fecha} ${tiempo}`);
  }
}

setInterval(mostrarFecha, 1000);

mostrarFecha();
