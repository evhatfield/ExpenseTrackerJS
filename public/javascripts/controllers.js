app.controller( 'AuthCtrl', [
	'$scope',
	'$state',
	'authSvc',
	function ( $scope, $state, authSvc ) {
		$scope.user = {};

		$scope.register = function () {
			authSvc.register( $scope.user ).error( function( error ) {
				$scope.error = error;
			} ).then( function () {
				$state.go( 'home' );
			} );
		};

		$scope.logIn = function () {
			authSvc.logIn( $scope.user ).error( function ( error ) {
				$scope.error = error;
			} ).then( function () {
				$state.go( 'home' );
			} );
		};
	}
] );

app.controller( 'NavCtrl', [
	'$scope',
	'authSvc',
	function( $scope, authSvc ) {
		$scope.isLoggedIn = authSvc.isLoggedIn;
		$scope.currentUser = authSvc.currentUser;
		$scope.logOut = authSvc.logOut;
	}
] );

app.controller( 'MainCtrl', [
	'$scope',
	'authSvc',
	function ( $scope, authSvc ) {
		$scope.isLoggedIn = authSvc.isLoggedIn;
	}
] );

app.controller( 'ExpenseCatCtrl', [
	'$scope',
	'$state',
	'expenseCatSvc',
	'expenseCategory',
	'authSvc',
	function ( $scope, $state, expenseCatSvc, expenseCategory, authSvc ) {
		$scope.expenseCategories = expenseCatSvc.expenseCategories;
		$scope.expenseCategory = expenseCategory;
		$scope.isLoggedIn = authSvc.isLoggedIn;
		$scope.isEditing = expenseCatSvc.getIsEditing();
		$scope.isDisabled = false;

		$scope.disableButton = function () {
			isDisabled = true;
		};

		$scope.addExpenseCategory = function () {
			if ( !$scope.description || $scope.description === '' ) { return; }

			expenseCatSvc.create( {
				description : $scope.description,
			} );

			$scope.description = '';
		};

		$scope.updateExpenseCategory = function () {
			if ( !$scope.expenseCategory.description || $scope.expenseCategory.description === '' ) { return; }

			expenseCatSvc.update( $scope.expenseCategory );
			$state.go( 'expense-categories' );
		};

		$scope.deleteExpenseCategory = function ( id ) {
			expenseCatSvc.delete( id );
		};
	}
] );

app.controller( 'TripCatCtrl', [
	'$scope',
	'$state',
	'tripCatSvc',
	'tripCategory',
	'authSvc',
	function ( $scope, $state, tripCatSvc, tripCategory, authSvc ) {
		$scope.tripCategories = tripCatSvc.tripCategories;
		$scope.tripCategory = tripCategory;
		$scope.isLoggedIn = authSvc.isLoggedIn;
		$scope.isEditing = tripCatSvc.getIsEditing();
                $scope.isDisabled = false;

                $scope.disableButton = function () {
                        isDisabled = true;
                };

		$scope.addTripCategory = function () {
			if ( !$scope.description || $scope.description === '' ) { return; }

			tripCatSvc.create( {
				description : $scope.description,
			} );

			$scope.description = '';
		};

		$scope.updateTripCategory = function () {
			if ( !$scope.tripCategory.description || $scope.tripCategory.description === '' ) { return; }

			tripCatSvc.update( $scope.tripCategory );
			$state.go( 'trip-categories' );
		};

		$scope.deleteTripCategory = function ( id ) {
			tripCatSvc.delete( id );
		};
	}
] );

app.controller( 'PayMethCtrl', [
	'$scope',
	'$state',
	'payMethSvc',
	'paymentMethod',
	'authSvc',
	function ( $scope, $state, payMethSvc, paymentMethod, authSvc ) {
		$scope.paymentMethods = payMethSvc.paymentMethods;
		$scope.paymentMethod = paymentMethod;
		$scope.isLoggedIn = authSvc.isLoggedIn;
		$scope.isEditing = payMethSvc.getIsEditing();
                $scope.isDisabled = false;

                $scope.disableButton = function () {
                        isDisabled = true;
                };

		$scope.addPaymentMethod = function () {
			if ( !$scope.description || $scope.description === '' ) { return; }

			payMethSvc.create( {
				type : $scope.type,
				description : $scope.description
			} );

			$scope.description = '';
		};

		$scope.updatePaymentMethod = function () {
			if ( !$scope.paymentMethod.type || $scope.paymentMethod.type === '' ) { return; }
			if ( !$scope.paymentMethod.description || $scope.paymentMethod.description === '' ) { return; }

			payMethSvc.update( $scope.paymentMethod );
			$state.go( 'payment-methods' );
		};

		$scope.deletePaymentMethod = function ( id ) {
			payMethSvc.delete( id );
		};

		$scope.typeDisplay = function ( type ) {
			switch ( type )
			{
				case "cash":
					return "Cash";

				case "check":
					return "Check";

				case "credit-card":
					return "Credit Card";

				case "debit-card":
					return "Debit Card";

				case "paypal":
					return "Paypal";

				default:
					return "Other";
			}
		};
	}
] );

