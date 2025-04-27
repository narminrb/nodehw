const router = require("express").Router()
const { getCategoryController, createCategory } = require("../../controllers/products/productCategoryController")



router.get("/category", getCategoryController)
router.post("/category/create", createCategory)



module.exports = router