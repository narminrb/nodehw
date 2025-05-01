const {
    basketById,
    getAllBasketItems,
    addBasketItem,
    deleteBasketItem,
  } = require("../controllers/BasketController");
  
  const router = require("express").Router();
  
  router.get("/", getAllBasketItems);
  // router.get("/:id", basketById);
  router.post("/add", addBasketItem);
  router.delete("/:basketId", deleteBasketItem);
  
  module.exports = router;