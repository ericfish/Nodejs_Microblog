
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , settings = require('./settings')
  , MongoStore = require('connect-mongo')(express)
  , partials = require('express-partials')
  , flash = require('connect-flash');

var app = express();

// Configuration

app.configure(function(){
  // set environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  //加载子模板文件
  app.use(partials());
  app.use(flash());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  //session related
  app.use(express.cookieParser());
  app.use(express.session({
    secret: settings.cookieSecret,
    store: new MongoStore({
      db: settings.db,
      username: settings.username,
      password: settings.password,
    })
  }));

  app.use(function (req, res, next) {
      res.locals.error = req.flash('error');
      res.locals.success = req.flash('success');
      res.locals.user = req.session.user;
      next();
  });

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

// development only
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

// production only
app.configure('production', function(){
    app.use(express.errorHandler());
});

routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
