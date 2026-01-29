const mongoose = require("mongoose");
require("./models/Movie");          // REGISTRA el modelo Movie
const Comment = require("./models/Comment");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/sample_mflix");

  // 🔴 ID de comentario que SÍ tiene película válida
  const id = new mongoose.Types.ObjectId("5a9427648b0beebeb69579e7");

  const comment = await Comment.findById(id)
    .populate({
      path: "movie_id",
      select: "title genres year rated type -_id",
    })
    .select("name email text movie_id")
    .lean();

  console.log(comment);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
