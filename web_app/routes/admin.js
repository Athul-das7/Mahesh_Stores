const { application } = require('express')
var express=require('express')
const { isRequired } = require('nodemon/lib/utils')
var router = express.Router()
const db = require('../database')


// login page
router.get('/login',(req,res)=>{
    res.render('login',{incorrect:""})
})

// login post 
router.post('/login', async (req,res)=>{
    const results = await db.promise().query(`select * from Admin_table where email=? ;`,[req.body.email])
    var user=false;
    console.log('working');
    if( results[0].length >= 1 ){
        if ( results[0][0][2] == req.body.password ) user = true 
    }
    if ( user ) {
        req.session.user = req.body.email
        res.redirect('/admin/ordered')
    }
    else {
        res.render('login',{incorrect:"Incorrect username or password"})
    }
})

// order page 
router.get("/ordered",async(req,res)=>{
    if ( req.session.user ){
        const sql = `select  Users.rollNo, Users.studentname, Users.contact, Cart.devList
        from Transactions
        inner join Users on Transactions.roll_No = Users.rollNo
        inner join Cart on Cart.cartId = Transactions.cart_Id
        where compList is NULL;`
        const orders = await db.promise().query(sql)
        res.render("ordered",{user:req.session.user, orders:orders[0]})
    }
    else {
        res.render('login',{incorrect:"Unauthorized User"})
    }
})

// returned page 
router.get("/returned",async(req,res)=>{
    if ( req.session.user ){
        const sql = `select  Users.rollNo, Users.studentname, Users.contact, compList, transId
        from Transactions
        inner join Users on Transactions.roll_No = Users.rollNo
        inner join Cart on Cart.cartId = Transactions.cart_Id
        where compList is not NULL;`
        const returned= await db.promise().query(sql)
        // console.log(orders);
        res.render("returned",{user:req.session.user, returned:returned[0]})
    }
    else {
        res.render('login',{incorrect:"Unauthorized User"})
    }
})

// logout route 
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if (err){
            console.log(err)
            res.send(err)
        }
        else {
            res.render('login',{incorrect:"Logged out"})
        }
    })
})

router.post('/ordered/:rollno',async(req,res)=>{
    console.log(req.params);
    if ( req.session.user ){
        // console.log(req.body.compList)
        let sql =`Select cart_Id from Transactions where roll_no=? and compList is null`
        const cartId = await db.promise().query(sql,[req.params.rollno])

        sql =`update Transactions 
        Set compList=?
        where roll_no=? and compList is null`
        const updateuser = await db.promise().query(sql,[req.body.compList.toString(),req.params.rollno])
        // res.send(req.body)

        // console.log(cartId[0][0][0]);
        sql =`update Cart 
        Set given=true
        where cartId=?`
        const transId = await db.promise().query(sql,[cartId[0][0][0]])

        sql = `select  Users.rollNo, Users.studentname, Users.contact, Cart.devList
        from Transactions
        inner join Users on Transactions.roll_No = Users.rollNo
        inner join Cart on Cart.cartId = Transactions.cart_Id
        where compList is NULL;`
        const orders = await db.promise().query(sql)
        res.render("ordered",{user:req.session.user, orders:orders[0]})
        // console.log(userUpdate)
    }
    else {
        res.render('login',{incorrect:"Unauthorized User"})
    }
})

router.get("/currentDistribution",async(req,res)=>{
    if ( req.session.user ){
        const sql = `select  Users.rollNo, Users.studentname, Users.contact,startDate, endDate, compList, TransComp, transId
        from Transactions
        inner join Users on Transactions.roll_No = Users.rollNo
        inner join Cart on Cart.cartId = Transactions.cart_Id;`
        const currentD = await db.promise().query(sql)
        console.log(currentD);
        // console.log(currentD[0])
        res.render("currentDistribution",{user:req.session.user, currentD:currentD[0]})
    }
    else {
        res.render('login',{incorrect:"Unauthorized User"})
    }
})



module.exports = router

