app.factory( 'authSvc', [ '$http', '$window', '$state', function ( $http, $window, $state ) {
	var auth = {};

	auth.saveToken = function ( token ) {
		$window.localStorage[ 'expense-tracker-token' ] = token;
	};
	
	auth.getToken = function () {
		return $window.localStorage[ 'expense-tracker-token' ];
	}

	auth.isLoggedIn = function() {
		var token = auth.getToken();
	
		if ( token ) {
			var payload = JSON.parse( $window.atob( token.split( '.' )[ 1 ] ) );

			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	auth.currentUser = function() {
		if ( auth.isLoggedIn() ) {
			var token = auth.getToken();
			var payload = JSON.parse( $window.atob( token.split( '.' )[ 1 ] ) );

			return payload.username;
		}
	};

	auth.register = function ( user ) {
		return $http.post( '/register/', user ).success( function ( data ) {
			auth.saveToken( data.token );
		} );
	};

	auth.logIn = function ( user ) {
		return $http.post( '/login/', user ).success( function ( data ) {
			auth.saveToken( data.token );
		} );
	};

	auth.logOut = function () {
		$window.localStorage.removeItem( 'expense-tracker-token' );
		$state.go( 'login' );
	};

	return auth;
} ] );

app.factory( 'expenseCatSvc', [ '$http', 'authSvc', function ( $http, authSvc ) {
	var o = {
		expenseCategories : [],
		isEditing : false
	};

	o.setIsEditing = function ( set ) { o.isEditing = set; }
	o.getIsEditing = function () { return o.isEditing; }

	o.getAll = function () {
		return $http.get( '/expense-categories/' ).success( function ( data ) {
			angular.copy( data, o.expenseCategories );
		} );
	};

	o.create = function ( expenseCategory ) {
		return $http.post( '/expense-categories/', expenseCategory, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			o.expenseCategories.push( data );
		} );
	};

	o.get = function ( id ) {
		return $http.get( '/expense-categories/' + id ).then( function ( res ) {
			return res.data;
		} );
	};

	o.update = function ( expenseCategory ) {
		return $http.put( '/expense-categories/' + expenseCategory._id + '/update', expenseCategory, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.expenseCategories.length; i++ ) {
				if ( o.expenseCategories[ i ]._id === expenseCategory._id ) {
					o.expenseCategories[ i ].description = expenseCategory.description;
					break;
				}
			}
		} );
	};

	o.delete = function ( id ) {
		return $http.delete( '/expense-categories/' + id + '/delete', null, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.expenseCategories.length; i++ ) {
				if ( o.expenseCategories[ i ]._id === id ) {
					o.expenseCategories.splice( i, 1 );
					break;
				}
			}
		} );
	};

	return o;
} ] );

app.factory( 'tripCatSvc', [ '$http', 'authSvc', function ( $http, authSvc ) {
	var o = {
		tripCategories : [],
		isEditing : false
	};

	o.setIsEditing = function ( set ) { o.isEditing = set; }
	o.getIsEditing = function () { return o.isEditing; }

	o.getAll = function () {
		return $http.get( '/trip-categories' ).success( function ( data ) {
			angular.copy( data, o.tripCategories );
		} );
	};

	o.create = function ( tripCategory ) {
		return $http.post( '/trip-categories', tripCategory, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			o.tripCategories.push( data );
		} );
	};

	o.get = function ( id ) {
		return $http.get( '/trip-categories/' + id ).then( function ( res ) {
			return res.data;
		} );
	};

	o.update = function ( tripCategory ) {
		return $http.put( '/trip-categories/' + tripCategory._id + '/update', tripCategory, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.tripCategories.length; i++ ) {
				if ( o.tripCategories[ i ]._id === tripCategory._id ) {
					o.tripCategories[ i ].description = tripCategory.description;
					break;
				}
			}
		} );
	};

	o.delete = function ( id ) {
		return $http.delete( '/trip-categories/' + id + '/delete', null, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.tripCategories.length; i++ ) {
				if ( o.tripCategories[ i ]._id === id ) {
					o.tripCategories.splice( i, 1 );
					break;
				}
			}
		} );
	};

	return o;
} ] );

