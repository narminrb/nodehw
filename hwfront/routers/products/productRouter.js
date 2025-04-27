// const {
//     getProductController,
//     createProductController,
//   } = require("../../controllers/products/productController");
const router = require("express").Router();

const { getProductController, createProductController } = require("../../controllers/products/productController");

  
  
  router.get("/", getProductController);
  router.post("/create", createProductController
  );
  
  
  module.exports = router;