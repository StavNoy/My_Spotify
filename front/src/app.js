const app = angular.module('MySpotify', ['ngRoute']);


// ROUTE
app.config(($routeProvider) => {

    $routeProvider
        .when('/home', {templateUrl: './views/home.html', controller: 'HomeCtrl'})
        // album routes
        .when('/albums', {templateUrl: './views/albums.html', controller: 'AlbumsCtrl'})
        .when('/album/:id', {templateUrl: './views/album.html', controller: 'AlbumCtrl'})
        // artist route
        .when('/artists', {templateUrl: './views/artists.html', controller: 'ArtistsCtrl'})
        .when('/artist/:id', {templateUrl: './views/artist.html', controller: 'ArtistCtrl'})
        // genre routes
        .when('/genres', {templateUrl: './views/genres.html', controller: 'GenresCtrl'})
        .when('/genre/:id', {templateUrl: './views/genre.html', controller: 'ResultCtrl'})

        .when('/result', {templateUrl: './views/result.html', controller: 'ResultCtrl'})
        .otherwise({redirectTo : '/home'});
});


// CONTROLLER


// Header nav 
app.controller('HeaderNavCtrl', function ($scope, $http) {

    $http({
        method: 'GET',
        url: `../back/reception.php?request=genres`
    }).then(function successCallback(res) {
        $scope.genres = res.data.data;
    });

	let storage = null;

	$scope.search = () => {

	};
});

// Home page
app.controller('HomeCtrl', function ($scope, $http) {

    $http({
        method: 'GET',
        url: `../back/reception.php?request=albums&start=random&limit=8`
    }).then(function successCallback(res) {
        $scope.random = res.data.data;
    });
});

// List album
app.controller('AlbumsCtrl', function ($scope, $http) {

	$scope.start = 0;
	$scope.limit = 10;
	$scope.more = true;
	$scope.albums = [];

	$scope.loadRes = () => {
		$http({
			method: 'GET',
			url: `../back/reception.php?request=albums&limit=${$scope.limit}&start=${$scope.start}`
		}).then(function successCallback(res) {
			$scope.albums = res.data.status === 200 ? $scope.albums.concat(res.data.data) : null;
			if (! ($scope.albums.length % $scope.limit)) {
				$scope.start += $scope.limit;
			} else {
				$scope.more = false;
			}
		});
	};

	$scope.loadRes();

});

// Zoom sur un album
app.controller('AlbumCtrl', function ($scope, $http, $routeParams) {

    $http({
        method: 'GET',
        url: `../back/reception.php?request=albums&id=${$routeParams.id}`
    }).then(function successCallback(res) {
        $scope.album = res.data.data;
    }); 
});

// List artist
app.controller('ArtistsCtrl', function ($scope, $http) {


	$scope.start = 0;
	$scope.limit = 10;
	$scope.more = true;
	$scope.artists = [];

	$scope.loadRes = () => {
		$http({
			method: 'GET',
			url: `../back/reception.php?request=artistes&limit=${$scope.limit}&start=${$scope.start}`
		}).then(function successCallback(res) {
			$scope.artists = res.data.status === 200 ? $scope.artists.concat(res.data.data) : null;
			if (! ($scope.albums.length % $scope.limit)) {
				$scope.start += $scope.limit;
			} else {
				$scope.more = false;
			}
		});
	};

	$scope.loadRes();

});

// Zoom sur un artist
app.controller('ArtistCtrl', function ($scope, $http, $routeParams) {
    
    $http({
        method: 'GET',
        url: `../back/reception.php?request=artistes&id=${$routeParams.id}`
    }).then(function successCallback(res) {
        $scope.artist = res.data.data;
    });
});

// List genres
app.controller('GenresCtrl', function ($scope, $http) {

    $http({
        method: 'GET',
        url: `../back/reception.php?request=genres`
    }).then(function successCallback(res) {
        $scope.genres = res.data.data;
    });
});

// Zoom sur un genre
app.controller('GenreCtrl', function ($scope, $http, $routeParams) {

    
});

// Result search
app.controller('ResultCtrl', function ($scope, $http, $routeParams) {

	console.log($http);

	$scope.start = 0;
	$scope.limit = 10;
	$scope.more = true;
	$scope.artists = [];
	$scope.albums = [];
	$scope.tracks = [];

	function whichArr(str) {
		switch (str) {
			case 'artists':
				return $scope.artists;
			case 'albums':
				return $scope.albums;
			case 'tracks':
				return $scope.tracks;
		}
	}

	$scope.loadRes = () => {
		$http({
			method: 'GET',
			url: `../back/reception.php?request=search&&limit=${$scope.limit}&start=${$scope.start}&${$routeParams}`,
		}).then(function successCallback(res) {
			if (res.data.status === 200) {
				let resArr = whichArr(res.data.type);
				resArr.push(...res.data.data);
				if (! (res.length % $scope.limit)) {
					$scope.start += $scope.limit;
				} else {
					$scope.more = false;
				}
			}
		});
	};

	$scope.loadRes();


});
