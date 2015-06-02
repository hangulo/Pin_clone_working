var app = angular.module('blog',['ngRoute']);

app.controller("blogCtrl", function() {

       this.message = "Am I working??!"
       this.name = "Hector"
       this.styling= "label"
       this.list_of_names = "Name1, Name2, Name3"


       });

app.config(function($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: 'Partials/index.html'
            })

});
