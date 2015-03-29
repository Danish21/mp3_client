// var demoApp = angular.module('demoApp', ['demoControllers']);

// var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices']);

// demoApp.config(['$routeProvider', function($routeProvider) {
//   $routeProvider.
//     when('/firstview', {
//     templateUrl: 'partials/firstview.html',
//     controller: 'FirstController'
//   }).
//   when('/secondview', {
//     templateUrl: 'partials/secondview.html',
//     controller: 'SecondController'
//   }).
//   when('/settings', {
//     templateUrl: 'partials/settings.html',
//     controller: 'SettingsController'
//   }).
//   when('/llamalist', {
//     templateUrl: 'partials/llamalist.html',
//     controller: 'LlamaListController'
//   }).
//   otherwise({
//     redirectTo: '/settings'
//   });
// }]);
///Editing

var taskApp = angular.module('taskApp', ['ngRoute', 'appControllers', 'appServices']);

taskApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/Users', {
    templateUrl: 'partials/Users.html',
    controller: 'UserController'
  }).
  when('/Users/:UserId', {
        templateUrl: 'partials/UserDetails.html',
        controller: 'UserDetailController'
  }).
  when('/Tasks', {
    templateUrl: 'partials/tasks.html',
    controller: 'TaskController'
  }).
  when('/Tasks/:TaskId', {
        templateUrl: 'partials/TaskDetails.html',
        controller: 'TaskDetailController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/AddUser', {
    templateUrl: 'partials/AddUser.html',
    controller: 'AddUserController'
  }).
  when('/AddTask', {
    templateUrl: 'partials/AddTask.html',
    controller: 'AddTaskController'
  }).
  when('/EditTask/:TaskId', {
    templateUrl: 'partials/EditTask.html',
    controller: 'EditTaskController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);