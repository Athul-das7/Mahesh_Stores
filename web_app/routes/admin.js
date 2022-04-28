const { application } = require('express')
var express=require('express')
const { isRequired } = require('nodemon/lib/utils')
var router = express.Router()
const db = require('../firebase')// require('../database')
const { check, validationResult } = require('express-validator')
const shell = require('shelljs')


var moment = require('moment');

// login page
router.get('/login', async (req,res)=>{
    res.render('login',{incorrect:""})
})

// login post 
router.post('/login', async (req,res)=>{
    console.log('changed', req.body)

// [ //validator for express 
//     check('password','this field must atleast be 4 characters')
//     .exists().isLength({min:4})
// ],
    // const errors = validationResult(req)
    // // console.log(errors);
    // if (!errors.isEmpty()){
    //     res.json(false)
    // }
    var users={'YchIH9j4mGXqO0SAJGcI4LWF9To1':true,'7yzuiNcOd7Upi0ae6aQ1558qOfi2':true};
    var result = false;
    if ( req.body.uid in users ) {
        result = true;
    }
    // const results = await db.collection('admins')
    // .where('password','==',req.body.password)
    // .where('email','==',req.body.email).get()
    // results.forEach(doc=>{
        // const fields = doc.data();
        // if ( fields.password == req.body.password ) user=true;
    // })

    // req.session.user = req.body.email
    res.json(result);
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
        const data = doc.data()
        console.log(data.user)
        const obj = {
            id : doc.id,
            cartComponents: data.cartComponents,
            components: data.components,
            returnDate: data.returnDate,
            startDate: data.startDate,
            status: data.status,
            endDate: data.endDate,
            user: { 
                email: data.user.email,
                name: data.user.name,
                phone: data.user.phone,
                rollNo: data.user.rollNo
            }
        }
        arr.push(obj);
    })
    res.json(arr)
    // res.send('hello')
})

// returned page 
router.get("/returned",async(req,res)=>{
    var returned = await db.collection('transactions')
                        .where('status','==',1)
                        .get();
    var arr = new Array();
    console.log(returned)
    returned.forEach(doc=>{
        const data = doc.data()
        console.log(data.user)
        const obj = {
            id : doc.id,
            cartComponents: data.cartComponents,
            components: data.components,
            returnDate: data.returnDate,
            startDate: data.startDate,
            status: data.status,
            user: data.user, 
            endDate: data.endDate
        }
        arr.push(obj);
    })
    console.log( moment().format('DD/MM/YYYY'));
    res.json(arr);
})

router.post('/returned', async(req,res)=>{
    console.log(req.body.id)
    try{
        await db.doc(`transactions/${req.body.id}`).update({
            returnDate: new Date(),
            status: 2,
            // learnt: 3, 
        })
        
        const cartComp = await db.collection('transactions').doc(req.body.id).get()
        const cart = cartComp.data().cartComponents
        cart.forEach(async(item)=>{
            db.collection('products')
                .where('name','==',item)
                .get()
                .then(pro=>{
            pro.forEach(i=>{
                db.doc(`products/${i.id}`).update({
                    count:i.data().count+1
                })
            })
        })
        })

        res.redirect('/admin/returned')
    }
    catch(e){
        console.log('got error')
        res.json(false);

    }
    // res.redirect('/admin/returned')
})

router.post('/ordered', async(req,res)=>{
    console.log(req.body)
    console.log(req.body.id)
    try{
        console.log('enetered')
        await db.doc(`transactions/${req.body.id}`).update({
            components: req.body.components,
            status: 1
        })
        console.log('yes true')
        res.redirect('/admin/ordered')
    }
    catch(e){
        console.error(e)
        console.log('got error')
        res.json(false)
    }

    // res.redirect('/admin/ordered')
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

router.post('/email',(req,res)=>{
    shell.exec('python mail1.py');
    console.log('hello',req.body)
    res.json(true)
})

module.exports = router