app.controller( 'CurrencyCtrl', [
	'$scope',
	'$state',
	'currencySvc',
	'currency',
	'authSvc',
	function ( $scope, $state, currencySvc, currency, authSvc ) {
		$scope.currencies = currencySvc.currencies;
		$scope.currency = currency;
		$scope.isLoggedIn = authSvc.isLoggedIn;
		$scope.isEditing = currencySvc.getIsEditing();
                $scope.isDisabled = false;

                $scope.disableButton = function () {
                        isDisabled = true;
                };

		$scope.addCurrency = function () {
			if ( !$scope.abbreviation || $scope.abbreviation === '' ) { return; }
			if ( !$scope.symbol || $scope.symbol === '' ) { return; }
			if ( !$scope.description || $scope.description === '' ) { return; }
			if ( !$scope.usdExchangeRate || $scope.usdExchangeRate === '' ) { return; }

			currencySvc.create( {
				abbreviation : $scope.abbreviation,
				symbol : $scope.symbol,
				description : $scope.description,
				usdExchangeRate : $scope.usdExchangeRate
			} );

			$scope.abbreviation = '';
			$scope.symbol = '';
			$scope.description = '';
			$scope.usdExchangeRate = '';
		};

		$scope.updateCurrency = function () {
			if ( !$scope.currency.description || $scope.currency.description === '' ) { return; }
			if ( !$scope.currency.symbol || $scope.currency.symbol === '' ) { return; }
			if ( !$scope.currency.usdExchangeRate || $scope.currency.usdExchangeRate === '' ) { return; }

			currencySvc.update( $scope.currency );
			$state.go( 'currencies' );
		};

		$scope.deleteCurrency = function ( id ) {
			currencySvc.delete( id );
		};
	}
] );

app.controller( 'VehicleCtrl', [
	'$scope',
	'$state',
	'vehicleSvc',
	'vehicle',
	'authSvc',
	function ( $scope, $state, vehicleSvc, vehicle, authSvc ) {
		$scope.vehicles = vehicleSvc.vehicles;
		$scope.vehicle = vehicle;

		if ( vehicle )
		{
			$scope.vehicle.purchaseDate = new Date( vehicle.purchaseDate );
		}

		$scope.isLoggedIn = authSvc.isLoggedIn;
		$scope.isEditing = vehicleSvc.getIsEditing();
                $scope.isDisabled = false;

                $scope.disableButton = function () {
                        isDisabled = true;
                };

		$scope.goToAdd = function () {
			$state.go( 'addVehicle' );
		};

		$scope.addVehicle = function () {
			if ( !$scope.year || $scope.year === '' ) { return; }
			if ( !$scope.make || $scope.make === '' ) { return; }
			if ( !$scope.model || $scope.model === '' ) { return; }
			if ( !$scope.purchaseDate || $scope.purchaseDate === '' ) { return; }

			vehicleSvc.create( {
				year : $scope.year,
				make : $scope.make,
				model : $scope.model,
				purchaseDate : $scope.purchaseDate,
				isActive : $scope.isActive
			} );

			$state.go( 'vehicles' );
		};

		$scope.updateVehicle = function () {
			if ( !$scope.vehicle.year || $scope.vehicle.year === '' ) { return; }
			if ( !$scope.vehicle.make || $scope.vehicle.make === '' ) { return; }
			if ( !$scope.vehicle.model || $scope.vehicle.model === '' ) { return; }
			if ( !$scope.vehicle.purchaseDate || $scope.vehicle.purchaseDate === '' ) { return; }

			vehicleSvc.update( $scope.vehicle );
			$state.go( 'vehicles' );
		};

		$scope.deleteVehicle = function ( id ) {
			vehicleSvc.delete( id );
		};

		$scope.isActiveDisplay = function ( isActive ) {
			if ( isActive ) {
				return "Yes";
			} else {
				return "No";
			}
		};
	}
] );

