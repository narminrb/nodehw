const basketSchema = require("../schemas/BasketSchema");
const authSchema = require("../schemas/AuthSchema");

const getAllBasketItems = async (req, res) => {
  const basketItems = await basketSchema.find();
  if (basketItems.length > 0) {
    res.status(200).json({
      data: basketItems,
      message: "Data fetched successfully",
      success: true,
    });
  } else {
    res.status(200).json({
      data: [],
      message: "No data found",
      success: false,
    });
  }
};

const addBasketItem = async (req, res) => {
  const { productId, userId, quantity } = req.body;

  try {
    const basketItem = new basketSchema({
      productId,
      userId,
      quantity,
    });

    await basketItem.save();

    await authSchema.findByIdAndUpdate(userId, {
      $push: { basket: basketItem._id },
    });

    res.status(201).json({
      data: basketItem,
      message: "Basket item created successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      data: null,
      message: "Basket item not created",
      success: false,
    });
  }
};

const getBasketItemByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const basketItems = await basketSchema
      .find({ userId })
      .populate("productId")
      .populate("userId");

    if (basketItems.length > 0) {
      res.status(200).json({
        data: basketItems,
        message: "Basket items fetched successfully",
        success: true,
      });
    } else {
      res.status(404).json({
        data: [],
        message: "No basket items found for this user",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: null,
      message: "Server error",
      success: false,
    });
  }
};

const deleteBasketItem = async (req, res) => {
  const basketId = req.params?.basketId;
  const newItem = await basketSchema.findByIdAndDelete(basketId);

  if (newItem) {
    res.status(200).json({
      data: newItem,
      message: "Basket item deleted successfully",
      success: true,
    });
  } else {
    res.status(404).json({
      data: null,
      message: "Basket item not found",
      success: false,
    });
  }
};

module.exports = {
  getAllBasketItems,
  addBasketItem,
  getBasketItemByUserId,
  deleteBasketItem,
};