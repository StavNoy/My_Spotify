// rooter.get('url/albums/:id')

// url = `api.url/reception.php?request=albums&start=random&limit=10`;

// $.ajax({
//     type: "GET",
//     url: url,
//     dataType: "json",

//     success: function (res) {
        
//     }
// });

const app = angular.module('MySpotify', ['ngRoute']);


// ROUTE
app.config(($routeProvider) => {

    $routeProvider
        .when('/', {templateUrl: './views/home.html', controller: 'HomeCtrl'})
        .when('/albums', {templateUrl: './views/albums.html', controller: 'AlbumsCtrl'})
        .when('/album/:id', {templateUrl: './views/album.html', controller: 'AlbumCtrl'})
        .otherwise({redirectTo : '/'});
});


// CONTROLLER


// Header nav 
app.controller('HeaderNavCtrl', function ($scope, $http) {



});

// Home page
app.controller('HomeCtrl', function ($scope, $http) {

	const url = `../back/reception.php?request=albums&start=random`;

	$http({
		method: 'GET',
		url: url
	}).then(function successCallback(res) {
		$scope.album = res.data.data;
	});

});

// List de tout les album
app.controller('AlbumsCtrl', function ($scope, $http) {

	const url = `../back/reception.php?request=albums`;

	$http({
		method: 'GET',
		url: url
	}).then(function successCallback(res) {
		$scope.album = res.data.data;
	});
    
});

// Zoom sur un album
app.controller('AlbumCtrl', function ($scope, $http, $routeParams) {

    const url = `../back/reception.php?request=albums&id=${$routeParams.id}`;

    $http({
        method: 'GET',
        url: url
    }).then(function successCallback(res) {
        $scope.album = res.data.data;
    });
});