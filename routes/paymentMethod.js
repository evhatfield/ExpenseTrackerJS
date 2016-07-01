var express = require( 'express' );
var router = express.Router();

var mongoose = require( 'mongoose' );
var PaymentMethod = mongoose.model( 'PaymentMethod' );

var passport = require( 'passport' );
var jwt = require( 'express-jwt' );

var config = require( '../config/config' );

var auth = jwt( { secret : config.secret, userProperty : 'payload' } );

router.get( '/payment-methods', function ( req, res, next ) {
	PaymentMethod.find( function ( err, paymentMethods ) {
		if ( err ) { return next( err ); }

		res.json( paymentMethods );
	} );
} );

router.post( '/payment-methods', auth, function ( req, res, next ) {
	var paymentMethod = new PaymentMethod( req.body );

	paymentMethod.save( function ( err, paymentMethod ) {
		if ( err ) { return next( err ); }

		res.json( paymentMethod );
	} );
} );

router.param( 'paymeth', function ( req, res, next, id ) {
	var query = PaymentMethod.findById( id );

	query.exec( function ( err, paymentMethod ) {
		if ( err ) { return next( err ); }
		if ( !paymentMethod ) { return next( new Error( 'Can\t find payment method' ) ); }

		req.paymentMethod = paymentMethod;
		return next();
	} );
} );

router.get( '/payment-methods/:paymeth', function ( req, res, next ) {
	res.json( req.paymentMethod );
} );

router.put( '/payment-methods/:paymeth/update', auth, function( req, res, next ) {
	req.paymentMethod.update( req.body, function ( err, paymentMethod ) {
		if ( err ) { return next( err ); }

		res.json( paymentMethod );
	} );
} );

router.delete( '/payment-methods/:paymeth/delete', function ( req, res, next ) {
	req.paymentMethod.remove( function ( err ) {
		if ( err ) { return next( err ); }

		res.json( '' );
	} );
} );

module.exports = router;
