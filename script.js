var app = angular.module("FreshApp", ["ngRoute", "firebase"]);

  app.config(function($routeProvider) {
  $routeProvider.when("/login", {
    controller: "LoginCtrl",
    templateUrl: "templates/login.html"
  })
  $routeProvider.when("/", {
    templateUrl: "templates/expiration.html"
  })
  $routeProvider.when("/list", {
    templateUrl: "templates/list.html"
  })
  $routeProvider.when("/recipes", {
    templateUrl: "templates/recipes.html"
  })
  $routeProvider.when("/favorites", {
    templateUrl: "templates/favorites.html"
  })
});

app.controller("LoginCtrl", function($scope, $location, $firebaseAuth) {
  	var auth = $firebaseAuth();

 	auth.$onAuthStateChanged(function(firebaseUser) {
	    if (firebaseUser) {
	      $location.path("/");
	    }
	});

	$scope.signIn = function() {
		$scope.message = "";
		$scope.error = "";
		auth.$signInWithPopup("facebook")
		  .catch(function(error) {
		    $scope.error = error;
		  });
	}
});
app.controller("ExpirationCtrl", function($scope, $firebaseArray, $firebaseAuth, $location){
	var auth = $firebaseAuth();
	var ref = firebase.database().ref().child("foods");
	$scope.foods = $firebaseArray(ref);
	
	$scope.newFood="";
	$scope.newDate="";

	$scope.addFood = function(){
		$scope.foods.$add({
			foodName: $scope.newFood,
			expirationDate: $scope.newDate
		});
		$scope.newFood="";
		$scope.newDate="";
	};

	$scope.remove=function(food){
		$scope.foods.$remove(food);
	};

	
	$scope.logout = function() {
    	auth.$signOut();
    	$location.path("/login");
    }
});

app.controller("ListCtrl", function($scope, $firebaseArray, $firebaseAuth, $location){
	var auth = $firebaseAuth();
	var ref = firebase.database().ref().child("items");
	$scope.items = $firebaseArray(ref);
	
	$scope.newItem="";

	$scope.addItem = function(){
		$scope.items.$add({
			itemName: $scope.newItem
		});
		$scope.newItem="";
	};

	$scope.remove=function(item){
		$scope.items.$remove(item);
	};
});

app.controller("RecipesCtrl", function($scope, $http, $firebaseAuth, $location){
	var auth = $firebaseAuth();
