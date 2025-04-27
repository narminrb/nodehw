const productColorSchema = require("../../schemas/products/productColorSchema")



const getColorController = async(req,res) => {
    const colors = await productColorSchema.find();
    if(colors.length > 0){
        res.status(200).json({
            data:colors
        })
    }
    else{
        res.status(200).json({
            data:[],
            message:"Date is not found"
        })
    }
}

const createColorController = async(req,res) => {
    const {name, code} = req.body;
    const createColor = new productColorSchema({
        name:name,
        code:code
    })
    createColor.save();
    if(createColor){
        return res.status(201).json({
            data:createColor
        })
    }
    else{
        return res.status(404).json({
            message:"Something went wrong"
        })
    }
}


const deleteColorController = async (req,res) => {
    const{id} = req.params;
    const deleteColor = await productColorSchema.findByIdAndDelete(id)
    if(deleteColor){
        return res.status(200).json({
            data:deleteColor,
            message:"Color successfully deleted"
        })
    }
}
module.exports = { getColorController, createColorController, deleteColorController }