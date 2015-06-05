var app = angular.module('blog',['ngRoute']);


app.config(function($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: 'Partials/index.html', //Dont forget this comma... duh!
                controller: 'HomeController'
            })
            .when('/about',
            {
                templateUrl: 'Partials/about.html',
                controller: 'AboutController'
            })
            .when('/pin',
            {
                templateUrl: 'Partials/pin.html',
                controller: 'AppCtrl'
            })
            .otherwise(
            {
                redirectTo: '/'
            })

});


app.controller('HomeController', function($scope){
    $scope.blogposts = [
        'Item #1',
        'Item #2',
        'Item #3',
    ]
});

app.controller('AboutController', function($scope){
    $scope.name = "Hector Angulo"
    $scope.bio = "I am Head of Product and I love working with Angular.js!"

    console.log($scope);
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