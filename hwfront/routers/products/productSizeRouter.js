const router = require("express").Router()
const { getProductSizeController, createProductSizeController } = require("../../controllers/products/productSizeController")




router.get("/sizes", getProductSizeController)
router.post("/size/create", createProductSizeController)
module.exports = router