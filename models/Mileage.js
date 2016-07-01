var mongoose = require( 'mongoose' );

var MileageSchema = new mongoose.Schema( {
	trip : { type : mongoose.Schema.Types.ObjectId, ref : 'Trip' },
	startMileage : Number,
	endMileage : Number
} );

MileageSchema.methods.update = function ( newMileage, cb ) {
	this.trip = newMileage.trip._id;
	this.startMileage = newMileage.startMileage;
	this.endMileage = newMileage.endMileage;
	this.save( cb );
};

mongoose.model( 'Mileage', MileageSchema );
