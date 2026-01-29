const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/sample_mflix");

  // ID de una película existente
  const movieId = new mongoose.Types.ObjectId("573a1390f29313caabcd4323");

  const result = await mongoose.connection.db
    .collection("comments")
    .aggregate([
      { $match: { movie_id: movieId } },
      {
        $lookup: {
          from: "movies",
          localField: "movie_id",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" },
      {
        $project: {
          _id: 0,
          name: 1,
          email: 1,
          text: 1,
          "movie.title": 1,
          "movie.genres": 1,
          "movie.year": 1,
          "movie.rated": 1,
          "movie.type": 1,
        },
      },
    ])
    .toArray();

  console.log(result);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
