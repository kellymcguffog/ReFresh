
var app = angular.module("FreshApp", ["ngRoute", "firebase", "angularMoment"]);

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
	$scope.now=new Date();

	

	$scope.addFood = function(){
		$scope.foods.$add({
			foodName: $scope.newFood,
			expirationDate: moment($scope.newDate).valueOf()
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

   auth.$onAuthStateChanged(function(firebaseUser) {
    	if (firebaseUser) {
      	$scope.firebaseUser = firebaseUser;
    	} else {
      	$location.path("/login");
    	}
  	});

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

	$scope.logout = function() {
    	auth.$signOut();
    	$location.path("/login");
    }

     auth.$onAuthStateChanged(function(firebaseUser) {
    	if (firebaseUser) {
      	$scope.firebaseUser = firebaseUser;
    	} else {
      	$location.path("/login");
    	}
  	});
});

app.controller("RecipesCtrl", function($scope, $http, $firebaseAuth, $location){
	var auth = $firebaseAuth();
<<<<<<< HEAD
=======

	
	// a536a2646f5a9b67378a243e824e81e9
>>>>>>> acb8e6eebd0353c06058889cd9321970cc540899

	var searchRecipes = function(searchTerm) {
		$http({
			method: "GET",
			url: "https://community-food2fork.p.mashape.com/search?key=a536a2646f5a9b67378a243e824e81e9&q=" + searchTerm /* FILL ME IN */,
			headers: {
	       	 	"X-Mashape-Key": "KrZbO5yzSumshBj76mYJ0okrsS2Bp1QEnvNjsnsl7FsgbPngq7"
	     	 },
	     	dataType: "json"
		}).then(function(response) {
			$scope.recipes = [];
			$scope.recipes = response.data.recipes;
			if (response.data.recipes.length=== 0) {
				$scope.errorMessage= "Your search did not reveal any results"
			}
		});
	};

	$scope.doSearch = function() {
		searchRecipes($scope.newRecipe);
	};

	$scope.logout = function() {
    	auth.$signOut();
    	$location.path("/login");
    }

     auth.$onAuthStateChanged(function(firebaseUser) {
    	if (firebaseUser) {
      	$scope.firebaseUser = firebaseUser;
    	} else {
      	$location.path("/login");
    	}
  	});





app.controller("FavoritesCtrl", function($scope, $firebaseArray, $firebaseAuth, $location){
	var auth = $firebaseAuth();

     auth.$onAuthStateChanged(function(firebaseUser) {
    	if (firebaseUser) {
      	$scope.firebaseUser = firebaseUser;
    	} else {
      	$location.path("/login");
    	}
  	});

    $scope.logout = function() {
    	auth.$signOut();
    	$location.path("/login");
    } 
});



