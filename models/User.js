var mongoose = require( 'mongoose' );
var crypto = require( 'crypto' );
var jwt = require( 'jsonwebtoken' );
var config = require( '../config/config' );

var UserSchema = new mongoose.Schema( {
	username : { type : String, lowercase : true, unique : true },
	passwordHash : String,
	passwordSalt : String
} );

UserSchema.methods.setPassword = function ( password ) {
	this.passwordSalt = crypto.randomBytes( 16 ).toString( 'hex' );
	this.passwordHash = crypto.pbkdf2Sync( password, this.passwordSalt, 1000, 64 ).toString( 'hex' );
};

UserSchema.methods.validPassword = function ( password ) {
	var hash = crypto.pbkdf2Sync( password, this.passwordSalt, 1000, 64 ).toString( 'hex' );
	
	return this.passwordHash === hash;
};

UserSchema.methods.generateJWT = function () {
	// set expiration to 30 days
	var today = new Date();
	var exp = new Date( today );
	exp.setDate( today.getDate() + 30 );
	
	return jwt.sign( {
		_id : this._id,
		username : this.username,
		exp : parseInt( exp.getTime() / 1000 )
	}, config.secret );
};

mongoose.model( 'User', UserSchema );
