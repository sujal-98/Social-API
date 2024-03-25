const mongoose=require('mongoose')
const Schema=mongoose.Schema
const blogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    }
}) 
module.exports = mongoose.model('blog', blogSchema);