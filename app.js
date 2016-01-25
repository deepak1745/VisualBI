// Express modules
var express       = require('express'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    path          = require('path'),
    logger        = require('morgan'),
    favicon       = require('serve-favicon'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser');



// Developer defined modules
var  db                = require('./models/db'),
    execute            = require('./routes/execute_query'),
    discover           = require('./routes/discover'),
    queryController    = require('./routes/queryController'),
    routes             = require('./routes/index'),
    users              = require('./routes/users'),
    login              = require('./routes/login'),
    serverCredentials  = require('./routes/serverCredentials');
    widgetRouter  = require('./routes/widgetRouter');

// initializing express application
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use('/', login);
app.use('/home', routes);
app.use('/users', users);
app.use('/execute', execute);
app.use('/discover', discover);
app.use('/serverCredentials', serverCredentials);
app.use('/query', queryController);
app.use('/widget', widgetRouter);


// passport config
var Account = require('./models/userDetails');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
