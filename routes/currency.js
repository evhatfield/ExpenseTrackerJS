var express = require( 'express' );
var router = express.Router();

var mongoose = require( 'mongoose' );
var Currency = mongoose.model( 'Currency' );
var jwt = require( 'express-jwt' );

var config = require( '../config/config' );

var auth = jwt( { secret : config.secret, userProperty : 'payload' } );

router.get( '/currencies', function ( req, res, next ) {
	Currency.find( function ( err, currencies ) {
		if ( err ) { return next( err ); }

		res.json( currencies );
	} );
} );

router.post( '/currencies', auth, function ( req, res, next ) {
	var currency = new Currency( req.body );

	currency.save( function ( err, currency ) {
		if ( err ) { return next( err ); }

		res.json( currency );
	} );
} );

router.param( 'curr', function ( req, res, next, id ) {
	var query = Currency.findById( id );
	query.exec( function ( err, currency ) {
		if ( err ) { return next( err ); }
		if ( !currency ) { return next( new Error( 'Can\'t find currency' ) ); }

		req.currency = currency;
		return next();
	} );
} );

router.get( '/currencies/:curr', function( req, res, next ) {
	res.json( req.currency );
} );

router.put( '/currencies/:curr/update', auth, function ( req, res, next ) {
	req.currency.update( req.body, function ( err, currency ) {
		if ( err ) { return next( err ); }

		res.json( currency );
	} );
} );

router.delete( '/currencies/:curr/delete', function ( req, res, next ) {
	req.currency.remove( function ( err ) {
		if ( err ) { return next( err ); }

		res.json( '' );
	} );
} );

module.exports = router;
