var express = require( 'express' );
var router = express.Router();

var mongoose = require( 'mongoose' );
var Mileage = mongoose.model( 'Mileage' );

var passport = require( 'passport' );
var jwt = require( 'express-jwt' );

var config = require( '../config/config' );

var auth = jwt( { secret : config.secret, userProperty : 'payload' } );

router.get( '/mileages', function ( req, res, next ) {
	Mileage.find( function ( err, mileages ) {
		if ( err ) { return next( err ); }

		Mileage.populate( mileages, [ { path : 'trip' } ], function ( err, mileages ) {
			if ( err ) { return next( err ); }

			res.json( mileages );
		} );
	} );
} );

router.post( '/mileages', auth, function ( req, res, next ) {
	var mileage = new Mileage( req.body );

	mileage.save( function ( err, mileage ) {
		if ( err ) { return next( err ); }

		res.json( mileage );
	} );
} );

router.param( 'mileage', function ( req, res, next, id ) {
	var query = Mileage.findById( id );

	query.exec( function ( err, mileage ) {
		if ( err ) { return next( err ); }
		if ( !mileage ) { return next( new Error( 'Can\'t find mileage' ) ); }

		req.mileage = mileage;
		return next();
	} );
} );

router.get( '/mileages/:mileage', function( req, res, next ) {
	req.mileage.populate( 'trip', function( err, mileage ) {
		if ( err ) { return next( err ); }

		res.json( mileage );
	} );
} );

router.put( '/mileages/:mileage/update', auth, function ( req, res, next ) {
	req.mileage.update( req.body, function ( err, mileage ) {
		if ( err ) { return next( err ); }

		res.json( mileage );
	} );
} );

router.delete( '/mileages/:mileage/delete', function ( req, res, next ) {
	req.mileage.remove( function ( err ) {
		if ( err ) { return next( err ); }

		res.json( '' );
	} );
} );

module.exports = router;