var app = angular.module('blog',['ngRoute']);


app.config(function($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: 'Partials/index.html'
                //controller: 'HomeController' //Why doesnt like this? have to put in html?!
            })
            .when('/about',
            {
                templateUrl: 'Partials/about.html'
            })
            .when('/pin',
            {
                templateUrl: 'Partials/pin.html'
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

app.controller("AppCtrl", function($http) {
    var app = this;

    $http.get("/api/pin").success(function(data)
    {
        app.pins = data.objects;

    });

    app.addPin= function () {
        $http.post("api/pin", {"title":"new", "image":"http://placekitten.com/200/200/?image="+ app.pins.length})
            .success(function(data){
                app.pins.push(data);
            })
    };

    app.addPinRandom= function () {
        $http.post("api/pin", {"title":"new", "image":"http://randomimage.setgetgo.com/get.php"})
            .success(function(data){
                app.pins.push(data);
            })
    };

    app.deletePin = function(pin) {
        $http.delete("/api/pin/"+ pin.id).success(function(response){
            app.pins.splice(app.pins.indexOf(pin), 1);
        })
    };

    app.updatePin = function(pin){
        $http.put("/api/pin/"+ pin.id,pin);

    }

});