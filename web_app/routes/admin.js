var express=require('express')
const { isRequired } = require('nodemon/lib/utils')
var router = express.Router()
const db = require('../database')

router.get('/login',(req,res)=>{
    res.render('login')
})

router.post('/login', async (req,res)=>{
    const results = await db.promise().query(`select * from Admin_table where email='${req.body.email}' ;`)
    // console.log(req.body)
    // console.log('athul',results[0].length,'das');
    var user=false;
    if( results[0].length >= 1 ){
        if ( results[0][0][2] == req.body.password ) user = true 
    }
    if ( user ) {
        req.session.user = req.body.email
        res.redirect('/admin/ordered')
    }
    else {
        res.render('login',{incorrect:true})
    }
})

router.get("/ordered",(req,res)=>{
    if ( req.session.user ){
        res.render("ordered",{user:req.session.user})
    }
    else {
        res.send('Unauthorized user')
    }
})

router.get("/returned",(req,res)=>{
    if ( req.session.user ){
        res.render("returned",{user:req.session.user})
    }
    else {
        res.send('Unauthorized user')
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if (err){
            console.log(err)
            res.send(err)
        }
        else {
            res.render('login')
        }
    })
})

module.exports = router

