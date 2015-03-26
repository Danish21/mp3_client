var appControllers = angular.module('appControllers', []);

appControllers.controller('UserController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);

appControllers.controller('TaskController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);


appControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  // $scope.url = $window.sessionStorage.baseurl;

  // $scope.setUrl = function(){
  //   $window.sessionStorage.baseurl = $scope.url; 
  //   $scope.displayText = "URL set";

  // };

}]);
appControllers.controller('AddUserController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {




}]);

appControllers.controller('AddTaskController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {




}]);




//original//////////////////////////////////////////////////////////
// var demoControllers = angular.module('demoControllers', []);

// demoControllers.controller('FirstController', ['$scope', 'CommonData'  , function($scope, CommonData) {
//   $scope.data = "";
//    $scope.displayText = ""

//   $scope.setData = function(){
//     CommonData.setData($scope.data);
//     $scope.displayText = "Data set"

//   };

// }]);

// demoControllers.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
//   $scope.data = "";

//   $scope.getData = function(){
//     $scope.data = CommonData.getData();

//   };

// }]);


// demoControllers.controller('LlamaListController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

//   Llamas.get().success(function(data){
//     $scope.llamas = data;
//   });


// }]);

// demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
//   $scope.url = $window.sessionStorage.baseurl;

//   $scope.setUrl = function(){
//     $window.sessionStorage.baseurl = $scope.url; 
//     $scope.displayText = "URL set";

//   };

// }]);


