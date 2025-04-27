const productSizeSchema = require("../../schemas/products/productSizeSchema")

const getProductSizeController = async (req,res) => {
    const productSizes = await productSizeSchema.find();
    if (productSizes.length > 0){
        res.status(200).json({
            data:productSizes,
            message:"Data fetching successfully"
        })
    }
    else{
        res.status(200).json({
            data:[],
            message:"Data fetching not successfully"
        })
    }
}

const createProductSizeController = async(req,res) => {
    const {name} = req.body;
    
    const newSize = new productSizeSchema({
        name:name
    })
    if (newSize){
        newSize.save()
        res.status(200).json({
            data:newSize,
            success:true
        })
    }
    else{
        res.status(400).json({
            message:"something went wrong"
        })
    }
}



module.exports = {getProductSizeController,createProductSizeController}