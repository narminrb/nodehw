const mongoose = require("mongoose")

const productCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }
})

// export const productCategoryModel = mongoose.model("productCategory", productCategorySchema)

module.exports = mongoose.model("productCategory", productCategorySchema)