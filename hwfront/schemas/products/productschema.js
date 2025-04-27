const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  colorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productColor",
  },
  sizeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productSize",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productCategory",
  },
});

module.exports = mongoose.model("products", productSchema);