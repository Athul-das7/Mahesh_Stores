var express=require('express')
const { isRequired } = require('nodemon/lib/utils')
var router = express.Router()
const credentials = {
    email : 'athuldas@gmail.com',
    password : 'athul'
}

router.get('/admin',(req,res)=>{
    res.render('login')
})

router.post('/login',(req,res)=>{
    // res.json(req.body)
    console.log(req.body)
    console.log(req.body.password)
    if( req.body.email == credentials.email && req.body.password == credentials.password ){
        req.session.user = req.body.email
        res.redirect('/route/ordered')
        // res.end('login success')
    }
    else{
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