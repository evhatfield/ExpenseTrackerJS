var express = require( 'express' );
var router = express.Router();

var mongoose = require( 'mongoose' );
var ExpenseCategory = mongoose.model( 'ExpenseCategory' );

var passport = require( 'passport' );
var jwt = require( 'express-jwt' );

var config = require( '../config/config' );
var auth = jwt( { secret : config.secret, userProperty : 'payload' } );

router.get( '/expense-categories', function ( req, res, next ) {
	ExpenseCategory.find( function ( err, expenseCategories ) {
		if ( err ) { return next( err ); }

		res.json( expenseCategories );
	} );
} );

router.post( '/expense-categories', auth, function ( req, res, next ) {
	var expenseCategory = new ExpenseCategory( req.body );

	expenseCategory.save( function ( err, expenseCategory ) {
		if ( err ) { return next( err ); }

		res.json( expenseCategory );
	} );
} );

router.param( 'expcat', function ( req, res, next, id ) {
	var query = ExpenseCategory.findById( id );

	query.exec( function ( err, expenseCategory ) {
		if ( err ) { return next( err ); }
		if ( !expenseCategory ) { return next( new Error( 'Can\t find expense category' ) ); }

		req.expenseCategory = expenseCategory;
		return next();
	} );
} );

router.get( '/expense-categories/:expcat', function( req, res, next ) {
	res.json( req.expenseCategory );
} );

router.put( '/expense-categories/:expcat/update', auth, function( req, res, next ) {
	req.expenseCategory.update( req.body, function ( err, expenseCategory ) {
		if ( err ) { return next( err ); }

		res.json( expenseCategory );
	} );
} );

router.delete( '/expense-categories/:expcat/delete', function ( req, res, next ) {
	req.expenseCategory.remove( function ( err ) {
		if ( err ) { return next( err ); }

		res.json( '' );
	} );
} );

module.exports = router;
