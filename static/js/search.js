var app = angular.module('search',['ngRoute']);


app.config(function($routeProvider) {
        $routeProvider
            .when('/full',
            {
                templateUrl: 'Partials/search/full_events.html', //Dont forget this comma... duh!
                controller: 'SearchController'
            })
            .when('/facets',
            {
                templateUrl: 'Partials/search/facets.html',
                controller: 'SearchController'
            })
            .when('/',
            {
                templateUrl: 'Partials/search/table.html',
                controller: 'SearchController'
            })
            .when('/table',
            {
                templateUrl: 'Partials/search/table.html',
                controller: 'SearchController'
            })
            .otherwise(
            {
                redirectTo: '/'
            })

});


app.controller('SearchController', function($scope, $http, $location){

    $scope.searchresults = [
        'Item #1',
        'Item #2',
        'Item #3',
    ];

    $scope.size = "10"
    $scope.query = "*"

    $scope.search= function () {
        console.log("You Searched!");

        $http.defaults.headers.common['Authorization'] = 'Basic ' + "aGVjdG9yOmhlY3Rvcg==";
        $http.get("https://sample.loggly.com/apiv2/search?q="+$scope.query+
            "&from=-10m&until=now&order=asc&size="+$scope.size).success(function(data)
    {
        $scope.rsid=data['rsid']['id'];
    }).success(function(data){
         console.log($scope.rsid)


        $http.get("https://sample.loggly.com/apiv2/events?rsid="+$scope.rsid).success(function(data)
        {
        console.log(data)
        $scope.results = data.events;

        })
        })
    };

    $scope.isPath = function(path) {
    if ($location.path() === path) {
        return true;
    } else {
        return false;
    }
    };

    $scope.getClass = function(path) {
    if ($location.path() === path) {
        return "active";
    } else {
        return "";
    }
    };


    $scope.currentPath = $location.path();
    $scope.name = "Hector";
    $scope.total = "0";
    $scope.events_num = "0"
    $scope.facets_num = "0";
    $scope.events_MB = "0";
    $scope.facets = ["a","b","c","d","e","f","g","h"];
    console.log($scope);

});
