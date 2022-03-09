const { application } = require('express')
var express=require('express')
const { isRequired } = require('nodemon/lib/utils')
var router = express.Router()
const db = require('../firebase')// require('../database')
const { check, validationResult } = require('express-validator')

var moment = require('moment');

// login page
router.get('/login', async (req,res)=>{
    res.render('login',{incorrect:""})
})

// login post 
router.post('/login',[
    check('password','this field must atleast be 4 characters')
    .exists().isLength({min:4})
], async (req,res)=>{
    const errors = validationResult(req)
    console.log(errors);
    if (!errors.isEmpty()){
        res.render('login',{incorrect:"Minimum 4 characters"})
    }
    // .where('test','==','null')
    // db.collection('transactions')
    // .document('FvdNvgkc1gQKLyvDuxOV') 
    // .update({
    //     'test':'working'
    // })
    db.collection("transactions")
  .document("FvdNvgkc1gQKLyvDuxOV")
  .update({
    "test": "hello"
  });
    // const results = await db.promise().query(`select * from Admin_table where email=? ;`,[req.body.email])
    var user=false;
    const results = await db.collection('admins')
    .where('password','==',req.body.password)
    .where('email','==',req.body.email).get()
    results.forEach(doc=>{
        const fields = doc.data();
        console.log(doc.id,'=>',doc.data());
        if ( fields.password == req.body.password ) user=true;
    })
    console.log(user)

    // console.log(results.id);
    console.log('working');
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
            res.redirect('/')
        }
    })
})

// middleware to check user authentication
router.use((req,res,next)=>{
    if( !req.session.user ){
        res.render('login',{incorrect:"Unauthorized user"})
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
    // const orders = db.collection(transactions)
    // .where(components,'==','undefined')

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
    let sql =`Select cart_Id from Transactions where transId = ?`
    const cartId = await db.promise().query(sql,[req.body.transId])

    sql =`update Transactions 
    Set returnDate=?
    where transId=?`
    const updateuser = await db.promise().query(sql,[moment().format('DD/MM/YYYY'),req.body.transId])

    sql =`update Cart 
    Set returned=true
    where cartId=?`
    const transId = await db.promise().query(sql,[cartId[0][0][0]])

    res.redirect('/admin/returned')
})

router.post('/ordered/', async(req,res)=>{

    arr=req.body.compList
    let reload=false
    for (let i = 0; i < arr.length; i++) {
        if ( arr[i].length == 0 )  reload = true;
    }
    if ( reload ) res.redirect('/admin/ordered')
    else {
        let sql =`Select cart_Id from Transactions where transId = ?`
        const cartId = await db.promise().query(sql,[req.body.transId])

        sql =`update Transactions 
        Set compList=?
        where transId=?`

        const updateuser = await db.promise().query(sql,[req.body.compList.toString(),req.body.transId])

        sql =`update Cart 
        Set given=true
        where cartId=?`
        const transId = await db.promise().query(sql,[cartId[0][0][0]])

        res.redirect('/admin/ordered')
    }
})

router.get("/history",async(req,res)=>{
    const sql = `select  Users.rollNo, Users.studentname, Users.contact,startDate, endDate, compList, returnDate, transId
    from Transactions
    inner join Users on Transactions.roll_No = Users.rollNo
    inner join Cart on Cart.cartId = Transactions.cart_Id
    where compList is not null;`
    const currentD = await db.promise().query(sql)
    console.log(currentD);
    // console.log(currentD[0])
    res.render("history",{user:req.session.user, currentD:currentD[0]})
})



module.exports = router

