var mongoose = require( 'mongoose' );

var TripCategorySchema = new mongoose.Schema( {
	description : String
} );

TripCategorySchema.methods.update = function ( newTripCat, cb ) {
	this.description = newTripCat.description;
	this.save( cb );
};

mongoose.model( 'TripCategory', TripCategorySchema );
