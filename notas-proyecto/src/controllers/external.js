const { fetchRandomFact } = require('../services/external');

async function getExternalFact(req, res, next) {
  try {
    const fact = await fetchRandomFact();
    return res.status(200).json({ source: fact.source, fact: fact.text });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getExternalFact };
