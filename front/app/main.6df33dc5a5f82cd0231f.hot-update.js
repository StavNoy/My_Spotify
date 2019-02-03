webpackHotUpdate("main",{

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const app = angular.module('MySpotify', ['ngRoute']);\n\n\n// ROUTE\napp.config(($routeProvider) => {\n\n    $routeProvider\n        .when('/', {templateUrl: './views/home.html', controller: 'HomeCtrl'})\n        .when('/albums', {templateUrl: './views/albums.html', controller: 'AlbumsCtrl'})\n        .when('/album/:id', {templateUrl: './views/album.html', controller: 'AlbumCtrl'})\n        .when('/artist/:id', {templateUrl: './views/artist.html', controller: 'ArtistCtrl'})\n        .otherwise({redirectTo : '/'});\n});\n\n\n// CONTROLLER\n\n\n// Header nav \napp.controller('HeaderNavCtrl', function ($scope, $http) {\n\n\n});\n\n// Home page\napp.controller('HomeCtrl', function ($scope, $http) {\n\n    \n});\n\n// List de tout les album\napp.controller('AlbumsCtrl', function ($scope, $http) {\n\n    \n});\n\n// Zoom sur un album\napp.controller('AlbumCtrl', function ($scope, $http, $routeParams, AlbumFac) {\n\n    console.log(AlbumFac.getAlbums($routeParams.id))\n});\n\n// Zoom sur un artist\napp.controller('ArtistCtrl', function ($scope, $http, $routeParams) {\n\n    const url = `../back/reception.php?request=artistes&id=${$routeParams.id}`;\n\n    $http({\n        method: 'GET',\n        url: url\n    }).then(function successCallback(res) {\n        $scope.artist = res.data.data;\n        console.log(res.data.data);\n    });\n});\n\n\napp.factory('AlbumFac', ($http) => {\n\n    return {\n\n        getAlbums: function (id) {\n\n            $http({\n                method: 'GET',\n                url: `../back/reception.php?request=albums&id=${$routeParams.id}`\n            }).then(function successCallback(res) {\n                return res.data.data;\n            });\n        }        \n    }\n});\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

})