

const mongoose = require("mongoose")

const productColorSchema = new mongoose.Schema({
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

// export const productColorModel = mongoose.model("productColor", productColorSchema)

module.exports = mongoose.model("productColor", productColorSchema)