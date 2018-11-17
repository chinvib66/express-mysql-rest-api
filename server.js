const express = require('express');
    bodyParser = require('body-parser'),
    //pug = require('pug'),
    cors = require('cors'),
    path = require('path');//,
    //session = require('express-session');
    var passport = require('passport');


const app = express();

// Cors middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Views dir set
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// Router
app.use('/api',require('./routes/router'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));