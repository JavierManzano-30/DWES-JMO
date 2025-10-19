function conversorTiempo(valor, unidad) {
  const unidadesEnSegundos = {
    segundos: 1,
    minutos: 60,
    horas: 3600,
    dias: 86400,
  };

  let totalSegundos = valor * (unidadesEnSegundos[unidad] || 1);

  const dias = Math.floor(totalSegundos / 86400);
  totalSegundos %= 86400;

  const horas = Math.floor(totalSegundos / 3600);
  totalSegundos %= 3600;

  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;

  return { dias, horas, minutos, segundos };
}

console.log(conversorTiempo(10000, "segundos"));
