var express = require( 'express' );
var router = express.Router();

var mongoose = require( 'mongoose' );
var Trip = mongoose.model( 'Trip' );

var passport = require( 'passport' );
var jwt = require( 'express-jwt' );

var config = require( '../config/config' );

var auth = jwt( { secret : config.secret, userProperty : 'payload' } );

router.get( '/trips', function ( req, res, next ) {
	Trip.find( function ( err, trips ) {
		if ( err ) { return next( err ); }

		Trip.populate( trips, [ { path : 'category' }, { path : 'vehicle' } ], function ( err, trips ) {
			if ( err ) { return next( err ); }

			res.json( trips );
		} );
	} );
} );

router.post( '/trips', auth, function ( req, res, next ) {
	var trip = new Trip( req.body );

	trip.save( function ( err, trip ) {
		if ( err ) { return next( err ); }

		res.json( trip );
	} );
} );

router.param( 'trip', function ( req, res, next, id ) {
	var query = Trip.findById( id );

	query.exec( function ( err, trip ) {
		if ( err ) { return next( err ); }
		if ( !trip ) { return next( new Error( 'Can\'t find trip' ) ); }

		req.trip = trip;
		return next();
	} );
} );

router.get( '/trips/:trip', function( req, res, next ) {
	req.trip.populate( 'category vehicle', function( err, trip ) {
		if ( err ) { return next( err ); }

		res.json( trip );
	} );
} );

router.put( '/trips/:trip/update', auth, function ( req, res, next ) {
	req.trip.update( req.body, function ( err, trip ) {
		if ( err ) { return next( err ); }

		res.json( trip );
	} );
} );

router.delete( '/trips/:trip/delete', function ( req, res, next ) {
	req.trip.remove( function ( err ) {
		if ( err ) { return next( err ); }

		res.json( '' );
	} );
} );

module.exports = router;
