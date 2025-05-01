// const {
//     getProductController,
//     createProductController,
//   } = require("../../controllers/products/productController");
const router = require("express").Router();

const { getImageController, createImageController } = require("../../controllers/products/imageController");

  
  
  router.get("/", getImageController);
  router.post("/create", createImageController);
  
  
  module.exports = router;