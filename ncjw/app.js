var ncjw = angular.module('ncjw-app', [ 'ngRoute' ]);

ncjw.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "home.html",
		controller : "homeCtrl"
	}).when("/donor_search", {
		templateUrl : "donor_search.html",
		controller:"donorCtrl"
	}).when("/itemize/:cid/:uid", {
		templateUrl : "itemize.html",
		controller : "itemizeCtrl"

	}).when("/send_report/:type/:uid", {
		templateUrl : "send_report.html",
		controller : "reportCtrl"

	}).when("/add_price", {
		templateUrl : "add_price.html"
	});
});


ncjw.service('userService', function() {
	  var userData = {};

	  var setUserData = function(newObj) {
		  userData=newObj;
	  };

	  var getUserData = function(){
	      return userData;
	  };

	  return {
		  setUserData: setUserData,
		  getUserData: getUserData
	  };

	});


ncjw.controller('homeCtrl', function($scope, $http, $templateCache,
		$routeParams, $location, $route) {
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.$location = $location;
	$scope.toPath=0;
// $scope.staff_id=0;
	// $scope.tier3_selections=[]
	$scope.checkLogin = function(p) {
		$scope.toPath=p;
		$scope.staff_id_sess="";
		$http(
				{
					method : 'POST',
					url : 'http://localhost:3000/api/checkLogin',
					headers : {
						'Content-Type' : 'application/json'
					},
					data : {id:$scope.staff_id}
				}).then(function(res) {
					console.log(res);
					
					if(res.data.c==1){
						$scope.staff_id_sess=$scope.staff_id;
						console.log($scope.toPath);
						// if($scope.toPath==0){
							$location.url("/donor_search");
						// }
						// else{
						// $location.url("/itemize/1");
						// }
					}
					
			console.log(res.data.c);
		}, function(error) {

		});

		
	};
	


	

});


ncjw.controller('donorCtrl', function($scope, $http, $templateCache,
		$routeParams, $location, $route,userService) {
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.$location = $location;
	$scope.toPath=0;
	$scope.searchResults={};
	$scope.adding_user=false;
	$scope.current_user_data={};
	$scope.userData={};
	
	// $scope.tier3_selections=[]
	$scope.searchUser = function(p) {
		$scope.toPath=p;
		$http(
				{
					method : 'POST',
					url : 'http://localhost:3000/api/searchUser/',
					headers : {
						'Content-Type' : 'application/json'
					},
					data : {phone:$scope.search_key}
				}).then(function(res) {
					$scope.searchResults=res.data;
					$scope.adding_user=false;
			console.log($scope.searchResults);
		}, function(error) {

		});

		
	};
	
	$scope.addUser = function(goto) {
		if(goto==1){
		$http({
					method : 'POST',
					url : 'http://localhost:3000/api/addUser/',
					headers : {
						'Content-Type' : 'application/json'
					},
					data : $scope.userData
				}).then(function(res) {
					$scope.adding_user=false;

		}, function(error) {

		});
	}else if(goto==2){
		$http({
			method : 'POST',
			url : 'http://localhost:3000/api/addUser/',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : $scope.userData
		}).then(function(res) {
			$scope.adding_user=false;
			$location.url("/send_report/1/"+$scope.userData.id);

		}, function(error) {
		
		});
		}else if(goto==3){
			$http({
				method : 'POST',
				url : 'http://localhost:3000/api/addUser/',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : $scope.userData
			}).then(function(res) {
				$scope.adding_user=false;
				$location.url("/send_report/2/"+$scope.userData.id);
		}, function(error) {
		
		});
		}

		
	};
	
	$scope.addUserClick=function(){
		$scope.userData={};
		$scope.adding_user=true;
	}
	
	$scope.editUserClick=function(u){
		$scope.adding_user=true;
		$scope.userData=u;
	}
	
$scope.gotoItemized=function(u){
	userService.setUserData=u;
	$location.url("/itemize/1/"+u.id);
}
	


	

});

