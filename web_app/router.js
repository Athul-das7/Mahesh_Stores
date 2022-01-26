var express=require('express')
const { isRequired } = require('nodemon/lib/utils')
var router = express.Router()
const credentials = {
    email : 'athuldas@gmail.com',
    password : 'athul'
}
const db = require('./database')
// const results = db.query(
//     'select * from Admin_table;',
//     function(err,results,fields){
//         console.log('results : '+results[0][0]);
//         // console.log(fields);
//         console.log(results.email);
//         console.log(JSON.stringify(results))
//         return results
//     }
// )
// // const results = await db.promise().query('select * from Admin_table;')
// console.log('test',results);

const results = await db.promise().query('select * from Admin_table;')
console.log(results);


router.get('/admin',(req,res)=>{
    res.render('login')
})

router.post('/login',async (req,res)=>{
    const results = await db.promise().query('select * from Admin_table;')
    console.log(req.body)
    console.log(results);
    for( const i in results[0] ){
        console.log(i);
        if( req.body.email == i[1] && req.body.password == i[2] ){
            req.session.user = req.body.email
            res.redirect('/route/ordered')
        }
   }
    res.render('login',{incorrect:true})
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