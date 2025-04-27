const productCategorySchema= require("../../schemas/products/productCategorySchema")


const getCategoryController = async (req,res) =>{
    const categories = await productCategorySchema.find();
    if(categories.length > 0){
         res.status(200).json({
            data:categories,
            message:"Data fetch is success",
            success:true
        })
    }
    else{
         res.status(200).json({
            data:[],
            message:"Data fetch is not successfull",
            success:false
        })
    }
}

const createCategory = (req,res) => {
    const {name, code} = req.body;
    const newCategory = new productCategorySchema({
        name:name,
        code:code
    })
    if(newCategory){
        newCategory.save()
        return res.status(201).json({
            data:newCategory
        })
    }
}

module.exports = {getCategoryController, createCategory}