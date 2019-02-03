/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const app = angular.module('MySpotify', ['ngRoute']);\n\n\n// ROUTE\napp.config(($routeProvider) => {\n\n    $routeProvider\n        .when('/', {templateUrl: './views/home.html', controller: 'HomeCtrl'})\n        // album routes\n        .when('/albums', {templateUrl: './views/albums.html', controller: 'AlbumsCtrl'})\n        .when('/album/:id', {templateUrl: './views/album.html', controller: 'AlbumCtrl'})\n        // artist route\n        .when('/artists', {templateUrl: './views/artists.html', controller: 'ArtistsCtrl'})\n        .when('/artist/:id', {templateUrl: './views/artist.html', controller: 'ArtistCtrl'})\n        // genre routes\n        .when('/genres', {templateUrl: './views/genres.html', controller: 'GenresCtrl'})\n        .when('/genre/:id', {templateUrl: './views/genre.html', controller: 'GenreCtrl'})\n\n        .when('/result', {templateUrl: './views/result.html', controller: 'ResultCtrl'})\n        .otherwise({redirectTo : '/'});\n});\n\n\n// CONTROLLER\n\n\n// Header nav \napp.controller('HeaderNavCtrl', function ($scope, $http) {\n\n\n});\n\n// Home page\napp.controller('HomeCtrl', function ($scope, $http) {\n\n    $http({\n        method: 'GET',\n        url: `../back/reception.php?request=albums&start=random&limit=8`\n    }).then(function successCallback(res) {\n        $scope.random = res.data.data;\n        console.log($scope.random);\n    });\n});\n\n// List album\napp.controller('AlbumsCtrl', function ($scope, $http) {\n\n\n});\n\n// Zoom sur un album\napp.controller('AlbumCtrl', function ($scope, $http, $routeParams) {\n\n    $http({\n        method: 'GET',\n        url: `../back/reception.php?request=albums&id=${$routeParams.id}`\n    }).then(function successCallback(res) {\n        $scope.album = res.data.data;\n    }); \n});\n\n// List artist\napp.controller('ArtistsCtrl', function ($scope, $http) {\n\n\n});\n\n// Zoom sur un artist\napp.controller('ArtistCtrl', function ($scope, $http, $routeParams) {\n    \n    $http({\n        method: 'GET',\n        url: `../back/reception.php?request=artistes&id=${$routeParams.id}`\n    }).then(function successCallback(res) {\n        $scope.artist = res.data.data;\n        console.log(res.data.data);\n    });\n});\n\n// List artist\napp.controller('GenresCtrl', function ($scope, $http) {\n\n\n});\n\n// Zoom sur un artist\napp.controller('GenreCtrl', function ($scope, $http, $routeParams) {\n\n    \n});\n\n// Result search\napp.controller('ResultCtrl', function ($scope, $http) {\n\n\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });