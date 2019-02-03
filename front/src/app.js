const app = angular.module('MySpotify', ['ngRoute']);


// ROUTE
app.config(($routeProvider) => {

    $routeProvider
        .when('/', {templateUrl: './views/home.html', controller: 'HomeCtrl'})
        // album routes
        .when('/albums', {templateUrl: './views/albums.html', controller: 'AlbumsCtrl'})
        .when('/album/:id', {templateUrl: './views/album.html', controller: 'AlbumCtrl'})
        // artist route
        .when('/artists', {templateUrl: './views/artists.html', controller: 'ArtistsCtrl'})
        .when('/artist/:id', {templateUrl: './views/artist.html', controller: 'ArtistCtrl'})
        // genre routes
        .when('/genres', {templateUrl: './views/genres.html', controller: 'GenresCtrl'})
        .when('/genre/:id', {templateUrl: './views/genre.html', controller: 'GenreCtrl'})

        .when('/result', {templateUrl: './views/result.html', controller: 'ResultCtrl'})
        .otherwise({redirectTo : '/'});
});


// CONTROLLER


// Header nav 
app.controller('HeaderNavCtrl', function ($scope, $http) {


});

// Home page
app.controller('HomeCtrl', function ($scope, $http) {

    $http({
        method: 'GET',
        url: `../back/reception.php?request=albums&start=random&limit=8`
    }).then(function successCallback(res) {
        $scope.random = res.data.data;
        console.log($scope.random);
    });
});

// List album
app.controller('AlbumsCtrl', function ($scope, $http) {


});

// Zoom sur un album
app.controller('AlbumCtrl', function ($scope, $http, $routeParams) {

    $http({
        method: 'GET',
        url: `../back/reception.php?request=albums&id=${$routeParams.id
    }).then(function successCallback(res) {
        $scope.album = res.data.data;
    }); 
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

// List artist
app.controller('GenresCtrl', function ($scope, $http) {


});

// Zoom sur un artist
app.controller('GenreCtrl', function ($scope, $http, $routeParams) {

    
});

// Result search
app.controller('ResultCtrl', function ($scope, $http) {


});
