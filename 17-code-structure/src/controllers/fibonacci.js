const { fibonacci } = require('../services/fibonacci');

function getFibonacci(req, res) {
  const { n } = req.query;

  const number = parseInt(n, 10);

  if (Number.isNaN(number)) {
    return res.status(400).send({ error: 'El parámetro n debe ser un número' });
  }

  if (number < 0) {
    return res.status(400).send({ error: 'n debe ser mayor o igual que 0' });
  }

  const result = fibonacci(number);

  return res.status(200).send({ n: number, result });
}

module.exports = { getFibonacci };
