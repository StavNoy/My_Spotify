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
});

// Home page
app.controller('HomeCtrl', function ($scope, $http) {

    $http({
        method: 'GET',
        url: `../back/reception.php?request=albums&start=random&limit=4`
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

    let song = null;

    $scope.musicPlayer = (action ,songUrl = null) => {
        
        if (action === 'play' && songUrl !== null) {
            if (song !== null) {
                song.pause();
                song.currentTime = 0;
                song = null;
            }
            song = new Audio(songUrl);
            song.play();
        }
        if (action === 'pause' && song) {
            song.pause();
        }
        if (action === 'stop' && song) {
            song.pause();
            song.currentTime = 0;
        }

    }
});

// List artist
app.controller('ArtistsCtrl', function ($scope, $http) {


});

// Zoom sur un artist
app.controller('ArtistCtrl', function ($scope, $http, $routeParams) {
    
    $http({
        method: 'GET',
        url: `../back/reception.php?request=artistes&id=${$routeParams.id}`
    }).then(function successCallback(res) {
        $scope.artist = res.data.data;
        console.log(res.data.data);
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

	$http({
		method: 'GET',
		url: `../back/reception.php?request=search${$routeParams}`,
	}).then(function successCallback(res) {
		$scope.results = res.data.data;
	});

});
