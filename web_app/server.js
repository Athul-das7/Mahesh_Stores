const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require('express-validator')
// const helmet = require('helmet')

const admin = require('./routes/admin');

const home = require('./routes/home');

var moment = require('moment');


const app = express();

const port = process.env.PORT || 5000;

app.locals.moment = require('moment');

// view engine
app.set('views','./views') //express.static(path.join(__dirname, 'views')))
app.set('view engine', 'ejs');

// body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(helmet())
// app.use(helmet.contentSecurityPolicy({
// 				 directives: {
// 				   defaultSrc: ["'self'"],
// 				   scriptSrc: ["'self'",'ajax.googleapis.com', 'stackpath.bootstrapcdn.com', 'code.jquery.com','fonts.gstatic.com', 'netdna.bootstrapcdn.com','fonts.googleapis.com','maxcdn.bootstrapcdn.com','cdnjs.cloudflare.com','cdn.jsdelivr.net' ],
// 				   styleSrc: ["'self'",'pro.fontawesome.com','stackpath.bootstrapcdn.com', 'code.jquery.com', 'fonts.gstatic.com','netdna.bootstrapcdn.com','fonts.googleapis.com','maxcdn.bootstrapcdn.com','cdnjs.cloudflare.com','cdn.jsdelivr.net' ],
// 				   fontSrc: ["'self'", 'code.jquery.com','pro.fontawesome.com', 'fonts.gstatic.com','netdna.bootstrapcdn.com','fonts.googleapis.com','maxcdn.bootstrapcdn.com','cdnjs.cloudflare.com','cdn.jsdelivr.net' ]
// 				 }
// 				}));

// load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));

app.use('/admin', admin);

app.use('/', home);

// app.get('/',(req,res)=>{
//     console.log('working')
//     // res.redirect('/admin/login')
//     res.render('home',{incorrect:""})
//     // res.sendFile('F:/Programming/github/Mahesh_Stores/web_app/views/mid_page.html')
// })

app.listen(port,(req,res)=>{
    console.log('listening at http://localhost:3000');
})
 