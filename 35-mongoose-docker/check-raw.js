const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/sample_mflix");

  const id = new mongoose.Types.ObjectId("5a9427648b0beebeb69579cc");

  const raw = await mongoose.connection.db
    .collection("comments")
    .findOne({ _id: id }, { projection: { name: 1, movie_id: 1 } });

  console.log(raw);

  await mongoose.disconnect();
}

main().catch(console.error);
