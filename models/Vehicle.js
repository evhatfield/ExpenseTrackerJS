var mongoose = require( 'mongoose' );

var VehicleSchema = new mongoose.Schema( {
	year : Number,
	make : String,
	model : String,
	purchaseDate : Date,
	sellDate : Date,
	isActive : Boolean
} );

VehicleSchema.virtual( 'displayName' ).get( function () {
	return this.year + ' ' + this.make + ' ' + this.model;
} );

VehicleSchema.methods.update = function ( newVehicle, cb ) {
	this.year = newVehicle.year;
	this.make = newVehicle.make;
	this.model = newVehicle.model;
	this.purchaseDate = newVehicle.purchaseDate;
	this.sellDate = newVehicle.sellDate;
	this.isActive = newVehicle.isActive;
	this.save( cb );
};

mongoose.model( 'Vehicle', VehicleSchema );
