const FACT_URL = 'https://catfact.ninja/fact';

async function fetchRandomFact() {
  const response = await fetch(FACT_URL);
  if (!response.ok) {
    throw new Error(`External API error: ${response.status}`);
  }
  const data = await response.json();
  return { source: FACT_URL, text: data.fact };
}

module.exports = { fetchRandomFact };
