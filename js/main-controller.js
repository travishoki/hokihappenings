var sectionItems = [
	{
		id: 1,
		title: 'Junior Prom',
		date: 'May 2008',
		image: 'prom-2008.png',
		url: 'prom-2008',
		gallery: true
	},
	{
		id: 8,
		title: 'Picture Date',
		date: '2008',
		image: 'picture-date.png',
		url: 'picture-date',
		gallery: true
	},
	{
		id: 9,
		title: 'Home Coming',
		date: '2008',
		image: 'home-coming.png',
		url: 'home-coming',
		gallery: true
	},
	{
		id: 10,
		title: 'Preference',
		date: '2009',
		image: 'preference.png',
		url: 'preference',
		gallery: true
	},
	{
		id: 3,
		title: 'Girl Prom',
		date: '2009',
		image: 'girl-prom.png',
		url: 'girl-prom',
		gallery: true
	},
	{
		id: 3,
		title: 'Senior Prom',
		date: 'May 2009',
		image: 'prom-2009.png',
		url: 'prom-2009',
		gallery: true
	},
	{
		id: 4,
		title: 'High School Graduation',
		date: 'May 2009',
		image: 'high-school-graduation.png',
		url: 'high-school-graduation',
		gallery: true
	},
	{
		id: 5,
		gallery: false,
		title: 'Wedding',
		date: 'June 6th, 2015',
		image: 'wedding.png',
		url: 'http://wedding.hokihappenings.com/',
		gallery: false
	},
	{
		id: 6,
		title: 'Save the Date',
		date: 'Dec 4th, 2014',
		image: 'save-the-date.png',
		url: 'http://wedding.hokihappenings.com/#/save-the-date',
		gallery: false
	},
	{
		id: 7,
		title: 'Proposal',
		date: 'Dec 4th, 2014',
		image: 'proposal.png',
		url: 'http://wedding.hokihappenings.com/#/proposal',
		gallery: false
	}
];


var app = angular.module('APP', ['ui.router','ngFlowGrid'])
.controller("mainCtrl", function($scope){
	$scope.sectionItems = sectionItems;
})
.controller("homeCtrl", function($scope, $state){
	$scope.clickItem = function(item){
		if(item.gallery){
			$state.go('gallery', {id: item.id});
		}else{
			window.open(item.url);
		}
	};//clickItem
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
	//console.log(gallery_images);
	$scope.gallery_images = gallery_images.data;
	console.dir($stateParams);
	for(var i in sectionItems){
		if(String(sectionItems[i].id) === $stateParams.id){
			$scope.sectionInfo = sectionItems[i];
			break;
		}
	}//for
})
.config(function($stateProvider, $urlRouterProvider) {
  //
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
      url: "/gallery/:id",
      templateUrl: "partials/gallery.html",
      controller: "galleryCtrl",
      resolve: {
  		gallery_images: function($stateParams, $http){
  			var gallery_info;
			for(var i = 0 ; i < sectionItems.length ; i++){
				if(String(sectionItems[i].id) === String($stateParams.id)){
					gallery_info = sectionItems[i];
					break;
				}
			}//for
			var promise = $http.get('api/?cmd=get-gallery&url='+gallery_info.url)
			.then(function(data) {
				 return data;
			});
			return promise;
  		}
      }
    });
});