ncjw.controller('reportCtrl', function($scope, $http, $templateCache,
		$routeParams, $location, $route,userService) {
	
	$scope.$route = $route;
	$scope.$routeParams = $routeParams;
	$scope.$location = $location;
	$scope.userData={};
	$scope.type=$scope.$routeParams.type;
	$scope.amount="";
	$http(
			{
				method : 'GET',
				url : 'http://localhost:3000/api/getUserById/'
						+ $scope.$routeParams.uid,
				headers : {
					'Content-Type' : 'application/json'
				}
			}).then(function(res) {
				$scope.userData = res.data[0];
		
	}, function(error) {

	});
	$scope.setAmt=function(amt){
		$scope.amount=amt;
	}
	$scope.printDiv=function(divName) {
	     var printContents = document.getElementById(divName).innerHTML;
	     var originalContents = document.body.innerHTML;

	     document.body.innerHTML = printContents;

	     window.print();

	     document.body.innerHTML = originalContents;
	}
	
	
});

ncjw.controller('itemizeCtrl', function($scope, $http, $templateCache,
		$routeParams, $location, $route,userService) {
	$scope.currentTier = 0;
	$scope.$route = $route;
	$scope.data = {};
	$scope.selected = {};
	$scope.prices = {};
	$scope.pricesLoaded = false;
	$scope.selectedl = null;
	$scope.$routeParams = $routeParams;
	$scope.$location = $location;
	$scope.userData={};
	
	// $scope.tier3_selections=[]
	$scope.loadCategories = function() {
		$http(
				{
					method : 'GET',
					url : 'http://localhost:3000/api/getIData/'
							+ $scope.$routeParams.cid,
					headers : {
						'Content-Type' : 'application/json'
					}
				}).then(function(res) {
			$scope.data = res.data;
			console.log(res.data);
			if ($scope.data.length > 0) {
				$scope.currentTier = $scope.data[0].tier;
			}
		}, function(error) {

		});
		
		
		$http(
				{
					method : 'GET',
					url : 'http://localhost:3000/api/getUserById/'
							+ $scope.$routeParams.uid,
					headers : {
						'Content-Type' : 'application/json'
					}
				}).then(function(res) {
					$scope.userData = res.data[0];
			
		}, function(error) {

		});
		
		

		$http(
				{
					method : 'GET',
					url : 'http://localhost:3000/api/getParent/'
							+ $scope.$routeParams.cid,
					headers : {
						'Content-Type' : 'application/json'
					}
				}).then(function(res) {
			if (res.data.length > 0) {
				$scope.parent = res.data[0].parentId;
			}

		}, function(error) {
		});
	};
	$scope.loadCategories();

	// $scope.add_prices=function(){
	// console.log($scope.tier3_selections[0]);
	// }

	$scope.add_price = function() {

		$scope.cIdArray = [];
		angular.forEach($scope.data, function(d) {

			if (d.selected)
				$scope.cIdArray.push(d.id);
		});
		console.log($scope.cIdArray);
		$http({
			method : 'GET',
			url : 'http://localhost:3000/api/getPrices/' + $scope.cIdArray,
			headers : {
				'Content-Type' : 'application/json'
			}
		}).then(function(res) {
			if (res.data.length > 0) {
				$scope.pricesLoaded = true;
				$scope.prices=res.data[0]
				
// $scope.prices.push(res.data[0].price2);
// $scope.prices.push(res.data[0].price3);
// $scope.prices.push(0);
			}

		}, function(error) {
		});

		// window.location.href =
		// "#!add_price/"+$scope.$routeParams.cid+","+$scope.cIdArray
	}
	
	$scope.showPrice=function(p){
		$scope.finalPrice=p;
	}
	
	$scope.saveItemized=function(goto){
// console.log($scope.finalPrice);
// console.log($scope.userData);
// console.log($scope.prices);
		
		var donationData={user_id:$scope.userData.id,price_id:$scope.prices.id,price:$scope.finalPrice};
		console.log(donationData);
		if(goto==1){
		$http({
			method : 'POST',
			url : 'http://localhost:3000/api/saveUserDonation/',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : donationData
		}).then(function(res) {
			$location.url("/itemize/1/"+$scope.userData.id);
		}, function(error) {
		
		});
		}else if(goto==2){
			$http({
				method : 'POST',
				url : 'http://localhost:3000/api/saveUserDonation/',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : donationData
			}).then(function(res) {
				$location.url("/donor_search");
			}, function(error) {
			
			});
		}
		
	}

});