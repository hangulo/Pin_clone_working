var app = angular.module('search',['ngRoute']);


app.config(function($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: 'Partials/Tables.html', //Dont forget this comma... duh!
                controller: 'SearchController'
            })
            .when('/table',
            {
                templateUrl: 'Partials/search.html',
                controller: 'SearchController'
            })
            .otherwise(
            {
                redirectTo: '/'
            })

});


app.controller('SearchController', function($scope, $http){
   $scope.init = function (settings) {
      settings = window[settings];
       $scope.json = settings;
       angular.extend($scope, settings);
      console.log("$scope below:")
      console.log($scope); //2
   };


    $scope.searchresults = [
        'Item #1',
        'Item #2',
        'Item #3',
    ];

    $scope.name = "Hector";

});
