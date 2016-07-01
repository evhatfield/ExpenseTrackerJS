var express = require( 'express' );
var router = express.Router();

var mongoose = require( 'mongoose' );
var Expense = mongoose.model( 'Expense' );

var passport = require( 'passport' );
var jwt = require( 'express-jwt' );

var config = require( '../config/config' );

var auth = jwt( { secret : config.secret, userProperty : 'payload' } );

router.get( '/expenses', function ( req, res, next ) {
	Expense.find( function ( err, expenses ) {
		if ( err ) { return next( err ); }

		Expense.populate( expenses, [
			{ path : 'category' },
			{ path : 'trip' },
			{ path : 'vehicle' },
			{ path : 'paymentMethod' },
			{ path : 'currency' } ], 
			function ( err, expenses ) {
				if ( err ) { return next( err ); }

				res.json( expenses );
			}
		);
	} );
} );

router.post( '/expenses', auth, function ( req, res, next ) {
	var expense = new Expense( req.body );

	expense.save( function ( err, expense ) {
		if ( err ) { return next( err ); }

		res.json( expense );
	} );
} );

router.param( 'expense', function ( req, res, next, id ) {
	var query = Expense.findById( id );

	query.exec( function ( err, expense ) {
		if ( err ) { return next( err ); }
		if ( !expense ) { return next( new Error( 'Can\'t find expense' ) ); }

		req.expense = expense;
		return next();
	} );
} );

router.get( '/expenses/:expense', function ( req, res, next ) {
	req.expense.populate( 'trip vehicle paymentMethod currency category', function ( err, expense ) {
		if ( err ) { return next( err ); }

		res.json( expense );
	} );
} );

router.put( '/expenses/:expense/update', auth, function ( req, res, next ) {
	req.expense.update( req.body, function ( err, expense ) {
		if ( err ) { return next( err ); }

		res.json( expense );
	} );
} );

router.delete( '/expenses/:expense/delete', function ( req, res, next ) {
	req.expense.remove( function ( err ) {
		if ( err ) { return next( err ); }

		res.json( '' );
	} );
} );

module.exports = router;
