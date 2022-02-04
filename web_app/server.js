const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require('express-validator')
const helmet = require('helmet')

const admin = require('./routes/admin');

const home = require('./routes/home');

var moment = require('moment');


const app = express();

const port = process.env.PORT || 3000;

app.locals.moment = require('moment');

// view engine
app.set('view engine', 'ejs');

// body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(helmet())

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

app.get('/',(req,res)=>{
    console.log('working')
    // res.render('login')
})

app.listen(port,(req,res)=>{
    console.log('listening at http://localhost:3000');
})
 