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

    $scope.skip= 0;
    $scope.limit =10;
    // $scope.completedFilter = '?where={"completed": true}';
    // $orderby: { age : -1 } }
    $scope.refreshTasks = function(){
        $scope.sortByFilter = '&sort={' + $scope.formData.sortBy + ':' + $scope.formData.sortOrder + '}'; 

        $scope.getTasksUrl = global.baseurl + "/tasks" + $scope.completedFilter + $scope.sortByFilter + "&skip=" + $scope.skip  + "&limit=10";
         
        console.log($scope.getTasksUrl);
        CommonData.get( $scope.getTasksUrl,function(response) {
            $scope.tasks = response.data;
            console.log(response.data);
        });
          //
    };

    $scope.refreshTasks();

    // $scope.paginat
    $scope.deleteTask= function(id){
        $scope.deleteUserUrl = global.baseurl + "/tasks/"+id;

        CommonData.remove($scope.deleteUserUrl, function(response){
          console.log(response);
          $scope.refreshTasks();
        })

    };


    $scope.setCompletedFalse = function(){
       $scope.completedFilter = '?where={"completed": false}';
       $scope.skip =0;
       $scope.refreshTasks();
       
    };

    $scope.setCompletedTrue = function(){
      $scope.completedFilter = '?where={"completed": true}';
      $scope.skip =0;
      $scope.refreshTasks();
      
    };

    $scope.setEmptyCompletedFilter =  function(){
      $scope.completedFilter = '?';
      $scope.skip =0;
      $scope.refreshTasks();
    };

    $scope.setDescending = function(){
        $scope.formData.sortOrder = -1;
        $scope.skip =0;
        $scope.refreshTasks();
    }

    $scope.setAscending = function(){
        $scope.formData.sortOrder = 1;
        $scope.skip =0;
        $scope.refreshTasks();
    }

    $scope.$watch('formData.sortBy', function() {
      $scope.skip =0;
      $scope.refreshTasks();
    });
    
    $scope.paginateNext = function(){

      // $scope.skip +=10;
      

      $scope.getTasksUrl = global.baseurl + "/tasks" + $scope.completedFilter + $scope.sortByFilter + "&skip=" + $scope.skip  + "&limit=10" + "&count=true";
      CommonData.get( $scope.getTasksUrl,function(response) {
            $scope.count = response.data;

            if( ($scope.skip + 10) < $scope.count){
                $scope.skip +=10;
                $scope.refreshTasks();
            }
        });

    }

    $scope.paginatePrev = function(){

      if($scope.skip != 0){
        $scope.skip -=10;
      }

      $scope.refreshTasks();
    }

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
                 console.log($scope.AllPendingTasks);
            });

        }
         
      };
      
      $scope.showCompletedTasks = false;

      $scope.showCompleted = function(){

        $scope.showCompletedTasks = true;

      }
      $scope.makeComplete =  function(TaskId){


      }


      $scope.getAllCompletedTasks =  function(){

        $scope.getCompletedTasksUrl = global.baseurl + '/tasks?where={assignedUser :"' + $scope.UserId.toString() + '",completed :' + true +'}' ;
        console.log($scope.getCompletedTasksUrl);
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
          $scope.prevUserId = $scope.task.assignedUser; //sotoring previous user id
          $scope.prevStatus = $scope.task.completed;

      });

      $scope.editTask = function(){
       
          $scope.newEntry = { //make new entry
            
             name: $scope.formData.name,
             description: $scope.formData.description,
             deadline: $scope.formData.date,
             assignedUser: $scope.formData.assignedUser._id,
             assignedUserName: $scope.formData.assignedUser.name,
             completed: $scope.formData.completed

          };

          
          
          $scope.getUserUrl = global.baseurl + "/users/"+ $scope.formData.assignedUser._id;

          CommonData.edit($scope.getTaskUrl, $scope.newEntry, function(response) { //edit new task
              console.log(response); 
              $scope.feedback.message = response.message;
              $scope.feedback.messageSet = true;
              $scope.feedback.responseClass = "success";
              $scope.edittedTask = response.data; //getting data of new task


              CommonData.get($scope.getUserUrl, function(response) { //get new user id
                  $scope.newUser = response.data; 
                  CommonData.get(global.baseurl + "/users/"+ $scope.prevUserId, function(prevUserReturned) {//get prev user

                              $scope.prevUser = prevUserReturned.data; //store prev user

                              console.log("newUser: " + $scope.newUser);
                              if( $scope.ShouldAddTaskToUser($scope.newUser, $scope.edittedTask ) ){ //if need to add task
                                  
                                  console.log("In adding");
                                  $scope.newUser.pendingTasks.push($scope.edittedTask._id); //push into array

                                  CommonData.edit($scope.getUserUrl, $scope.newUser, //update the new user's pending taks
                                  function(response){
                                    $scope.DeleteFromPrevUser($scope.prevUser, $scope.newUser, $scope.edittedTask );
                                  },function(error){
                                    console.log("error in adding task to user");
                                  });

                              }else{
                                $scope.DeleteFromPrevUser($scope.prevUser, $scope.newUser, $scope.edittedTask );
                              }
                  });


              });

              ///////////new user and add the task if it is not completed or if the user has changed

              $scope.ShouldAddTaskToUser = function(newUser, task){

                  //check if the new already has the task
                   var alreadyExists = false;

                    for(var i=0; i < newUser.pendingTasks.length; i++){ //check if added to new user  
                        if(newUser.pendingTasks[i] == task._id){
                          alreadyExists = true;
                        }
                    }

                    return ( (!alreadyExists) && (!task.completed) );

              }

              $scope.DeleteFromPrevUser = function(prevUser, newUser,task ){

                  if( (newUser._id!=prevUser._id) || task.completed) {

                       var index = prevUser.pendingTasks.indexOf( task._id);
                       if (index > -1) { //take it out
                          prevUser.pendingTasks.splice(index, 1);
                        }
                        CommonData.edit(global.baseurl + "/users/"+ prevUser._id, prevUser,
                        function(response) {},function(error){});
                  }

              }

             
  
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


/////////////////////////////


 // CommonData.get($scope.getUserUrl, function(response) { // to the new user 

              //     $scope.user = response.data; //get new user's id
              //     console.log("getting New User");
              //     console.log(response.data);

              //     var alreadyExists = false;

              //     for(var i=0; i < $scope.user.pendingTasks.length; i++){ //check if added to new user
              //         if($scope.user.pendingTasks[i] == $scope.response._id){
              //           alreadyExists = true;
              //           console.log("true");
              //         }
              //     }
              //     console.log("alradyExists" + alreadyExists);
              //     console.log("completed" + $scope.newEntry.completed);
              //     if( (!alreadyExists) && (!$scope.newEntry.completed) ){ //if doesn't exist in newUser's pending task and is a pending task

              //         $scope.user.pendingTasks.push($scope.response._id); //give it to user
              //       // console.log($scope.user);
              //         console.log("adding task to user")
              //         CommonData.edit($scope.getUserUrl, $scope.user, //update the new user's pending taks
              //         function(response){
              //           console.log(response);
              //         },function(error){
              //           console.log("error in adding task to user");
              //         });


              //     }

                  

                    

              //     if( ($scope.prevUserId != $scope.newEntry.assignedUser)  ||   $scope.newEntry.completed  ){//if changed user or chnaged to complete

                      
              //         $scope.getPrevUserUrl = global.baseurl + "/users/"+ $scope.prevUserId ;

              //         CommonData.get($scope.getPrevUserUrl, function(response) {

              //               console.log("Get previous user");
              //               console.log(response.data);
              //               $scope.prevUser = response.data; //get previous user

              //               var index = $scope.prevUser.pendingTasks.indexOf( $scope.TaskId); //in his pending tasks look for it

              //               if (index > -1) { //take it out
              //                  $scope.prevUser.pendingTasks.splice(index, 1);
              //               }

              //               CommonData.edit($scope.getPrevUserUrl,$scope.prevUser,function(response) {},
              //               function(error){}); //update the user

              //           });   



              //       }

