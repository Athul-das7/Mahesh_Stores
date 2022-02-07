const { application } = require('express')
var express=require('express')
const { isRequired } = require('nodemon/lib/utils')
var router = express.Router()
const db = require('../database')

var moment = require('moment');
// router.locals.moment = require('moment');

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

// logout route 
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if (err){
            console.log(err)
            res.send(err)
        }
        else {
            // res.render('login',{incorrect:"Logged out"})
            res.redirect('/')
        }
    })
})

// middle to check user authentication
router.use((req,res,next)=>{
    if( !req.session.user ){
        res.render('login',{incorrect:"Unauthorized user"})
        // res.redirect('/admin/login')
    }
    else next()
})

// order page 
router.get("/ordered",async(req,res)=>{
    const sql = `select  Users.rollNo, Users.studentname, Users.contact, Cart.devList, transId
    from Transactions
    inner join Users on Transactions.roll_No = Users.rollNo
    inner join Cart on Cart.cartId = Transactions.cart_Id
    where compList is NULL;`
    const orders = await db.promise().query(sql)
    console.log(orders[0]);
    res.render("ordered",{user:req.session.user, orders:orders[0]})
})

// returned page 
router.get("/returned",async(req,res)=>{
    const sql = `select  Users.rollNo, Users.studentname, Users.contact, compList, transId
    from Transactions
    inner join Users on Transactions.roll_No = Users.rollNo
    inner join Cart on Cart.cartId = Transactions.cart_Id
    where returnDate is NULL and compList is not Null;`
    const returned= await db.promise().query(sql)
    console.log(returned[0]);
    console.log( moment().format('DD/MM/YYYY'));
    res.render("returned",{user:req.session.user, returned:returned[0]})
})

router.post('/returned', async(req,res)=>{
    console.log(req.body)
    // res.send(req.body)
    console.log(req.body)
    let sql =`Select cart_Id from Transactions where transId = ?`
    const cartId = await db.promise().query(sql,[req.body.transId])

    sql =`update Transactions 
    Set returnDate=?
    where transId=?`
    const updateuser = await db.promise().query(sql,[moment().format('DD/MM/YYYY'),req.body.transId])
    // res.send(req.body)

    // console.log(cartId[0][0][0]);
    sql =`update Cart 
    Set returned=true
    where cartId=?`
    const transId = await db.promise().query(sql,[cartId[0][0][0]])

    // sql = `select  Users.rollNo, Users.studentname, Users.contact, Cart.devList, transId
    // from Transactions
    // inner join Users on Transactions.roll_No = Users.rollNo
    // inner join Cart on Cart.cartId = Transactions.cart_Id
    // where compList is NULL;`
    // const orders = await db.promise().query(sql)
    // res.render("ordered",{user:req.session.user, orders:orders[0]})
    res.redirect('/admin/returned')
    // // console.log(userUpdate)
})

router.post('/ordered/',async(req,res)=>{
    // console.log(req.params);
    console.log(req.body)
    let sql =`Select cart_Id from Transactions where transId = ?`
    const cartId = await db.promise().query(sql,[req.body.transId])

    sql =`update Transactions 
    Set compList=?
    where transId=?`
    console.log(req.body.compList.length);

    // const updateuser = await db.promise().query(sql,[req.body.compList.toString(),req.body.transId])
    // // res.send(req.body)

    // // console.log(cartId[0][0][0]);
    // sql =`update Cart 
    // Set given=true
    // where cartId=?`
    // const transId = await db.promise().query(sql,[cartId[0][0][0]])

    // sql = `select  Users.rollNo, Users.studentname, Users.contact, Cart.devList, transId
    // from Transactions
    // inner join Users on Transactions.roll_No = Users.rollNo
    // inner join Cart on Cart.cartId = Transactions.cart_Id
    // where compList is NULL;`
    // const orders = await db.promise().query(sql)
    // res.render("ordered",{user:req.session.user, orders:orders[0]})
    res.redirect('/admin/ordered')
    // // console.log(userUpdate)
})

router.get("/currentDistribution",async(req,res)=>{
    const sql = `select  Users.rollNo, Users.studentname, Users.contact,startDate, endDate, compList, returnDate, transId
    from Transactions
    inner join Users on Transactions.roll_No = Users.rollNo
    inner join Cart on Cart.cartId = Transactions.cart_Id
    where compList is not null;`
    const currentD = await db.promise().query(sql)
    console.log(currentD);
    // console.log(currentD[0])
    res.render("currentDistribution",{user:req.session.user, currentD:currentD[0]})
})



module.exports = router

