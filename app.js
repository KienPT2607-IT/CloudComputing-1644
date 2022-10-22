var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// --- Declare routers ---
var indexRouter = require('./routes/index');
var toyRouter = require('./routes/toy')
var themeRouter = require('./routes/theme')
var originRouter = require('./routes/origin')

// --- Use mongoose to connect to database ---
var mongoose = require("mongoose");
// var db = "mongodb://localhost:27017/mykingdom_local"; // Local
var db = "mongodb+srv://kienptgch200815:s2trungkien2s@cluster0.yunqwou.mongodb.net/mykingdom"; // Remote
mongoose.connect(db, { useNewUrlParser: true }, err => {
	if (!err) {
		console.log('DB connect succeed !')
	} else {
		console.error(err)
	}
});

// --- Use dateFormat to format date-time ---
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
// --- Use helper-euqal to compare things ---
hbs.registerHelper("equal", require("handlebars-helper-equal"))



var app = express();

// --- Config body-parser ---
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --- Use router 
app.use('/', indexRouter);
app.use('/toy', toyRouter);
app.use('/theme', themeRouter);
app.use('/origin', originRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// --- Declare and Use port  ---
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Server is running http://localhost:3000");
});

module.exports = app;
