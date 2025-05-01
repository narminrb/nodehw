const monngose = require("mongoose");

const productSchema = new monngose.Schema({
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
    type: monngose.Schema.Types.ObjectId,
    ref: "productColor",
  },
  sizeId: {
    type: monngose.Schema.Types.ObjectId,
    ref: "productSize",
  },
  categoryId: {
    type: monngose.Schema.Types.ObjectId,
    ref: "productCategory",
  },
});

module.exports = monngose.model("products", productSchema);