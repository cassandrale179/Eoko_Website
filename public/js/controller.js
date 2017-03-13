angular.module('app.controllers', [])


.controller('homePageCtrl', ['$scope',
	// a verbose line seperator between the top construction section and the function for the controller below

 function($scope) {

   

}])


.controller('signupPageCtrl', ['$scope','$timeout','$state','$window',
	// a verbose line seperator between the top construction section and the function for the controller below

 function($scope,$timeout,$state,$window) {

    $scope.signed = {password:"",matching:""};
    $scope.matching = false;
    $scope.info = {companyName:"",
                    buildingName:"",
                    address:"",
                    address2:"",
                    city:"",
                    state:"",
                    zip:"",
                    firstname:"",
                    lastname:"",
                    title:"",
                    email:"",
                    phonenumber:"",
                    faxnumber:"",
                    secondaryfirstname:"",
                    secondarylastname:"",
                    secondarytitle:"",
                    secondaryemail:"",
                    secondaryphonenumber:"",
                    secondaryfaxnumber:""
                };

    $scope.errorpopup = "";
    $scope.thankyou = false;
    var alphanum = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function randomString(length, chars)
    {
        var result = '';
        for (var i = length; i > 0; --i)
        {
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return result;
    }

    $scope.checkMatch = function()
    {
        if($scope.signed.password == "" || $scope.signed.password == " ")
        {
            $scope.matching = false;
        }
        else
        {
            $scope.matching = angular.equals($scope.signed.password, $scope.signed.matching);
        }
        
    };


    $scope.submitInfo = function()
    {
        $window.scrollTo(0, 0);
    	if($scope.info.firstname == "" || $scope.info.firstname == " ")
    	{
    		$scope.errorpopup = "Please enter your First Name";
    		return;
    	}
        if($scope.info.lastname == "" || $scope.info.lastname == " ")
        {
            $scope.errorpopup = "Please enter your Last Name";
            return;
        }
    	if($scope.info.email == "" || $scope.info.email == " ")
    	{
    		$scope.errorpopup = "Please enter your email";
    		return;
    	}
        if($scope.info.phonenumber == "" || $scope.info.phonenumber == " ")
        {
            $scope.errorpopup = "Please enter your Contact Number";
            return;
        }
        if($scope.info.companyName == "" || $scope.info.companyName == " ")
        {
            $scope.errorpopup = "Please enter the Company Name";
            return;
        }
        if($scope.info.address == "" || $scope.info.address == " ")
        {
            $scope.errorpopup = "Please enter the Company Address";
            return;
        }
        if($scope.info.city == "" || $scope.info.city == " ")
        {
            $scope.errorpopup = "Please enter the City";
            return;
        }
        if($scope.info.zip == "" || $scope.info.zip == " ")
        {
            $scope.errorpopup = "Please enter the Zip";
            return;
        }
        if($scope.info.state == "" || $scope.info.state == " ")
        {
            $scope.errorpopup = "Please enter the State";
            return;
        }
        if($scope.info.password == "" || $scope.info.password == " ")
        {
            $scope.errorpopup = "Please enter your Password";
            return;
        }


    	console.log("button clicked, submitting");
    	try{
            $scope.buildingcode = randomString(8, alphanum);
	    	firebase.database().ref('Buildings').child($scope.buildingcode).child('Admin').push($scope.info).then(function(success)
	    	{
                
	    		console.log("thanks!");
	    		$scope.thankyou = true;
	    		$timeout(function () {$scope.$apply();});
	    		$timeout(function() {$scope.thankyou = false;$state.go('home');}, 6000);

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


