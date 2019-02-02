// rooter.get('url/albums/:id')

// url = `api.url/reception.php?request=albums&random=10`;

// $.ajax({
//     type: "GET",
//     url: url,
//     dataType: "json",

//     success: function (res) {
        
//     }
// });

const app = angular.module('MySpotify', ['ngRoute']);

app.config(($routeProvider) => {

    $routeProvider
        .when('/', {templateUrl: './views/home.html'})
        .when('/albums', {templateUrl: './views/albums.html'})
        .otherwise({redirectTo : '/'});
});

