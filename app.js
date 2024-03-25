const express=require('express')
const mongoose=require('mongoose')
const app=express();
const router=require('./routes/userrout');
const { blogrouter } = require('./routes/blogRoute');

app.use(express.json())
app.use("/api/user",router)
app.use('/api/blog',blogrouter)

mongoose.connect("mongodb+srv://sujalgupta1412:gFBESVIHeg0jSB54@cluster0.jxjn3lw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(()=>app.listen(5000)).then(()=>{
    console.log("connected to database")}).catch((err)=>console.log(err))


