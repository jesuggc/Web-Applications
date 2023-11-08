var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var createError = require('http-errors');
// var path = require('path');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(3001, (error) => { 
    if(error) console.log("Error occurred, server can't start ", error);   
    else console.log("Server is Successfully Running, and App is listening on port "+ 3000)
}); 

module.exports = app;
