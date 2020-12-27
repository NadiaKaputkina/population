require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');
const filtersRouter = require('./routes/filters.routes');
const uploadRouter = require('./routes/upload.routes');
const rolesRouter = require('./routes/roles.routes');

const db = require('./models');

var app = express();

const passport = require('passport');
require('./config/passport.config')(passport);
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/', filtersRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/', uploadRouter);
app.use('/roles', rolesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.sequelize.sync();

module.exports = app;
