var express = require( 'express' );
var router = express.Router();

var mongoose = require( 'mongoose' );
var TripCategory = mongoose.model( 'TripCategory' );

var passport = require( 'passport' );
var jwt = require( 'express-jwt' );

var config = require( '../config/config' );
var auth = jwt( { secret : config.secret, userProperty : 'payload' } );

router.get( '/trip-categories', function ( req, res, next ) {
	TripCategory.find( function ( err, tripCategories ) {
		if ( err ) { return next( err ); }

		res.json( tripCategories );
	} );
} );

router.post( '/trip-categories', auth, function ( req, res, next ) {
	var tripCategory = new TripCategory( req.body );

	tripCategory.save( function ( err, tripCategory ) {
		if ( err ) { return next( err ); }

		res.json( tripCategory );
	} );
} );

router.param( 'tripcat', function ( req, res, next, id ) {
	var query = TripCategory.findById( id );

	query.exec( function ( err, tripCategory ) {
		if ( err ) { return next( err ); }
		if ( !tripCategory ) { return next( new Error( 'Can\t find trip category' ) ); }

		req.tripCategory = tripCategory;
		return next();
	} );
} );

router.get( '/trip-categories/:tripcat', function( req, res, next ) {
	res.json( req.tripCategory );
} );

router.put( '/trip-categories/:tripcat/update', auth, function( req, res, next ) {
	req.tripCategory.update( req.body, function ( err, tripCategory ) {
		if ( err ) { return next( err ); }

		res.json( tripCategory );
	} );
} );

router.delete( '/trip-categories/:tripcat/delete', function ( req, res, next ) {
	req.tripCategory.remove( function ( err ) {
		if ( err ) { return next( err ); }

		res.json( '' );
	} );
} );

module.exports = router;