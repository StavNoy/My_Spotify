const app = angular.module('MySpotify', ['ngRoute']);


// ROUTE
app.config(($routeProvider) => {

    $routeProvider
        .when('/', {templateUrl: './views/home.html', controller: 'HomeCtrl'})
        .when('/albums', {templateUrl: './views/albums.html', controller: 'AlbumsCtrl'})
        .when('/album/:id', {templateUrl: './views/album.html', controller: 'AlbumCtrl'})
        .when('/artist/:id', {templateUrl: './views/artist.html', controller: 'ArtistCtrl'})
        .otherwise({redirectTo : '/'});
});


// CONTROLLER


// Header nav 
app.controller('HeaderNavCtrl', function ($scope, $http) {


});

// Home page
app.controller('HomeCtrl', function ($scope, $http) {

    
});

// List de tout les album
app.controller('AlbumsCtrl', function ($scope, $http) {

    
});

// Zoom sur un album
app.controller('AlbumCtrl', function ($scope, $http, $routeParams, AlbumFac) {

    
});

// Zoom sur un artist
app.controller('ArtistCtrl', function ($scope, $http, $routeParams) {

    const url = `../back/reception.php?request=artistes&id=${$routeParams.id}`;

    $http({
        method: 'GET',
        url: url
    }).then(function successCallback(res) {
        $scope.artist = res.data.data;
        console.log(res.data.data);
    });
});


app.factory('AlbumFac', () => {

    return {

        getAlbums: (id) => {

            $http({
                method: 'GET',
                url: `../back/reception.php?request=albums&id=${$routeParams.id}`
            }).then(function successCallback(res) {
                return res.data.data;
                console.log(res.data.data);
            });
        }        
    }
});