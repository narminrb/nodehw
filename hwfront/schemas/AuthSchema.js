const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  basket: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Basket",
    },
  ],
});

module.exports = mongoose.model("Auth", authSchema);