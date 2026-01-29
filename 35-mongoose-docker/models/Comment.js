const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie", // TIENE que coincidir con mongoose.model("Movie", ...)
    },
    name: String,
    email: String,
    text: String,
    date: Date,
  },
  {
    collection: "comments", // OBLIGATORIO: enlaza con la colección real
  }
);

module.exports = mongoose.model("Comment", commentSchema);
