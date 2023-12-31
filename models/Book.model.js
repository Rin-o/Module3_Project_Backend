const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type : String, unique: true, require: true },
  image: { type : String },
  authorId: { type: Schema.Types.ObjectId, ref: "Author" },
  publisher: { type: String },
  publishingDate: { type: Date },
  description: { type: String },
  categories: [ {
    type: String,
    enum: [
      "Mystery",
      "Horror",
      "Romance",
      "Fiction",
      "Fantasy",
      "Drama",
      "Self-help",
    ],
  } ],
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;