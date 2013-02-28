/**
 * Module dependencies.
 */
var express = require('express')
  , exphbs  = require('express3-handlebars')
  , http    = require('http')
  , path    = require('path')
  , app     = express();

app.configure(function () {
  app.set('port', process.env.PORT || 8123);
  app.set('views', __dirname + '/views');
  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  //app.use(express.csrf());
  app.use(express.static(path.join(__dirname, 'public')));
});


app.configure('development', function () {
  app.use(express.errorHandler());
});

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
