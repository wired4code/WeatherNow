var app = angular.module('myApp', ['ngRoute', 'ngResource']);

// routes
app.config(function($routeProvider){

  $routeProvider
    .when('/forecast', {
      templateUrl: 'pages/forecast.html',
      controller: 'mainController'
    })

    .when('/forecast/:zip', {
      templateUrl: 'pages/forecast.html',
      controller: 'mainController'
    })

});

app.service('zipService', function(){
  this.zipcode = 48104;
});


// controller
app.controller('mainController', ['$scope', 'zipService', '$resource', '$routeParams', function($scope, zipService, $resource, $routeParams){

  //$scope.zipcode = zipService.zipcode;
  $scope.zip = $routeParams.zip;

  //console.log('zip code entered is', $scope.zip)

  $scope.zip = zipService.zip;

  $scope.$watch('zipcode', function(){
    zipService.zipcode = $scope.zipcode;
  });

  /*$scope.getCity = function(){
    console.log('click')
    console.log('zip code is ' + $scope.zipCity)
  };*/

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/weather?zip="+$scope.zipcode+",us&appid=d6dbfbaff7932cf4fe546adbf96d084d", {callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});

  /*+zipService.zip+*/

  $scope.result = $scope.weatherAPI.get({zip:$scope.zip});

  //console.log($scope.result);

}]);








