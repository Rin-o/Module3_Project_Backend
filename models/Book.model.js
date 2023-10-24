const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type : String, unique: true, require: true },
  image: { type : String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  publisher: { type: String },
  publishingDate: { type: Date },
  description: { type: String },
  categories: {
    type: String,
    enum: [
      "Mystery",
      "Horror",
      "Romance",
      "Science Fiction",
      "Fantasy",
      "Drama",
      "Self-help",
    ],
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;