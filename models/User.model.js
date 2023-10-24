const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    userName: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    image: { type: string, default: false},
    favoriteBooks: [String],
    favoriteAuthors: [String]
  },
);

const User = model("User", userSchema);

module.exports = User;
