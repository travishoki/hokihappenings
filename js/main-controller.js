

var app = angular.module('APP', ['ui.router','ngFlowGrid'])
.controller("mainCtrl", function($scope, $http){

	$scope.init = function(){
		$scope.getGalleries();
	};//init

	$scope.getGalleries = function(){
		$http.get('api/?cmd=get-galleries').
		then(function(response) {
			$scope.sectionItems = response.data;
		});
	};//getGalleries

	$scope.init();

})
.controller("homeCtrl", function($scope, $state){

	$scope.init = function(){
		$scope.list_view = false;
	};//init

	$scope.clickItem = function(item){
		$state.go('gallery', {slug: item.slug});
	};//clickItem

	$scope.init();

})
.directive('lazy', function($timeout) {
	return {
	  restrict: 'C',
	  link: function (scope, elm) {
	    $timeout(function() {
	      $(elm).lazyload({
	        effect: 'fadeIn',
	        effectspeed: 500,
	        'skip_invisible': false
	      });
	    }, 0);
	  }
	};
})
.controller("galleryCtrl", function($scope, $stateParams, $http, gallery_images){
	$scope.gallery = gallery_images.data;
})
.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "partials/home.html",
      controller: "homeCtrl"
    })
    .state('gallery', {
      url: "/gallery/:slug",
      templateUrl: "partials/gallery.html",
      controller: "galleryCtrl",
      resolve: {
  		gallery_images: function($stateParams, $http){
			var promise = $http.get('api/?cmd=get-gallery&slug='+$stateParams.slug)
			.then(function(data) {
				 return data;
			});
			return promise;
  		}
      }
    });
});










