var mongoose = require( 'mongoose' );

var ExpenseSchema = new mongoose.Schema( {
	date : { type : Date, default : Date.now },
	vendor : String,
	description : String,
	category : { type : mongoose.Schema.Types.ObjectId, ref : 'ExpenseCategory' },
	paymentMethod : { type : mongoose.Schema.Types.ObjectId, ref : 'PaymentMethod' },
	amount : Number,
	reference : String,
	currency : { type : mongoose.Schema.Types.ObjectId, ref : 'Currency' },
	trip : { type : mongoose.Schema.Types.ObjectId, ref : 'Trip' },
	vehicle : { type : mongoose.Schema.Types.ObjectId, ref : 'Vehicle' } 
} );

ExpenseSchema.methods.update = function ( newExpense, cb ) {
	this.date = newExpense.date;
	this.vendor = newExpense.vendor;
	this.description = newExpense.description;
	this.category = newExpense.category._id;
	this.paymentMethod = newExpense.paymentMethod._id;
	this.amount = newExpense.amount;
	this.reference = newExpense.amount;
	this.currency = newExpense.currency._id;
	this.trip = !newExpense.trip ? null : newExpense.trip._id;
	this.vehicle = !newExpense.vehicle ? null : newExpense.vehicle._id;
	this.save( cb );
};

mongoose.model( 'Expense', ExpenseSchema );
