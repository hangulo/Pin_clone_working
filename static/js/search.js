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
    $scope.size = "10";
    $scope.query = "*";
    $scope.facet_to_filter="tag"

    $scope.facet_search = function () {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + "aGVjdG9yOmhlY3Rvcg==";
               "http://<account>.loggly.com/apiv2/fields/syslog.host/"

        $http.get("https://sample.loggly.com/apiv2/fields/"+$scope.facet_to_filter+"/?q=*&from=-10m&until=now&facet_size=2000")
                .success(function (data) {
                    $scope.facet_values = data[$scope.facet_to_filter];
        });
        console.log("test: facet_search for: "+$scope.facet_to_filter);

    };

    $scope.search= function () {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + "aGVjdG9yOmhlY3Rvcg==";
        $http.get("https://sample.loggly.com/apiv2/search?q=" + $scope.query +
            "&from=-3h&until=now&order=asc&size=" + $scope.size).success(function (data) {
            $scope.rsid = data['rsid']['id'];
        }).success(function (data) {
            $http.get("https://sample.loggly.com/apiv2/events?rsid=" + $scope.rsid).success(function (data) {
                $scope.results = data.events;
                $scope.total_events = data.total_events;


            })
        }).success(function (data) {

            $http.get("https://sample.loggly.com/apiv2/fields?q=*&from=-10m&until=now&facet_size=2000")
                .success(function (data)
            {

                $scope.facets = data.fields;
                $scope.facets_num = data.fields.length;
                $scope.date_from = data.rsid.date_from;
                $scope.date_to = data.rsid.date_to;



            })

        })
    };

    $scope.sizeInBytes = function(str) {
        var m = encodeURIComponent(str).match(/%[89ABab]/g);
        return str.length + (m ? m.length : 0);
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
    $scope.logtest = function() {
        console.log("test");
        $scope.count = $scope.count + 1;
    };


    $scope.currentPath = $location.path();
    $scope.name = "Hector";
    $scope.events_MB = "0";
    $scope.count = 0;

});
