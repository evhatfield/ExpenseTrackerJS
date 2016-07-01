var express = require( 'express' );
var router = express.Router();

var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );

var passport = require( 'passport' );
var jwt = require( 'express-jwt' );

var config = require( '../config/config' );

var auth = jwt( { secret : config.secret, userProperty : 'payload' } );

router.param( 'name', function ( req, res, next, data ) {
console.log( data );
	req.name = data;
	return next();
} );

router.get( '/templates/:name', function( req, res, next ) {
console.log( req.name );
	res.render( 'templates/' + req.name );
} );


router.post( '/register', function ( req, res, next ) {
	if ( !req.body.username || !req.body.password ) {
		return res.status( 400 ).json( { message : 'Please fill out all fields' } );
	}
	
	var user = new User();

	user.username = req.body.username;
	user.setPassword( req.body.password )

	user.save( function ( err ) {
		if ( err ) { return next( err ); }
	
		return res.json( { token : user.generateJWT() } );
	} );
} );


router.post( '/login', function ( req, res, next ) {
	if ( !req.body.username || !req.body.password ) {
		return res.status( 400 ).json( { message : 'Please fill out all fields' } );
	}

	passport.authenticate( 'local', function( err, user, info ) {
		if ( err ) { return next( err ); }

		if ( user ) {
			return res.json( { token : user.generateJWT() } );
		} else {
			return res.status( 401 ).json( info );
		}
	} ) ( req, res, next );
} );

/* GET home page. */
router.get( '/', function ( req, res, next ) {
	res.render( 'index', { title : 'Express' } );
} );

module.exports = router;
