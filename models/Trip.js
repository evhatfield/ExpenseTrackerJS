var mongoose = require( 'mongoose' );

var TripSchema = new mongoose.Schema( {
	description : String,
	startDate : Date,
	endDate : Date,
	vehicle : { type : mongoose.Schema.Types.ObjectId, ref : 'Vehicle' },
	category : { type : mongoose.Schema.Types.ObjectId, ref : 'TripCategory' },
	notes : String
} );

TripSchema.methods.update = function ( newTrip, cb ) {
	this.description = newTrip.description;
	this.startDate = newTrip.startDate;
	this.endDate = newTrip.endDate;
	this.category = newTrip.category._id;
	this.vehicle = newTrip.vehicle._id;
	this.notes = newTrip.notes;
	this.save( cb );
};

mongoose.model( 'Trip', TripSchema );
