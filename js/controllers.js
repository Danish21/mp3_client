var appControllers = angular.module('appControllers', ['720kb.datepicker']);

appControllers.controller('SettingsController', ['$scope' , 'global', function($scope, global) {
 
    $scope.url = global.baseurl;
    $scope.setUrl = function(){
        global.baseurl = $scope.url;
        console.log(global.baseurl);
    };

}]);


appControllers.controller('UserController', ['$scope', '$http' , 'CommonData', 'global', function($scope, $http, CommonData, global) {
  
  $scope.refreshUsers = function(){
    $scope.getUsersUrl = global.baseurl + "/users" + "?select={'_id': 1, 'email': 1, 'name':1 }";
    CommonData.get($scope.getUsersUrl, function(response) {
            $scope.users = response.data;
    });

  }

  $scope.refreshUsers();

  $scope.deleteUser = function(id){

      console.log(id);
      $scope.deleteUserUrl = global.baseurl + "/users/"+id;

      CommonData.remove($scope.deleteUserUrl, function(response) {
            console.log(response);
            $scope.refreshUsers();
      });

  };

}]);

appControllers.controller('TaskController', ['$scope', '$http', 'CommonData','global', function($scope,$http,CommonData,global) {
    $scope.formData = {};

    $scope.formData.sortOrder = 1;

    $scope.formData.sortBy = "dateCreated";
   // $scope.orderFilter = true;
    // $scope.completedFilter = orderProp

    $scope.completedFilter = '?where={"completed": true}';
    $scope.sortByFilter = " ?where{ $orderby: { dateCreated : -1 } }"
    // $scope.completedFilter = '?where={"completed": true}';
    // $orderby: { age : -1 } }
    $scope.refreshTasks = function(){
        $scope.sortByFilter = '&sort={' + $scope.formData.sortBy + ':' + $scope.formData.sortOrder + '}'; 

        $scope.getTasksUrl = global.baseurl + "/tasks" + $scope.completedFilter + $scope.sortByFilter ;
         
        console.log($scope.getTasksUrl);
        CommonData.get( $scope.getTasksUrl,function(response) {
            $scope.tasks = response.data;
            console.log(response.data);
        });
          //
    };

    $scope.refreshTasks();

    $scope.deleteTask= function(id){
        $scope.deleteUserUrl = global.baseurl + "/tasks/"+id;

        CommonData.remove($scope.deleteUserUrl, function(response){
          console.log(response);
          $scope.refreshTasks();
        })

    };


    $scope.setCompletedFalse = function(){
       $scope.completedFilter = '?where={"completed": false}';
       $scope.refreshTasks();
    };

    $scope.setCompletedTrue = function(){
      $scope.completedFilter = '?where={"completed": true}';
      $scope.refreshTasks();
    };

    $scope.setEmptyCompletedFilter =  function(){
      $scope.completedFilter = '?';
      $scope.refreshTasks();
    };

    $scope.setDescending = function(){
        $scope.formData.sortOrder = -1;
        $scope.refreshTasks();
    }

    $scope.setAscending = function(){
        $scope.formData.sortOrder = 1;
        $scope.refreshTasks();
    }

    $scope.$watch('formData.sortBy', function() {
      $scope.refreshTasks();
    });



}]);



appControllers.controller('AddUserController', ['$scope', '$http', 'CommonData', 'global', function($scope, $http, CommonData, global) {

     $scope.AddUserUrl = global.baseurl + "/users";
     $scope.messageSet = false;
     $scope.responseClass = "success";
     $scope.addUser = function(){

          $scope.newEntry = {
             name: $scope.name,
             email: $scope.email
          }

          CommonData.set($scope.AddUserUrl,$scope.newEntry,function(response) {
              console.log(response);
              $scope.name = "";
              $scope.email = "";
              $scope.message = response.message;
              $scope.messageSet = true;
              $scope.responseClass = "success";
          },

          function(error){
            console.log(error);
            $scope.message = error.message;
            $scope.messageSet = true;
            $scope.responseClass = "alert";
          });
      
      };



}]);



