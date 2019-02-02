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


// ROOT
app.config(($routeProvider) => {

    $routeProvider
        .when('/', {templateUrl: './views/home.html', controller: 'HomeCtrl'})
        .when('/albums', {templateUrl: './views/albums.html', controller: 'AlbumsCtrl'})
        .when('/albums/:id', {templateUrl: './views/album.html', controller: 'AlbumCtrl'})
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

    $scope.test = {
        id: 'sahdgfhajlskd'
    }

    $scope.merde = 'ehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhf';
});

// Zoom sur un album
app.controller('AlbumCtrl', function ($scope, $http, $routeParams) {

    $scope.id = $routeParams.id;
});