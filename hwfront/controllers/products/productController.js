const productSizeSchema = require("../../schemas/products/productSizeSchema");
const productCategorySchema = require("../../schemas/products/productCategorySchema");
const colorSchema = require("../../schemas/products/productColorSchema");
const productSchema = require("../../schemas/products/productschema")


const getProductController = async (req, res) => {
  const q = req.query.q || "";
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit || 0;
  const CategoryId = req.query.categoryId || "";
  const SizeId = req.query.sizeId || "";
  const ColorId = req.query.colorId || "";

  const query = { $or: [{ name: { $regex: q, $options: "i" } }] };
  try {
    const products = await productSchema
      .find(query)
      .populate("categoryId")
      .populate("sizeId")
      .populate("colorId");

    res.status(200).json({
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// const createProductController = async (req, res) => {
//   const {
//     name,
//     code,
//     count,
//     description,
//     imageUrl,
//     price,
//     sizeId,
//     categoryId,
//     colorId,
//   } = req.body;

//   const productSize = await productSizeSchema.findOne({
//     _id: sizeId,
//   });
//   const productColor = await colorSchema.findOne({
//     _id: colorId,
//   });
//   const productCategory = await productCategorySchema.findOne({
//     _id: categoryId,
//   });

//   const newProduct = new productSchema({
//     name: name,
//     code: code,
//     count: count,
//     description: description,
//     imageUrl: imageUrl,
//     price: price,
//     categoryId: productCategory,
//     colorId: productColor,
//     sizeId: productSize,
//   });
//   if (newProduct) {
//     res.status(201).json({
//       data: newProduct,
//       message: "product created successfully",
//     });
//     newProduct.save();
//   } else {
//     res.status(400).json({
//       message: "product not created",
//     });
//   }
// };
const createProductController = async (req, res) => {
    const {
      name,
      code,
      count,
      description,
      imageUrl,
      price,
      sizeId,
      categoryId,
      colorId,
    } = req.body;
  
    try {
      // Find the referenced documents
      const productSize = await productSizeSchema.findOne({ _id: sizeId });
      const productColor = await colorSchema.findOne({ _id: colorId });
      const productCategory = await productCategorySchema.findOne({ _id: categoryId });
  
      // Check if any of the references are missing
      if (!productSize) {
        return res.status(400).json({ message: "Invalid size ID" });
      }
      if (!productColor) {
        return res.status(400).json({ message: "Invalid color ID" });
      }
      if (!productCategory) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
  
      // Create the new product instance
      const newProduct = new productSchema({
        name,
        code,
        count,
        description,
        imageUrl,
        price,
        categoryId: productCategory,
        colorId: productColor,
        sizeId: productSize,
      });
  
      // Save the product to the database
      await newProduct.save();
  
      // Send success response after saving
      res.status(201).json({
        data: newProduct,
        message: "Product created successfully",
      });
    } catch (error) {
      // Handle unexpected errors
      res.status(500).json({
        message: "Error creating product",
        error: error.message,
      });
    }
  };
  

module.exports = { getProductController, createProductController };