/* global angular */
var app = angular.module( 'expenseTracker', [ 'ui.router', 'ui.bootstrap', 'angularUtils.directives.dirPagination' ] );

app.config( [
	'$stateProvider',
	'$urlRouterProvider',
	function ( $stateProvider, $urlRouterProvider ) {
		$stateProvider.state( 'login', {
			url : '/login',
			templateUrl : '/login.html',
			controller : 'AuthCtrl',
			onEnter : [ '$state', 'authSvc', function ( $state, authSvc ) {
				if ( authSvc.isLoggedIn() ) {
					$state.go( 'home' );
				}
			} ]
		} );

		$stateProvider.state( 'register', {
			url : '/register',
			templateUrl : '/register.html',
			controller : 'AuthCtrl',
			onEnter : [ '$state', 'authSvc', function ( $state, authSvc ) {
				if ( authSvc.isLoggedIn() ) {
					$state.go( 'home' );
				}
			} ]
		} );

		$stateProvider.state( 'home', {
			url : '/home',
			templateUrl : '/home.html',
			controller : 'MainCtrl',
			onEnter : [ '$state', 'authSvc', function ( $state, authSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
			} ]
		} );

		$stateProvider.state( 'expense-categories', {
			url : '/expense-categories',
			templateUrl : '/expense-categories.html',
			controller : 'ExpenseCatCtrl',
			onEnter : [ '$state', 'authSvc', 'expenseCatSvc', function ( $state, authSvc, expenseCatSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				expenseCatSvc.setIsEditing( false );
			} ],
			resolve : {
				expenseCategoryPromise : [ 'expenseCatSvc', function ( expenseCatSvc ) {
					return expenseCatSvc.getAll();
				} ],
				expenseCategory : function () { return null; }
			}
		} );

		$stateProvider.state( 'expense-category', {
			url : '/expense-categories/{id}',
			templateUrl : '/expense-categories.html',
			controller : 'ExpenseCatCtrl',
			onEnter : [ '$state', 'authSvc', 'expenseCatSvc', function ( $state, authSvc, expenseCatSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				expenseCatSvc.setIsEditing( true );
			} ],
			resolve : {
				expenseCategory : [ '$stateParams', 'expenseCatSvc', function ( $stateParams, expenseCatSvc ) {
					return expenseCatSvc.get( $stateParams.id );
				} ]
			}
		} );

		$stateProvider.state( 'trip-categories', {
			url : '/trip-categories',
			templateUrl : '/trip-categories.html',
			controller : 'TripCatCtrl',
			onEnter : [ '$state', 'authSvc', 'tripCatSvc', function ( $state, authSvc, tripCatSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				tripCatSvc.setIsEditing( false );
			} ],
			resolve : {
				tripCategoryPromise : [ 'tripCatSvc', function ( tripCatSvc ) {
					return tripCatSvc.getAll();
				} ],
				tripCategory : function () { return null; }
			}
		} );

		$stateProvider.state( 'trip-category', {
			url : '/trip-categories/{id}',
			templateUrl : '/trip-categories.html',
			controller : 'TripCatCtrl',
			onEnter : [ '$state', 'authSvc', 'tripCatSvc', function ( $state, authSvc, tripCatSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				tripCatSvc.setIsEditing( true );
			} ],
			resolve : {
				tripCategory : [ '$stateParams', 'tripCatSvc', function ( $stateParams, tripCatSvc ) {
					return tripCatSvc.get( $stateParams.id );
				} ]
			}
		} );

		$stateProvider.state( 'payment-methods', {
			url : '/payment-methods',
			templateUrl : '/payment-methods.html',
			controller : 'PayMethCtrl',
			onEnter : [ '$state', 'authSvc', 'payMethSvc', function ( $state, authSvc, payMethSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				payMethSvc.setIsEditing( false );
			} ],
			resolve : {
				paymentMethodPromise : [ 'payMethSvc', function ( payMethSvc ) {
					return payMethSvc.getAll();
				} ],
				paymentMethod : function () { return null; }
			}
		} );

		$stateProvider.state( 'payment-method', {
			url : '/payment-methods/{id}',
			templateUrl : '/payment-methods.html',
			controller : 'PayMethCtrl',
			onEnter : [ '$state', 'authSvc', 'payMethSvc', function ( $state, authSvc, payMethSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				payMethSvc.setIsEditing( true );
			} ],
			resolve : {
				paymentMethod : [ '$stateParams', 'payMethSvc', function ( $stateParams, payMethSvc ) {
					return payMethSvc.get( $stateParams.id );
				} ]
			}
		} );

		$stateProvider.state( 'currencies', {
			url : '/currencies',
			templateUrl : '/currencies.html',
			controller : 'CurrencyCtrl',
			onEnter : [ '$state', 'authSvc', 'currencySvc', function ( $state, authSvc, currencySvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				currencySvc.setIsEditing( false );
			} ],
			resolve : {
				currencyPromise : [ 'currencySvc', function ( currencySvc ) {
					return currencySvc.getAll();
				} ],
				currency : function () { return null; }
			}
		} );

		$stateProvider.state( 'currency', {
			url : '/currencies/{id}',
			templateUrl : '/currencies.html',
			controller : 'CurrencyCtrl',
			onEnter : [ '$state', 'authSvc', 'currencySvc', function ( $state, authSvc, currencySvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				currencySvc.setIsEditing( true );
			} ],
			resolve : {
				currency : [ '$stateParams', 'currencySvc', function ( $stateParams, currencySvc ) {
					return currencySvc.get( $stateParams.id );
				} ]
			}
		} );

		$stateProvider.state( 'vehicles', {
			url : '/vehicles',
			templateUrl : '/vehicles.html',
			controller : 'VehicleCtrl',
			onEnter : [ '$state', 'authSvc', 'vehicleSvc', function ( $state, authSvc, vehicleSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				vehicleSvc.setIsEditing( false );
			} ],
			resolve : {
				vehiclePromise : [ 'vehicleSvc', function ( vehicleSvc ) {
					return vehicleSvc.getAll();
				} ],
				vehicle : function () { return null; }
			}
		} );

		$stateProvider.state( 'addVehicle', {
			url : '/vehicles/add',
			templateUrl : '/vehicle.html',
			controller : 'VehicleCtrl',
			onEnter : [ '$state', 'authSvc', 'vehicleSvc', function ( $state, authSvc, vehicleSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				vehicleSvc.setIsEditing( false );
			} ],
			resolve : {
				vehicle : function () { return null; }
			}
		} );

		$stateProvider.state( 'updateVehicle', {
			url : '/vehicles/{id}',
			templateUrl : '/vehicle.html',
			controller : 'VehicleCtrl',
			onEnter : [ '$state', 'authSvc', 'vehicleSvc', function ( $state, authSvc, vehicleSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				vehicleSvc.setIsEditing( true );
			} ],
			resolve : {
				vehicle : [ '$stateParams', 'vehicleSvc', function ( $stateParams, vehicleSvc ) {
					return vehicleSvc.get( $stateParams.id );
				} ]
			}
		} );

		$stateProvider.state( 'trips', {
			url : '/trips',
			templateUrl : '/trips.html',
			controller : 'TripCtrl',
			onEnter : [ '$state', 'authSvc', 'tripSvc', function ( $state, authSvc, tripSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				tripSvc.setIsEditing( false );
			} ],
			resolve : {
				tripPromise : [ 'tripSvc', function ( tripSvc ) {
					return tripSvc.getAll();
				} ],
				trip : function () { return null; }
			}
		} );

		$stateProvider.state( 'addTrip', {
			url : '/trips/add',
			templateUrl : '/trip.html',
			controller : 'TripCtrl',
			onEnter : [ '$state', 'authSvc', 'tripSvc', function ( $state, authSvc, tripSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				tripSvc.setIsEditing( false );
			} ],
			resolve : {
				categoryPromise : [ 'tripCatSvc', function ( tripCatSvc ) {
					return tripCatSvc.getAll();
				} ],
				vehiclePromise : [ 'vehicleSvc', function ( vehicleSvc ) {
					return vehicleSvc.getAll();
				} ],
				trip : function () { return null; }
			}
		} );

		$stateProvider.state( 'updateTrip', {
			url : '/trips/{id}',
			templateUrl : '/trip.html',
			controller : 'TripCtrl',
			onEnter : [ '$state', 'authSvc', 'tripSvc', function ( $state, authSvc, tripSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				tripSvc.setIsEditing( true );
			} ],
			resolve : {
				categoryPromise : [ 'tripCatSvc', function ( tripCatSvc ) {
					return tripCatSvc.getAll();
				} ],
				vehiclePromise : [ 'vehicleSvc', function ( vehicleSvc ) {
					return vehicleSvc.getAll();
				} ],
				trip : [ '$stateParams', 'tripSvc', function ( $stateParams, tripSvc ) {
					return tripSvc.get( $stateParams.id );
				} ]
			}
		} );

		$stateProvider.state( 'mileages', {
			url : '/mileages',
			templateUrl : '/mileages.html',
			controller : 'MileageCtrl',
			onEnter : [ '$state', 'authSvc', 'mileageSvc', function ( $state, authSvc, mileageSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				mileageSvc.setIsEditing( false );
			} ],
			resolve : {
				mileagePromise : [ 'mileageSvc', function ( mileageSvc ) {
					return mileageSvc.getAll();
				} ],
				mileage : function () { return null; }
			}
		} );

		$stateProvider.state( 'addMileage', {
			url : '/mileages/add',
			templateUrl : '/mileage.html',
			controller : 'MileageCtrl',
			onEnter : [ '$state', 'authSvc', 'mileageSvc', function ( $state, authSvc, mileageSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				mileageSvc.setIsEditing( false );
			} ],
			resolve : {
				tripPromise : [ 'tripSvc', function ( tripSvc ) {
					return tripSvc.getAll();
				} ],
				mileage : function () { return null; }
			}
		} );

		$stateProvider.state( 'updateMileage', {
			url : '/mileages/{id}',
			templateUrl : '/mileage.html',
			controller : 'MileageCtrl',
			onEnter : [ '$state', 'authSvc', 'mileageSvc', function ( $state, authSvc, mileageSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				mileageSvc.setIsEditing( true );
			} ],
			resolve : {
				tripPromise : [ 'tripSvc', function ( tripSvc ) {
					return tripSvc.getAll();
				} ],
				mileage : [ '$stateParams', 'mileageSvc', function ( $stateParams, mileageSvc ) {
					return mileageSvc.get( $stateParams.id );
				} ]
			}
		} );

		$stateProvider.state( 'expenses', {
			url : '/expenses',
			templateUrl : '/expenses.html',
			controller : 'ExpenseCtrl',
			onEnter : [ '$state', 'authSvc', 'expenseSvc', function ( $state, authSvc, expenseSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				expenseSvc.setIsEditing( false );
			} ],
			resolve : {
				expensePromise : [ 'expenseSvc', function ( expenseSvc ) {
					return expenseSvc.getAll();
				} ],
				expense : function () { return null; }
			}
		} );
		
		$stateProvider.state( 'addExpense', {
			url : '/expenses/add',
			templateUrl : '/expense.html',
			controller : 'ExpenseCtrl',
			params : {
				'expense' : {}
			},
			onEnter : [ '$state', 'authSvc', 'expenseSvc', function ( $state, authSvc, expenseSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				expenseSvc.setIsEditing( false );
			} ],
			resolve : {
				currencyPromise : [ 'currencySvc', function ( currencySvc ) {
					return currencySvc.getAll();
				} ],
				tripPromise : [ 'tripSvc', function ( tripSvc ) {
					return tripSvc.getAll();
				} ],
				categoryPromise : [ 'expenseCatSvc', function ( expenseCatSvc ) {
					return expenseCatSvc.getAll();
				} ],
				vehiclePromise : [ 'vehicleSvc', function ( vehicleSvc ) {
					return vehicleSvc.getAll();
				} ],
				payMethPromise : [ 'payMethSvc', function ( payMethSvc ) {
					return payMethSvc.getAll();
				} ],
				expense : function () { return null; }
			}
		} );

		$stateProvider.state( 'updateExpense', {
			url : '/expenses/{id}',
			templateUrl : '/expense.html',
			controller : 'ExpenseCtrl',
			onEnter : [ '$state', 'authSvc', 'expenseSvc', function ( $state, authSvc, expenseSvc ) {
				if ( !authSvc.isLoggedIn() ) {
					$state.go( 'login' );
				}
				expenseSvc.setIsEditing( true );
			} ],
			resolve : {
				currencyPromise : [ 'currencySvc', function ( currencySvc ) {
					return currencySvc.getAll();
				} ],
				tripPromise : [ 'tripSvc', function ( tripSvc ) {
					return tripSvc.getAll();
				} ],
				categoryPromise : [ 'expenseCatSvc', function ( expenseCatSvc ) {
					return expenseCatSvc.getAll();
				} ],
				vehiclePromise : [ 'vehicleSvc', function ( vehicleSvc ) {
					return vehicleSvc.getAll();
				} ],
				payMethPromise : [ 'payMethSvc', function ( payMethSvc ) {
					return payMethSvc.getAll();
				} ],
				expense : [ '$stateParams', 'expenseSvc', function ( $stateParams, expenseSvc ) {
					return expenseSvc.get( $stateParams.id );
				} ]
			}
		} );

		$urlRouterProvider.otherwise( 'login' );
	}
] );

