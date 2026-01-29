const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: String,
    genres: [String],
    year: Number,
    rated: String,
    type: String,
  },
  {
    collection: "movies", // OBLIGATORIO: enlaza con la colección real
  }
);

// El nombre del modelo "Movie" es el que usa el ref en Comment
module.exports = mongoose.model("Movie", movieSchema);
