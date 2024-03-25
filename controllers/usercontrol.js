const User = require('../model/user');
const bcrypt=require('bcrypt')


const getusers=async(req,res,next)=>{
    let users;
    try{
        user=await User.find();
    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(404).json("No users found");
    }
    return res.status(200).json(user)
}
const signup=async (req,res,next)=>{
    const {name,email,password}=req.body
    let exists
    const hashed=bcrypt.hashSync(password,10)
    const user=new User({
        name,
        email,
        password:hashed,
        blogs:[]
    })
    try{
        exists=await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(exists){
        return res.status(400).json({message:"user already exists"})
    }
    
    try{
        user.save();
    }catch(err){
        console.log(err);
    }
    return res.status(201).json({user})
}

const login=async (req,res,next)=>{
    const {email,password}=req.body
    try{
        exists=await User.findOne({email});
    }catch(err){
        console.log(err);
    }
    if(!exists){
        return res.status(404).json({message:"user not exists"})
    }
    const passcheck=bcrypt.compareSync(password,exists.password)
    if(!passcheck){
        return  res.status(400).json({message:"Incorrect Password"})
    }
    return res.status(200).json({message:"login successfull"})
}

module.exports={getusers,signup,login}
