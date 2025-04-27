
const router = require("express").Router()
const { getColorController, createColorController, deleteColorController } = require("../../controllers/products/productColorController")

router.get("/colors", getColorController)
router.post("/color/create", createColorController)
router.delete("/color/:id", deleteColorController)
module.exports = router