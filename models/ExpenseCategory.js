var mongoose = require( 'mongoose' );

var ExpenseCategorySchema = new mongoose.Schema( {
	description : String
} );

ExpenseCategorySchema.methods.update = function ( newExpCat, cb ) {
	this.description = newExpCat.description;
	this.save( cb );
};

mongoose.model( 'ExpenseCategory', ExpenseCategorySchema );
