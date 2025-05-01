const monngose = require("mongoose");

const productColorSchema = new monngose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  product: {
    type: monngose.Schema.Types.ObjectId,
    ref: "product",
  },
});

module.exports = monngose.model("productColor", productColorSchema);