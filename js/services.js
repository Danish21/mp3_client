// js/services/todos.js
// angular.module('demoServices', [])
//         .factory('CommonData', function(){
//         var data = "";
//         return{
//             getData : function(){
//                 return data;
//             },
//             setData : function(newData){
//                 data = newData;                
//             }
//         }
//     })
//     .factory('Llamas', function($http, $window) {      
//         return {
//             get : function() {
//                 var baseUrl = $window.sessionStorage.baseurl;
//                 return $http.get(baseUrl+'/api/llamas');
//             }
//         }
//     })
//     ;

var appServices = angular.module('appServices',[]);

appServices.service('edittingTask', function($http){

    var edittingTask = this;

    edittingTask.taskId= "";

});

appServices.service('global', function($http){

    var global = this;

    global.baseurl= "http://www.uiucwp.com:4000/api";

});

appServices.factory('CommonData', function($http) {
   return {
     get: function(url, callback) {
       $http.get(url).success(callback);
       // $http.get('http://www.uiucwp.com:4000/api/users').success(callback);
     },
     set: function(url,data,callback,errorFunction){
        $http.post(url,data).success(callback).error(errorFunction);
       // $http.post('http://www.uiucwp.com:4000/api/users',userData).success(callback);
     },
     remove: function(url,callback){
        $http.delete(url).success(callback); 
        // 'http://www.uiucwp.com:4000/api/users/'
     },
     edit: function(url, newdata, callback, errorFunction){
        $http.put(url, newdata).success(callback).error(errorFunction);;
        // $http.put('http://www.uiucwp.com:4000/api/tasks/' + id, newdata).success(callback);
     }
   }
});

