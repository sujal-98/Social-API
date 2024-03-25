const blog=require('../model/blog')
const User = require('../model/user');
const mongoose=require('mongoose')

const getallblogs=async(req,res,next)=>{
    let blogs
    try{
        blogs=await blog.find();
    }catch(err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message:"No Blogs Found"})
    }
    return res.status(200).json(blogs)
}

const addblog=async (req,res,next)=>{
    const {title,description,image,user}=req.body
    
    let existinguser
    try{
        existinguser=await User.findById(user)
    }
    catch(err){
        console.log(err)
    }
    if(!existinguser){
        return res.status(400).json({message:"Unable to find user by this id"})
    }
    
    const blogs=new blog({
        title,
        description,
        image,
        user
    })
    try{
        const session=await mongoose.startSession();
        session.startTransaction();
        await blogs.save()
        existinguser.blogss.push(blogs)
        await existinguser.save({session})
        await session.commitTransaction();
    }catch(err){
         console.log(err);
        return res.status(500).json({message:"unable to add"})
    }
    return res.status(200).json({blogs})
}

const update=async(req,res,next)=>{
    const blogid=req.params.id
    const {title,description,image}=req.body
    let blog1
    try{
         blog1=await blog.findByIdAndUpdate(blogid,{
            title,
            description
        })
    }catch(err){
        return console.log(err)
    }
    if(!blog1){
        res.status(500).json({message:"unable to update the blog"})
    }
    return res.status(200).json({blog})
    
}

const getbyid = async (req, res, next) => {
    const id = req.params.id;
    let foundBlog;

    try {
        foundBlog = await blog.findById(id);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!foundBlog) {
        return res.status(404).json({ message: "No Blog Found" });
    }

    return res.status(200).json({ blog: foundBlog });
};


const delete12 = async (req, res, next) => {
    const id = req.params.id;
    try {
        const blogToDelete = await blog.findByIdAndDelete(id).populate('user');
        
        if (!blogToDelete) {
            return res.status(404).json({ message: "Unable to delete" });
        }
        
        if (blogToDelete.user && Array.isArray(blogToDelete.user.blogss)) {
            const index = blogToDelete.user.blogss.indexOf(id);
            if (index !== -1) {
                blogToDelete.user.blogss.splice(index, 1);
                await blogToDelete.user.save(); 
            } else {
                return res.status(404).json({ message: "Blog not found in user's blogss array" });
            }
        } else {
            return res.status(404).json({ message: "User's blogss array not found or has incorrect structure" });
        }
        
        return res.status(200).json({ message: "Successful Delete" });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getbyuserid=async (req,res,next)=>{
    const id=req.params.id;
    let userblogs
    try{
        userblogs=await User.findById(id).populate("blogss")
    }
    catch(err){
        return console.log(err)
    }
    if(!userblogs){
        return res.status(404).json({message:"no blog found"})
    }
    return res.status(200).json({blogs:userblogs})
}


module.exports={getallblogs,addblog,update,getbyid,delete12,getbyuserid}