app.factory( 'payMethSvc', [ '$http', 'authSvc', function ( $http, authSvc ) {
	var o = {
		paymentMethods : [],
		isEditing : false
	};

	o.setIsEditing = function ( set ) { o.isEditing = set; }
	o.getIsEditing = function () { return o.isEditing; }

	o.getAll = function () {
		return $http.get( '/payment-methods' ).success( function ( data ) {
			angular.copy( data, o.paymentMethods );
		} );
	};

	o.create = function ( paymentMethod ) {
		return $http.post( '/payment-methods', paymentMethod, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			o.paymentMethods.push( data );
		} );
	};

	o.get = function ( id ) {
		return $http.get( '/payment-methods/' + id ).then( function ( res ) {
			return res.data;
		} );
	};

	o.update = function ( paymentMethod ) {
		return $http.put( '/payment-methods/' + paymentMethod._id + '/update', paymentMethod, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.paymentMethods.length; i++ ) {
				if ( o.paymentMethods[ i ]._id === paymentMethod._id ) {
					o.paymentMethods[ i ].type = paymentMethod.type;
					o.paymentMethods[ i ].description = paymentMethod.description;
					break;
				}
			}
		} );
	};

	o.delete = function ( id ) {
		return $http.delete( '/payment-methods/' + id + '/delete', null, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.paymentMethods.length; i++ ) {
				if ( o.paymentMethods[ i ]._id === id ) {
					o.paymentMethods.splice( i, 1 );
					break;
				}
			}
		} );
	};

	return o;
} ] );

app.factory( 'currencySvc', [ '$http', 'authSvc', function ( $http, authSvc ) {
	var o = {
		currencies : [],
		isEditing : false
	};
	
	o.setIsEditing = function ( set ) { o.isEditing = set; }
	o.getIsEditing = function () { return o.isEditing; }

	o.getAll = function () {
		return $http.get( '/currencies' ).success( function ( data ) {
			angular.copy( data, o.currencies );
		} );
	};

	o.create = function ( currency ) {
		return $http.post( '/currencies', currency, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			o.currencies.push( data );
		} );
	};

	o.get = function ( id ) {
		return $http.get( '/currencies/' + id ).then( function ( res ) {
			return res.data;
		} );
	};

	o.update = function ( currency ) {
		return $http.put( '/currencies/' + currency._id + '/update', currency, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.currencies.length; i++ ) {
				if ( o.currencies[ i ]._id === currency._id ) {
					o.currencies[ i ].description = currency.description;
					o.currencies[ i ].usdExchangeRate = currency.usdExchangeRate;
					break;
				}
			}
		} );
	};

	o.delete = function ( id ) {
		return $http.delete( '/currencies/' + id + '/delete', null, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.currencies.length; i++ ) {
				if ( o.currencies[ i ]._id === id ) {
					o.currencies.splice( i, 1 );
					break;
				}
			}
		} );
	};

	return o;
} ] );

app.factory( 'vehicleSvc', [ '$http', 'authSvc', function ( $http, authSvc ) {
	var o = {
		vehicles : [],
		isEditing : false
	};
	
	o.setIsEditing = function ( set ) { o.isEditing = set; }
	o.getIsEditing = function () { return o.isEditing; }

	o.getAll = function () {
		return $http.get( '/vehicles' ).success( function ( data ) {
			angular.copy( data, o.vehicles );
		} );
	};

	o.create = function ( vehicle ) {
		return $http.post( '/vehicles', vehicle, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			o.vehicles.push( data );
		} );
	};

	o.get = function ( id ) {
		return $http.get( '/vehicles/' + id ).then( function ( res ) {
			return res.data;
		} );
	};

	o.update = function ( vehicle ) {
		return $http.put( '/vehicles/' + vehicle._id + '/update', vehicle, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.vehicles.length; i++ ) {
				if ( o.vehicles[ i ]._id === vehicle._id ) {
					o.vehicles[ i ].year = vehicle.year;
					o.vehicles[ i ].make = vehicle.make;
					o.vehicles[ i ].model = vehicle.model;
					o.vehicles[ i ].purchaseDate = vehicle.purchaseDate;
					o.vehicles[ i ].isActive = vehicle.isActive;
					break;
				}
			}
		} );
	};

	o.delete = function ( id ) {
		return $http.delete( '/vehicles/' + id + '/delete', null, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.vehicles.length; i++ ) {
				if ( o.vehicles[ i ]._id === id ) {
					o.vehicles.splice( i, 1 );
					break;
				}
			}
		} );
	};

	return o;
} ] );

