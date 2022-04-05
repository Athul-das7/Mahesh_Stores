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
    console.log(req.body)
    const errors = validationResult(req)
    // console.log(errors);
    if (!errors.isEmpty()){
        res.json(false)
    }
    var user=false;
    const results = await db.collection('admins')
    .where('password','==',req.body.password)
    .where('email','==',req.body.email).get()
    results.forEach(doc=>{
        const fields = doc.data();
        if ( fields.password == req.body.password ) user=true;
    })

    req.session.user = req.body.email
    res.json(user);
})

// logout route 
// router.get('/logout',(req,res)=>{
//     req.session.destroy(function(err){
//         if (err){
//             console.log(err)
//             res.send(err)
//         }
//         else {
//             res.redirect('/')
//         }
//     })
// })

// middleware to check user authentication
// router.use((req,res,next)=>{
//     if( !req.session.user ){
//         res.render('login',{incorrect:"Unauthorized user"})
//     }
//     else next()
// })

// order page 
router.get("/ordered",async(req,res)=>{
    const ordered = await db.collection('transactions')
        .where('status','==',0)
        .get();
    var arr= new Array();
    ordered.forEach(doc=>{
        const obj = {
            id : doc.id,
            ...doc.data()
        }
        arr.push(obj);
    })
    res.json(arr)
})

// returned page 
router.get("/returned",async(req,res)=>{
    var returned = await db.collection('transactions')
                        .where('status','==',1)
                        .get();
    var arr = new Array();
    console.log(returned)
    returned.forEach(doc=>{
        const obj = {
            id : doc.id,
            ...doc.data()
        }
        arr.push(obj);
    })
    console.log( moment().format('DD/MM/YYYY'));
    res.json(arr);
})

router.post('/returned', async(req,res)=>{
    console.log(req.body.id)
    db.doc(`transactions/${req.body.id}`).update({
        returnDate: new Date(),
        status: 2,
        // learnt: 3, 
    })

    // res.json(true )
    res.redirect('/admin/returned')
})

router.post('/ordered/', async(req,res)=>{
    db.doc(`transactions/${req.body.id}`).update({
        components: req.components,
        status: 1
    })

    res.redirect('/admin/ordered')
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