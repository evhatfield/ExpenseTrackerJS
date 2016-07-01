var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var helmet = require( 'helmet' );
//var session = require( 'express-session' );

var mongoose = require( 'mongoose' );
var passport = require( 'passport' );
require( './models/Expense' );
require( './models/ExpenseCategory' );
require( './models/Currency' );
require( './models/Vehicle' );
require( './models/Trip' );
require( './models/Mileage' );
require( './models/User' );
require( './models/TripCategory' );
require( './models/PaymentMethod' );
require( './config/passport' );

var config = require( './config/config' );
mongoose.connect( config.db );

// the following line was used to delete a model
//delete mongoose.connection.models[ 'Trip' ];
//console.log( mongoose.connection.models );

var expenseCatRoutes = require( './routes/expenseCategory' );
var tripCatRoutes = require( './routes/tripCategory' );
var payMethRoutes = require( './routes/paymentMethod' );
var currencyRoutes = require( './routes/currency' );
var vehicleRoutes = require( './routes/vehicle' );
var tripRoutes = require( './routes/trip' );
var mileageRoutes = require( './routes/mileage' );
var expenseRoutes = require( './routes/expense' );
var indexRoutes = require( './routes/index' );
var users = require( './routes/users' );

var app = express();

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );

// uncomment after placing your favicon in /public
//app.use( favicon( path.join( __dirname, 'public', 'favicon.ico' ) ) );
app.use( helmet() );
//app.use( session( {
//    secret : 'My Super Session Secret',
//    cookie : { httpOnly : true, secure : true }
//} ) );

app.disable( 'x-powered-by' );

app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended : false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/', expenseCatRoutes );
app.use( '/', tripCatRoutes );
app.use( '/', payMethRoutes );
app.use( '/', currencyRoutes );
app.use( '/', vehicleRoutes );
app.use( '/', tripRoutes );
app.use( '/', mileageRoutes );
app.use( '/', expenseRoutes );
app.use( '/', indexRoutes );
app.use( '/users', users );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
	var err = new Error( 'Not Found' );
	err.status = 404;
	next( err );
} );

// error handlers

// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
	app.use( function ( err, req, res, next ) {
		res.status( err.status || 500 );
		res.render( 'error', {
			message : err.message,
			error : err
		} );
	} );
}

// production error handler
// no stacktraces leaked to user
app.use( function ( err, req, res, next ) {
	res.status( err.status || 500 );
	res.render( 'error', {
		message : err.message,
		error : {}
	} );
} );

module.exports = app;
