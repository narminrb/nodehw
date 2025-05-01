const imageSchema = require("../../schemas/products/imageSchema")


const getImageController = async (req, res) => {
  const q = req.query.q || "";
  let page = req.query.page || 1;
  let limit = req.query.limit || 10;


  const query = { $or: [{ name: { $regex: q, $options: "i" } }] };
  
  let skip = (page - 1) * limit || 0;
  try {
    const images = await imageSchema
      .find(query)
      .limit(limit)
      .skip(skip)

      

    res.status(200).json({
      data: images,
      total: Math.ceil(images.length / limit),
      page:page,
      limit:limit,
      message: "images fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching images",
      error: error.message,
    });
  }
};


const createImageController = async (req, res) => {
    const {
      name,
      imageUrl,
    } = req.body;
  
    try {
  
      const newImage = new imageSchema({
        name,
        imageUrl,
      });
  
      await newImage.save();
  
      // Send success response after saving
      res.status(201).json({
        data: newImage,
        message: "Image created successfully",
      });
    } catch (error) {
      // Handle unexpected errors
      res.status(500).json({
        message: "Error creating image",
        error: error.message,
      });
    }
  };
  

module.exports = { getImageController, createImageController };