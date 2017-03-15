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
            firebase.auth().createUserWithEmailAndPassword($scope.info.email, $scope.signed.password)
                .then(function(success) {
                    var usr = firebase.auth().currentUser;
                    usr.updateProfile({
                        displayName: $scope.buildingcode
                    })

                    firebase.database().ref('Buildings').child($scope.buildingcode).child('Admin').
                    child(usr.uid).set($scope.info).then(function(success)
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

                },function(fail)
                {
                    if(fail.code == "auth/weak-password")
                    {
                        $scope.errorpopup = "Password should be at least 6 characters";
                        return;
                    }
                });
	    	
    	}catch(err)
    	{
    		$scope.errorpopup = "email was typed incorrectly";
	    		//console.log("error:",fail);
	    		return;
    	}
    };

}])


.controller('loginPageCtrl', ['$scope','$state',
    // a verbose line seperator between the top construction section and the function for the controller below

 function($scope,$state) {

    
$scope.errorpopup = "";
$scope.info = {email:"",password:""};


$scope.LogUser = function()
{
    if($scope.info.email == "" || $scope.info.email == " ")
        {
            $scope.errorpopup = "Please enter your email";
            return;
        }
    if($scope.info.password == "" || $scope.info.password == " ")
        {
            $scope.errorpopup = "Please enter your Password";
            return;
        }

        console.log("logging in");
        firebase.auth().signInWithEmailAndPassword($scope.info.email, $scope.info.password).
        then(function(resolve) {
                    console.log("logged in!");
                    var usr = firebase.auth().currentUser;
                    var ref = firebase.database().ref("Buildings").child(usr.displayName).child('Admin');

                    ref.child(usr.uid).once("value").then(function(snapshot) {
                        console.log(snapshot.val());
                        console.log(usr.displayName,usr);
                        $state.go('portal');
                        if(snapshot.val() == null)
                        {
                           $scope.errorpopup = "Only Administrators can use this portal. If you are an Administrator, please try again.";
                            return; 
                        }

                    });

                },
                function(error) {
                    console.log(error);
                   $scope.errorpopup = error.message;
                    return; 

                });

};

}])




.controller('portalPageCtrl', ['$scope','$firebaseArray',
	// a verbose line seperator between the top construction section and the function for the controller below

 function($scope,$firebaseArray) {


var usr = firebase.auth().currentUser;
var userRef,eventRef;

firebase.auth().onAuthStateChanged(function(user) {
    var usr = firebase.auth().currentUser;
    console.log("user confirmed", usr);
    userRef = firebase.database().ref('Buildings').child(usr.displayName).child('Users');
    eventRef = firebase.database().ref('Buildings').child(usr.displayName).child('UserEvents');

    $scope.userData = $firebaseArray(userRef);
    $scope.userData.$loaded().then(function(x) {
            console.log("got User Data", $scope.userData)

        })
        .catch(function(error) {
            console.log("Error:", error);
        });

    
    $scope.eventData = $firebaseArray(eventRef);
    $scope.eventData.$loaded().then(function(x) {
            console.log("got Event Data", $scope.eventData)

        })
        .catch(function(error) {
            console.log("Error:", error);
        });



    });


$scope.userList = [];



$scope.selection = {tab:"Events"};

$scope.selector = function(num)
{
    switch (num) {
    case 0:
        $scope.selection.tab = 'Events';
        break;
    case 1:
        $scope.selection.tab = 'Surveys';
        break;
    case 2:
        $scope.selection.tab = 'Comments';
        break;
    case 3:
        $scope.selection.tab = 'Residents';
        break;
    case 4:
        $scope.selection.tab = 'Approve';
        break;
    case 5:
        $scope.selection.tab = 'Statistics';
        break;
    case 6:
        $scope.selection.tab = 'Ranking';
        }
        console.log($scope.selection.tab);
};

$scope.approveUser = function(user)
{
    console.log("approve");
    userRef.child(user.$id).update({adminConfirmed:'true'}).then(function(success)
    {
        console.log("user can now use full site");
    });
};

$scope.denyUser = function(user)
{
    var r = confirm("Are you sure you want to deny user access?");
    if (r == true) {
        $scope.userData.$remove(user).then(function(done)
        {
            console.log("user is denied access and removed");
        });
    } else {
        return;
    }
};


}])


.controller('feedbackCtrl', ['$scope','$window',
    // a verbose line seperator between the top construction section and the function for the controller below

 function($scope,$window) {

 $scope.user = {description:""};


 $scope.submitFeeback = function()
 {
    if($scope.user.description == "" || $scope.user.description == " ")
        {
            $scope.errorpopup = "Please enter some feedback";
            return;
        }

    firebase.database().ref("Feedback").push($scope.user.description).then(function(success)
    {

        $window.history.back();
    });
    
 };

}])



.controller('constructionCtrl', ['$scope',
    // a verbose line seperator between the top construction section and the function for the controller below

 function($scope) {


}])

