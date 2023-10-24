const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: { type: String, unique: true, require: true },
  image: { type : String },
  birthday: { type: Date },
  country: { type: String },
  books: { type: mongoose.Schema.Types.ObjectId, ref: "Books" },
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;