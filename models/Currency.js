var mongoose = require( 'mongoose' );

var CurrencySchema = new mongoose.Schema( {
	abbreviation : String,
	symbol : String,
	description : String,
	usdExchangeRate : Number
} );

CurrencySchema.methods.update = function ( newCur, cb ) {
	this.description = newCur.description;
	this.symbol = newCur.symbol;
	this.usdExchangeRate = newCur.usdExchangeRate;
	this.save( cb );
};

CurrencySchema.methods.delete = function ( cb ) {
	this.remove( cb );
};

mongoose.model( 'Currency', CurrencySchema );
