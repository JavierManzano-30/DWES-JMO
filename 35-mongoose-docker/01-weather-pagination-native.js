const mongoose = require("mongoose");

// Schema flexible (los documentos tienen muchos campos)
const weatherSchema = new mongoose.Schema({}, { strict: false });
const Weather = mongoose.model("Weather", weatherSchema, "data");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/sample_weatherdata");

  const page = 1;   // página
  const limit = 10; // documentos por página
  const skip = (page - 1) * limit;

  const total = await Weather.countDocuments();
  const docs = await Weather.find().skip(skip).limit(limit);

  console.log("Total documentos:", total);
  console.log("Página:", page);
  console.log("Documentos devueltos:", docs.length);
  console.log(docs);

  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
