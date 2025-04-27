const mongoose = require("mongoose")

const productSizeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
     product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
})

// export const productSizeModel = mongoose.model("productSize", productSizeSchema)

module.exports = mongoose.model("productSize",productSizeSchema)