var express = require( 'express' );
var router = express.Router();

var mongoose = require( 'mongoose' );
var Vehicle = mongoose.model( 'Vehicle' );

var passport = require( 'passport' );
var jwt = require( 'express-jwt' );

var config = require( '../config/config' );

var auth = jwt( { secret : config.secret, userProperty : 'payload' } );

router.get( '/vehicles', function ( req, res, next ) {
	Vehicle.find( function ( err, vehicles ) {
		if ( err ) { return next( err ); }

		res.json( vehicles );
	} );
} );

router.post( '/vehicles', auth, function ( req, res, next ) {
	var vehicle = new Vehicle( req.body );

	vehicle.save( function ( err, vehicle ) {
		if ( err ) { return next( err ); }

		res.json( vehicle );
	} );
} );

router.param( 'vehicle', function ( req, res, next, id ) {
	var query = Vehicle.findById( id );

	query.exec( function ( err, vehicle ) {
		if ( err ) { return next( err ); }
		if ( !vehicle ) { return next( new Error( 'Can\'t find vehicle' ) ); }

		req.vehicle = vehicle;
		return next();
	} );
} );

router.get( '/vehicles/:vehicle', function( req, res, next ) {
	res.json( req.vehicle );
} );

router.put( '/vehicles/:vehicle/update', auth, function ( req, res, next ) {
	req.vehicle.update( req.body, function ( err, vehicle ) {
		if ( err ) { return next( err ); }

		res.json( vehicle );
	} );
} );

/*
router.delete( '/vehicles/:vehicle/delete', function ( req, res, next ) {
	req.vehicle.remove( function ( err ) {
		if ( err ) { return next( err ); }

		res.json( '' );
	} );
} );
*/

module.exports = router;