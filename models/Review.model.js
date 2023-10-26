const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    image: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true},
    reviewDate: { type: Date, default: Date.now },
    comment: { type: String, required: true },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;