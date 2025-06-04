var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var app = express();
const session = require('express-session');
const cors = require('cors');

//Me permite usar cookies
app.use(cors({
  origin: 'http://localhost:3000', // cambia al puerto de tu frontend
  credentials: true               // permite enviar cookies
}));


app.use(session({
  secret: 'm2rstvbo', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

//Configuración
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup---> EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//Rutas
var indexRouter = require('./routes/index');
var juegosRouter = require('./routes/getGames');
var obtenerUsuarios = require('./routes/users');
var mostrarDashboard=require('./routes/dashboard');
var showGame=require('./routes/gameShow');
var library=require('./routes/myLibrary');

//Middleware que me permitirá usar user en cualquier ejs.
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

//Middlewares
app.use('/', indexRouter);
app.use('/getGames', juegosRouter);
app.use('/users', obtenerUsuarios);
app.use('/dashboard', mostrarDashboard);
app.use('/showGame',showGame);
app.use('/',library);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
