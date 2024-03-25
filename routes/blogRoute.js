const express=require('express');
const { getallblogs, addblog, update, getbyid, delete12, getbyuserid } = require('../controllers/blogcontroller');
const blogrouter=express.Router()

blogrouter.get('/',getallblogs)
blogrouter.post('/add',addblog)
blogrouter.put('/update/:id',update)
blogrouter.get('/:id',getbyid)
blogrouter.delete('/:id',delete12)
blogrouter.get('/user/:id',getbyuserid)


module.exports={blogrouter}