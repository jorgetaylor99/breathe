require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
var path = require('path');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var addRouter = require('./routes/add');
var resourcesRouter = require('./routes/resources');
var signoutRouter = require('./routes/signout');

// Create application object
var app = express();

// Set up the static file middleware for the public folder
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// global middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', homeRouter);
app.use('/', addRouter);
app.use('/', resourcesRouter);
app.use('/', signoutRouter);

module.exports = app;
