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
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    image: { type: String, default: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"},
    favoriteBooks: [String],
    favoriteAuthors: [String]
  },
);

const User = model("User", userSchema);

module.exports = User;