appControllers.controller('AddTaskController', ['$scope', '$http', 'CommonData', 'global',   function($scope, $http, CommonData, global) {

    $scope.messageSet = false;
    $scope.responseClass = "success";

    $scope.getUsersUrl = global.baseurl + "/users";
    CommonData.get($scope.getUsersUrl, function(response) {
            $scope.users = response.data;
    });

   $scope.addTask = function(){
      
         $scope.newEntry = {
           name: $scope.name,
           description: $scope.description,
           deadline: $scope.date,
           completed: false,
           assignedUser: $scope.assignedUser._id,
           assignedUserName: $scope.assignedUser.name
        }

        
        
        $scope.addTaskUrl = global.baseurl + "/tasks";

        $scope.getUserUrl = global.baseurl + "/users/"+ $scope.assignedUser._id;

       

        


        CommonData.set($scope.addTaskUrl,$scope.newEntry,function(response) {
            console.log(response);
            $scope.name = "";
            $scope.email = "";
            $scope.message = response.message;
            $scope.messageSet = true;
            $scope.responseClass = "success";
            $scope.response = response.data;


            CommonData.get($scope.getUserUrl, function(response) {
                $scope.user = response.data;
                $scope.user.pendingTasks.push($scope.response._id);
              // console.log($scope.user);

                CommonData.edit($scope.getUserUrl, $scope.user, 
                function(response){
                  console.log(response);
                },function(error){
                  console.log("error in adding task to user");
                });

            });
        },
        function(error){
            console.log(error);
            $scope.message = error.message;
            $scope.messageSet = true;
            $scope.responseClass = "alert";
        });
        
    };





}]);


appControllers.controller('TaskDetailController', ['$scope', '$routeParams', '$http', 'CommonData', 'edittingTask', 'global',
    function($scope, $routeParams, $http, CommonData, edittingTask, global) {
        

      $scope.message = "hello";
      $scope.TaskId = $routeParams.TaskId;
      console.log($routeParams.TaskId);

      $scope.getTaskUrl = global.baseurl + "/tasks/" + $scope.TaskId;

      CommonData.get( $scope.getTaskUrl,function(response) {
            $scope.task = response.data;
            console.log($scope.task);
      });
    
   
    
}]);

appControllers.controller('UserDetailController', ['$scope', '$routeParams', '$http', 'CommonData', 'global',
    function($scope, $routeParams, $http, CommonData, global) {
        
      $scope.message = "hello";
      $scope.UserId = $routeParams.UserId;

      console.log($routeParams.UserId);

      $scope.getUserUrl = global.baseurl + "/users/"+ $scope.UserId;
      $scope.AllPendingTasks = []; 

      CommonData.get($scope.getUserUrl, function(response) {
              $scope.user = response.data;
              console.log($scope.user);
              $scope.getAllPendingTasks();
              $scope.getAllCompletedTasks();
      });


      $scope.getAllPendingTasks = function(){

        for(var i = 0; i < $scope.user.pendingTasks.length; i++){

            $scope.getTaskUrl = global.baseurl + "/tasks/" + $scope.user.pendingTasks[i];
           
            CommonData.get( $scope.getTaskUrl,function(response) {
                $scope.task = response.data;
                $scope.AllPendingTasks.push($scope.task);
            });

        }
          console.log($scope.AllPendingTasks);
      };
      
      $scope.showCompletedTasks = false;

      $scope.showCompleted = function(){

        $scope.showCompletedTasks = true;

      }
      $scope.makeComplete =  function(TaskId){


      }


      $scope.getAllCompletedTasks =  function(){

        $scope.getCompletedTasksUrl = global.baseurl + '/tasks/?where={assignedUser :' + $scope.UserId + '}&{completed :' + true +'}' ;
        CommonData.get($scope.getCompletedTasksUrl, function(response){

          $scope.AllCompletedTasks = response.data; 

        });


      }
   
}]);

