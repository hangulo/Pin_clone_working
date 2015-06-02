var app = angular.module('blog',['ngRoute']);


app.config(function($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: 'Partials/index.html'
                //controller: 'HomeController' //Why doesnt like this?
            })
            .when('/about',
            {
                templateUrl: 'Partials/about.html'
            })
            .otherwise(
            {
                redirectTo: '/'
            })

});


app.controller('HomeController', function($scope){
    $scope.blogposts = [
        'Blog post 1',
        'Blog post 2',
        'Blog post 3'
    ]
});