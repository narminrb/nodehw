const monngose = require("mongoose");

const productSizeSchema = new monngose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  product: {
    type: monngose.Schema.Types.ObjectId,
    ref: "product",
  },
});

module.exports = monngose.model("productSize", productSizeSchema);