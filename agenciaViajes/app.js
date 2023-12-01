var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var createError = require('http-errors');
// var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const session = require("express-session")
const sessionSQL = require("express-mysql-session")
const mysqlStore = sessionSQL(session)
const sessionStore = new mysqlStore({
  host: "localhost",
  user: "admin_aw",
  password: "",
  database: "viajes"
})
const middlewareSession = session({
    saveUninitialized: false,
    secret: "1234", 
    resave: false,  
    store: sessionStore
  })
app.use(middlewareSession)


// view engine setup
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'))

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