app.controller( 'TripCtrl', [
	'$scope',
	'$state',
	'tripSvc',
	'tripCatSvc',
	'vehicleSvc',
	'trip',
	'authSvc',
	function ( $scope, $state, tripSvc, tripCatSvc, vehicleSvc, trip, authSvc ) {
		$scope.trips = tripSvc.trips;
		$scope.trip = trip;
		$scope.allCategories = tripCatSvc.tripCategories;
		$scope.allVehicles = vehicleSvc.vehicles;

		if ( trip )
		{
			$scope.trip.startDate = new Date( trip.startDate );
			$scope.trip.endDate = new Date( trip.endDate );
		}

		$scope.isLoggedIn = authSvc.isLoggedIn;
		$scope.isEditing = tripSvc.getIsEditing();
                $scope.isDisabled = false;

                $scope.disableButton = function () {
                        isDisabled = true;
                };

		$scope.goToAdd = function () {
			$state.go( 'addTrip' );
		};

		$scope.addTrip = function () {
			if ( !$scope.description || $scope.description === '' ) { return; }
			if ( !$scope.startDate || $scope.startDate === '' ) { return; }
			if ( !$scope.category || $scope.category === '' ) { return; }

			tripSvc.create( {
				description : $scope.description,
				startDate : $scope.startDate,
				endDate : $scope.endDate,
				notes : $scope.notes,
				category : $scope.category._id,
				vehicle : $scope.vehicle._id
			} );

			$state.go( 'trips' );
		};

		$scope.updateTrip = function () {
			if ( !$scope.trip.description || $scope.trip.description === '' ) { return; }
			if ( !$scope.trip.startDate || $scope.trip.startDate === '' ) { return; }
			if ( !$scope.trip.category || $scope.trip.category === '' ) { return; }

			tripSvc.update( $scope.trip );
			$state.go( 'trips' );
		};

		$scope.deleteTrip = function ( id ) {
			tripSvc.delete( id );
		};

		$scope.vehicleDisplay = function ( vehicle ) {
			return vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model;
		};

		$scope.displayVehicle = function ( vehicle ) {
			return vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model;
		};


		$scope.startDate = new Date();
		$scope.endDate = new Date();

		$scope.openStartDate = function () {
			$scope.startPopup.opened = true;
		};

		$scope.openEndDate = function () {
			$scope.endPopup.opened = true;
		};

		$scope.format = 'yyyy-MM-dd';

		$scope.startPopup = {
			opened: false
		};

		$scope.endPopup = {
			opened: false
		};
	}
] );

app.controller( 'MileageCtrl', [
	'$scope',
	'$state',
	'mileageSvc',
	'tripSvc',
	'mileage',
	'authSvc',
	function ( $scope, $state, mileageSvc, tripSvc, mileage, authSvc ) {
		$scope.mileages = mileageSvc.mileages;
		$scope.mileage = mileage;
		$scope.allTrips = tripSvc.trips;
		$scope.isLoggedIn = authSvc.isLoggedIn;
		$scope.isEditing = mileageSvc.getIsEditing();
                $scope.isDisabled = false;

                $scope.disableButton = function () {
                        isDisabled = true;
                };

		$scope.goToAdd = function () {
			$state.go( 'addMileage' );
		};

		$scope.addMileage = function () {
			if ( !$scope.trip || $scope.trip === '' ) { return; }
			if ( !$scope.startMileage || $scope.startMileage === '' ) { return; }
			if ( !$scope.endMileage || $scope.endMileage === '' ) { return; }

			mileageSvc.create( {
				trip : $scope.trip._id,
				startMileage : $scope.startMileage,
				endMileage : $scope.endMileage,
			} );

			$state.go( 'mileages' );
		};

		$scope.updateMileage = function () {
			if ( !$scope.mileage.trip || $scope.mileage.trip === '' ) { return; }
			if ( !$scope.mileage.startMileage || $scope.mileage.startMileage === '' ) { return; }
			if ( !$scope.mileage.endMileage || $scope.mileage.endMileage === '' ) { return; }

			mileageSvc.update( $scope.mileage );
			$state.go( 'mileages' );
		};

		$scope.deleteMileage = function ( id ) {
			mileageSvc.delete( id );
		};
	}
] );