appControllers.controller('EditTaskController', ['$scope', '$routeParams', '$http', 'CommonData', 'edittingTask', 'global',
    function($scope, $routeParams, $http, CommonData, edittingTask, global) {
        
      
      

      $scope.TaskId = $routeParams.TaskId;
      $scope.getTaskUrl = global.baseurl + "/tasks/" + $scope.TaskId;
      $scope.formData= {};
      $scope.feedback={};
      $scope.feedback.messageSet = false;
      $scope.feedback.responseClass = "success";

      CommonData.get($scope.getTaskUrl, function(response) {
          $scope.task = response.data;
    
          $scope.formData.name = $scope.task.name;
          $scope.formData.description = $scope.task.description;
          $scope.formData.date = $scope.task.deadline;
          $scope.formData.assignedUser = $scope.task.assignedUserName;
          $scope.formData.completed = $scope.task.completed;

      });

      $scope.editTask = function(){
       
          $scope.newEntry = {

             name: $scope.formData.name,
             description: $scope.formData.description,
             deadline: $scope.formData.date,
             assignedUser: $scope.formData.assignedUser._id,
             assignedUserName: $scope.formData.assignedUser.name,
             completed: $scope.formData.completed

          };

          
          
          $scope.getUserUrl = global.baseurl + "/users/"+ $scope.formData.assignedUser._id;

          CommonData.edit($scope.getTaskUrl, $scope.newEntry, function(response) {
              console.log(response); 
              $scope.feedback.message = response.message;
              $scope.feedback.messageSet = true;
              $scope.feedback.responseClass = "success";

              $scope.response = response.data;


              CommonData.get($scope.getUserUrl, function(response) {

                  $scope.user = response.data;

                  var alreadyExists = false;

                  for(var i=0; i < $scope.user.pendingTasks.length; i++){ //check if added to new user
                      if($scope.user.pendingTasks[i] == $scope.response._id){
                        alreadyExists = true;
                        console.log("true");
                      }
                  }
                  if(!alreadyExists){ //if added to new 

                      $scope.user.pendingTasks.push($scope.response._id); //give it to user
                    // console.log($scope.user);

                      CommonData.edit($scope.getUserUrl, $scope.user, 
                      function(response){
                        console.log(response);
                      },function(error){
                        console.log("error in adding task to user");
                      });


                  }

              });
          },
          function(error){
              console.log(error);
              $scope.feedback.message = error.message;
              $scope.feedback.messageSet = true;
              $scope.feedback.responseClass = "alert";
          });

      };
   
    
}]);
//Code that I might need later
//CommonData.set($scope.addTaskUrl,$scope.newEntry,function(response) {
        //     console.log(response);
        //     $scope.name = "";
        //     $scope.email = "";
        //     $scope.message = response.message;
        //     $scope.messageSet = true;
        //     $scope.responseClass = "success";
        // },
        // function(error){
        //     console.log(error);
        //     $scope.message = error.message;
        //     $scope.messageSet = true;
        //     $scope.responseClass = "alert";
        // });
//addTasks
// console.log($scope.newEntry);
        
        // $http.post('http://www.uiucwp.com:4000/api/tasks',$scope.newEntry).success(function(response){

        //     console.log(response);
        //     $scope.name = "";
        //     $scope.description = "";

        // });

//addUser
// console.log($scope.newEntry);
        
        // $http.post('http://www.uiucwp.com:4000/api/users',$scope.newEntry).success(function(response){

        //     console.log(response);
        //     $scope.name = "";
        //     $scope.email = "";

        // });


//deleteUser
 // $http.delete('http://www.uiucwp.com:4000/api/users/' + id).success(function(response){
    //     console.log(response);
    //     $scope.refresh();
    // });


//getTasks
// $http.get('http://www.uiucwp.com:4000/api/tasks').success( function(response){
   //      console.log("I got the tasks I requested.")
   //      $scope.tasks = response.data;
   //      console.log($scope.tasks);
   //  });
////////////////////////////////////////

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


