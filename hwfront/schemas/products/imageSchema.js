const monngose = require("mongoose");

const imageSchema = new monngose.Schema({
  name: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
  }
  
});

module.exports = monngose.model("image", imageSchema);