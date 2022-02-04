const { application } = require('express')
var express=require('express')
const { isRequired } = require('nodemon/lib/utils')
var router = express.Router()
const db = require('../database')


router.get('/home',(req,res)=>{
    res.render('home',{incorrect:""})
    // console.log(req.body);
    // console.log(req.params);
})


module.exports = router