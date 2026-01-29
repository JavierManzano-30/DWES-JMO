const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// Schema flexible
const weatherSchema = new mongoose.Schema({}, { strict: false });
weatherSchema.plugin(mongoosePaginate);

// Importante: 3er parámetro = nombre REAL de la colección
const Weather = mongoose.model("Weather", weatherSchema, "data");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/sample_weatherdata");

  const options = {
    page: 1,
    limit: 10,
    // opcional:
    // sort: { ts: -1 },
    // select: "st ts airTemperature pressure"
  };

  const result = await Weather.paginate({}, options);

  console.log("Total documentos:", result.totalDocs);
  console.log("Página:", result.page, "/", result.totalPages);
  console.log("Documentos devueltos:", result.docs.length);
  console.log(result.docs);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