app.controller( 'ExpenseCtrl', [
	'$scope',
	'$state',
	'$stateParams',
	'expenseSvc',
	'currencySvc',
	'tripSvc',
	'expenseCatSvc',
	'vehicleSvc',
	'payMethSvc',
	'expense',
	'authSvc',
	function ( $scope, $state, $stateParams, expenseSvc, currencySvc, tripSvc, expenseCatSvc, vehicleSvc, payMethSvc, expense, authSvc ) {
		$scope.expenses = expenseSvc.expenses;
		$scope.expense = expense;
		$scope.allTrips = tripSvc.trips;
		$scope.allCurrencies = currencySvc.currencies;
		$scope.allExpCats = expenseCatSvc.expenseCategories;
		$scope.allVehicles = vehicleSvc.vehicles;
		$scope.allPayMeths = payMethSvc.paymentMethods;
		$scope.isLoggedIn = authSvc.isLoggedIn;
		$scope.isEditing = expenseSvc.getIsEditing();
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.showVehicle = false;
		$scope.showTrip = false;
		$scope.isDisabled = false;

		// if this is a copy expense
		if ( $stateParams.expense != null && $stateParams.expense != {} ) {
			$scope.date = new Date( $stateParams.expense.date );
			$scope.vendor = $stateParams.expense.vendor;
			$scope.amount = $stateParams.expense.amount;
			$scope.description = $stateParams.expense.description;
			$scope.reference = $stateParams.expense.reference;
			$scope.paymentMethod = $stateParams.expense.paymentMethod;
			$scope.currency = $stateParams.expense.currency;
			$scope.category = $stateParams.expense.category;
			$scope.trip = $stateParams.expense.trip;
			$scope.vehicle = $stateParams.expense.vehicle;
		}

		// if this is an update expense
		if ( expense ) {
			$scope.expense.date = new Date( expense.date );
		} else {
			$scope.date = new Date();
		}

		$scope.pageChangeHandler = function ( num ) {
			$scope.currentPage = num;
		};

		$scope.goToAdd = function () {
			$state.go( 'addExpense' );
		};

		$scope.addExpense = function () {
			if ( !$scope.date || $scope.date === '' ) { return; }
			if ( !$scope.vendor || $scope.vendor === '' ) { return; }
			if ( !$scope.amount || $scope.amount === '' ) { return; }
			if ( !$scope.description || $scope.description === '' ) { return; }
			if ( !$scope.paymentMethod ) { return; }
			if ( !$scope.currency ) { return; }

			$scope.isDisabled = true;

			expenseSvc.create( {
				date : $scope.date,
				vendor : $scope.vendor,
				description : $scope.description,
				category : $scope.category._id,
				paymentMethod : $scope.paymentMethod._id,
				amount : $scope.amount,
				reference : $scope.reference,
				currency : $scope.currency._id,
				trip : !$scope.trip ? null : $scope.trip._id,
				vehicle : !$scope.vehicle ? null : $scope.vehicle._id
			} );

			$state.go( 'expenses' );
		};

		$scope.updateExpense = function () {
			if ( !$scope.expense.date || $scope.expense.date === '' ) { return; }
			if ( !$scope.expense.vendor || $scope.expense.vendor === '' ) { return; }
			if ( !$scope.expense.amount || $scope.expense.amount === '' ) { return; }
			if ( !$scope.expense.description || $scope.expense.description === '' ) { return; }
			if ( !$scope.expense.paymentMethod ) { return; }
			if ( !$scope.expense.currency ) { return; }

			expenseSvc.update( $scope.expense );
			$state.go( 'expenses' );
		};

		$scope.deleteExpense = function ( id ) {
			expenseSvc.delete( id );
		};

		$scope.copyExpense = function ( expense ) {
			$state.go( 'addExpense', { 'expense' : expense } );
		};

		$scope.$watch( function ( scope ) {
			if ( scope.expense != null ) {
				return scope.expense.category;
			} else {
				return scope.category;
			}
		}, function ( newValue, oldValue ) {
			if ( newValue == null || newValue == {} ) {
				return;
			}

			var vehicleSearch = /auto/gi;
			if ( newValue.description.search( vehicleSearch ) >= 0 && newValue.description != 'Auto Rental' ) {
				$scope.showVehicle = true;
			} else {
				$scope.showVehicle = false;
			}

			var tripSearch = /{gas|food|airline|tolls|parking|auto rental|lodging|transportation}/gi;
			if ( newValue.description.search( tripSearch ) >= 0 ) {
				$scope.showTrip = true;
			} else {
				$scope.showTrip = false;
			}
		} );

		$scope.openDate = function() {
			$scope.popup.opened = true;
		};

		$scope.format = 'yyyy-MM-dd';

		$scope.popup = {
			opened: false
		};
	}
] );

