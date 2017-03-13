angular.module('app.controllers', [])


.controller('homePageCtrl', ['$scope',
	// a verbose line seperator between the top construction section and the function for the controller below

 function($scope) {

   

}])


.controller('signupPageCtrl', ['$scope','$timeout','$state',
	// a verbose line seperator between the top construction section and the function for the controller below

 function($scope,$timeout,$state) {

    $scope.info = {name:"",email:""};
    $scope.errorpopup = "";

    $scope.thankyou = false;

    $scope.submitInfo = function()
    {
    	if($scope.info.name == "" || $scope.info.name == " ")
    	{
    		$scope.errorpopup = "Please enter your name";
    		return;
    	}
    	if($scope.info.email == "" || $scope.info.email == " ")
    	{
    		$scope.errorpopup = "Please enter your email";
    		return;
    	}
    	console.log("button clicked, submitting");
    	try{
	    	firebase.database().ref('SignUp').push({
	    		name: $scope.info.name,
	    		email: $scope.info.email
	    	}).then(function(success)
	    	{
	    		console.log("thanks!");
	    		$scope.thankyou = true;
	    		$timeout(function () {$scope.$apply();});
	    		$timeout(function() {$scope.thankyou = false;$state.go('home');}, 2600);

	    	},function(fail)
	    	{
	    		$scope.errorpopup = "email was typed incorrectly";
	    		console.log("error:",fail);
	    		return;

	    	});
    	}catch(err)
    	{
    		$scope.errorpopup = "email was typed incorrectly";
	    		//console.log("error:",fail);
	    		return;
    	}
    };

}])



.controller('constructionCtrl', ['$scope',
	// a verbose line seperator between the top construction section and the function for the controller below

 function($scope) {

    

}])