app.factory( 'tripSvc', [ '$http', 'authSvc', function ( $http, authSvc ) {
	var o = {
		trips : [],
		isEditing : false
	};
	
	o.setIsEditing = function ( set ) { o.isEditing = set; }
	o.getIsEditing = function () { return o.isEditing; }

	o.getAll = function () {
		return $http.get( '/trips' ).success( function ( data ) {
			angular.copy( data, o.trips );
		} );
	};

	o.create = function ( trip ) {
		return $http.post( '/trips', trip, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			o.trips.push( data );
		} );
	};

	o.get = function ( id ) {
		return $http.get( '/trips/' + id ).then( function ( res ) {
			return res.data;
		} );
	};

	o.update = function ( trip ) {
		return $http.put( '/trips/' + trip._id + '/update', trip, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.trips.length; i++ ) {
				if ( o.trips[ i ]._id === trip._id ) {
					o.trips[ i ].description = trip.description;
					o.trips[ i ].startDate = trip.startDate;
					o.trips[ i ].endDate = trip.endDate;
					o.trips[ i ].notes = trip.notes;
					o.trips[ i ].category = trip.category;
					o.trips[ i ].vehicle = trip.vehicle;
					break;
				}
			}
		} ); 
	};

	o.delete = function ( id ) {
		return $http.delete( '/trips/' + id + '/delete', null, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.trips.length; i++ ) {
				if ( o.trips[ i ]._id === id ) {
					o.trips.splice( i, 1 );
					break;
				}
			}
		} );
	};

	return o;
} ] );

app.factory( 'mileageSvc', [ '$http', 'authSvc', function ( $http, authSvc ) {
	var o = {
		mileages : [],
		isEditing : false
	};
	
	o.setIsEditing = function ( set ) { o.isEditing = set; }
	o.getIsEditing = function () { return o.isEditing; }

	o.getAll = function () {
		return $http.get( '/mileages' ).success( function ( data ) {
			angular.copy( data, o.mileages );
		} );
	};

	o.create = function ( mileage ) {
		return $http.post( '/mileages', mileage, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			o.mileages.push( data );
		} );
	};

	o.get = function ( id ) {
		return $http.get( '/mileages/' + id ).then( function ( res ) {
			return res.data;
		} );
	};

	o.update = function ( mileage ) {
		return $http.put( '/mileages/' + mileage._id + '/update', mileage, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.mileages.length; i++ ) {
				if ( o.mileages[ i ]._id === mileage._id ) {
					o.mileages[ i ].startMileage = mileage.startMileage;
					o.mileages[ i ].endMileage = mileage.endMileage;
					o.mileages[ i ].trip = mileage.trip;
					break;
				}
			}
		} ); 
	};

	o.delete = function ( id ) {
		return $http.delete( '/mileages/' + id + '/delete', null, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.mileages.length; i++ ) {
				if ( o.mileages[ i ]._id === id ) {
					o.mileages.splice( i, 1 );
					break;
				}
			}
		} );
	};

	return o;
} ] );

app.factory( 'expenseSvc', [ '$http', 'authSvc', function ( $http, authSvc ) {
	var o = {
		expenses : [],
		isEditing : false
	};

	o.setIsEditing = function ( set ) { o.isEditing = set; }
	o.getIsEditing = function () { return o.isEditing; }

	o.getAll = function () {
		return $http.get( '/expenses/' ).success( function ( data ) {
			angular.copy( data, o.expenses );
		} );
	};

	o.create = function ( expense ) {
		return $http.post( '/expenses', expense, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			o.expenses.push( data );
		} );
	};

	o.get = function ( id ) {
		return $http.get( '/expenses/' + id ).then( function ( res ) {
			return res.data;
		} );
	};

	o.update = function ( expense ) {
		return $http.put( '/expenses/' + expense._id + '/update', expense, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.expenses.length; i++ ) {
				if ( o.expenses[ i ]._id === expense._id ) {
					o.expenses[ i ].date = expense.date;
					o.expenses[ i ].vendor = expense.vendor;
					o.expenses[ i ].amount = expense.amount;
					o.expenses[ i ].reference = expense.reference;
					o.expenses[ i ].description = expense.description;
					o.expenses[ i ].category = expense.category;
					o.expenses[ i ].paymentMethod = expense.paymentMethod;
					o.expenses[ i ].currency = expense.currency;
					o.expenses[ i ].vehicle = expense.vehicle;
					o.expenses[ i ].trip = expense.trip;
					break;
				}
			}
		} ); 
	};

	o.delete = function ( id ) {
		return $http.delete( '/expenses/' + id + '/delete', null, {
			headers : { Authorization : 'Bearer ' + authSvc.getToken() }
		} ).success( function ( data ) {
			for ( var i = 0; i < o.expenses.length; i++ ) {
				if ( o.expenses[ i ]._id === id ) {
					o.expenses.splice( i, 1 );
					break;
				}
			}
		} );
	};

	return o;
} ] );

