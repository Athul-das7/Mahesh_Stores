const { application } = require('express')
var express=require('express')
const { isRequired } = require('nodemon/lib/utils')
var router = express.Router()
// const db = require('../database')


router.get('/',async(req,res)=>{
    
    const sql = `select distinct catageory from Devices;`
    const catageories = await db.promise().query(sql)
    // console.log(catageories);
    // console.log(catageories[0])
    res.render("homems",{catageories:catageories[0]})
})


module.exports = router