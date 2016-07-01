var mongoose = require( 'mongoose' );

var PaymentMethodSchema = new mongoose.Schema( {
	type : String, // cash, check, credit card, checking, savings, paypal, other
	description : String
} );

PaymentMethodSchema.methods.update = function ( newPayMeth, cb ) {
	this.type = newPayMeth.type;
	this.description = newPayMeth.description;
	this.save( cb );
};

mongoose.model( 'PaymentMethod', PaymentMethodSchema );
