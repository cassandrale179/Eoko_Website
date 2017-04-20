angular.module('app.controllers', [])


    .controller('homePageCtrl', ['$scope',
        // a verbose line seperator between the top construction section and the function for the controller below

        function ($scope) {


        }])


    .controller('signupPageCtrl', ['$scope', '$timeout', '$state', '$window',
        // a verbose line seperator between the top construction section and the function for the controller below

        function ($scope, $timeout, $state, $window) {

            $scope.signed = {password: "", matching: ""};
            $scope.matching = false;
            $scope.info = {
                companyName: "",
                buildingName: "",
                address: "",
                address2: "",
                city: "",
                state: "",
                zip: "",
                firstname: "",
                lastname: "",
                title: "",
                email: "",
                phonenumber: "",
                faxnumber: "",
                secondaryfirstname: "",
                secondarylastname: "",
                secondarytitle: "",
                secondaryemail: "",
                secondaryphonenumber: "",
                secondaryfaxnumber: ""
            };

            $scope.errorpopup = "";
            $scope.thankyou = false;
            var alphanum = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            function randomString(length, chars) {
                var result = '';
                for (var i = length; i > 0; --i) {
                    result += chars[Math.round(Math.random() * (chars.length - 1))];
                }
                return result;
            }


            //keep track of selected tab
            $scope.tabSelected = "companyInfo";
            $scope.selectCompanyInformation = function () {
                $scope.tabSelected = "companyInfo";

                document.getElementById("companyInfo").className = "eoko-button-nav-active";
                document.getElementById("circle1").className = "eoko-element-signup-phase-active";

                document.getElementById("companyContact").className = "eoko-button-nav-nonactive";
                document.getElementById("circle2").className = "eoko-element-signup-phase-nonactive";

                document.getElementById("companyAccount").className = "eoko-button-nav-nonactive";
                document.getElementById("circle3").className = "eoko-element-signup-phase-nonactive";
            }

            $scope.selectCompanyContact = function () {
                if (checkValidInputCompanyInfo()) {
                    $scope.tabSelected = "companyContact";

                    document.getElementById("companyInfo").className = "eoko-button-nav-nonactive";
                    document.getElementById("circle1").className = "eoko-element-signup-phase-nonactive";

                    document.getElementById("companyContact").className = "eoko-button-nav-active";
                    document.getElementById("circle2").className = "eoko-element-signup-phase-active";

                    document.getElementById("companyAccount").className = "eoko-button-nav-nonactive";
                    document.getElementById("circle3").className = "eoko-element-signup-phase-nonactive";
                } else {
                    $scope.errorpopup = "Please enter Company Information First";
                }

            }

            $scope.selectCompanyAccount = function () {
                if (checkValidInputCompanyInfo() && checkValidInputContact()) {
                    $scope.tabSelected = "companyAccount";

                    document.getElementById("companyInfo").className = "eoko-button-nav-nonactive";
                    document.getElementById("circle1").className = "eoko-element-signup-phase-nonactive";

                    document.getElementById("companyContact").className = "eoko-button-nav-nonactive";
                    document.getElementById("circle2").className = "eoko-element-signup-phase-nonactive";

                    document.getElementById("companyAccount").className = "eoko-button-nav-active";
                    document.getElementById("circle3").className = "eoko-element-signup-phase-active";
                }
                else {
                    $scope.errorpopup = "Please enter Company Information and/or Company Contact First";
                }
            }


            //Company Information Tab form
            $scope.goToCompanyContact = function () {
                if (checkValidInputCompanyInfo())
                    $scope.selectCompanyContact();
            }
            function checkValidInputCompanyInfo() {
                if ($scope.info.companyName === "" || $scope.info.companyName === " ") {
                    $scope.errorpopup = "Please enter the Company Name";
                    return false;
                } else if ($scope.info.address === "" || $scope.info.address === " ") {
                    $scope.errorpopup = "Please enter the Company Address";
                    return false;
                } else if ($scope.info.city === "" || $scope.info.city === " ") {
                    $scope.errorpopup = "Please enter the City";
                    return false;
                } else if ($scope.info.zip === "" || $scope.info.zip === " ") {
                    $scope.errorpopup = "Please enter the Zip";
                    return false;
                } else if ($scope.info.state === "" || $scope.info.state === " ") {
                    $scope.errorpopup = "Please enter the State";
                    return false;
                } else if ($scope.info.password === "" || $scope.info.password === " ") {
                    $scope.errorpopup = "Please enter your Password";
                    return false;
                } else {
                    return true;
                }
            }


            //Company Contact Tab form
            $scope.addedAnotherContact = false;
            $scope.contactSelected = 'primaryContact';
            $scope.selectPrimaryContact = function () {
                $scope.contactSelected = 'primaryContact';
                document.getElementById("primaryContact").className = "eoko-label-header-2-selected";
                document.getElementById("secondaryContact").className = "eoko-label-header-2-not-selected";
            }
            $scope.selectSecondaryContact = function () {
                if ($scope.addedAnotherContact) {
                    $scope.errorpopup = "";
                    $scope.contactSelected = 'secondaryContact';
                    document.getElementById("primaryContact").className = "eoko-label-header-2-not-selected";
                    document.getElementById("secondaryContact").className = "eoko-label-header-2-selected";
                } else {
                    $scope.errorpopup = "Please enter your Primary Contact first";
                }
            }
            $scope.addSecondaryContact = function () {
                if (checkValidInputContact()) {
                    $scope.errorpopup = "";
                    $scope.contactSelected = 'secondaryContact';
                    document.getElementById("primaryContact").className = "eoko-label-header-2-not-selected";
                    document.getElementById("secondaryContact").className = "eoko-label-header-2-selected";
                    if ($scope.info.secondaryfirstname !== "" ||
                        $scope.info.secondaryfirstname !== " " ||
                        $scope.info.secondarylastname !== "" ||
                        $scope.info.secondarylastname !== " " ||
                        $scope.info.secondaryemail !== "" ||
                        $scope.info.secondaryemail !== " " ||
                        $scope.info.secondaryphonenumber !== "" ||
                        $scope.info.secondaryphonenumber !== " ") {
                        $scope.addedAnotherContact = true;
                    }
                } else {
                    $scope.errorpopup = "Please enter your Primary Contact first";
                }
            }
            $scope.goToCompanyAccount = function () {
                if (checkValidInputContact())
                    $scope.selectCompanyAccount();
            }
            function checkValidInputContact() {
                if ($scope.info.firstname === "" || $scope.info.firstname === " ") {
                    $window.scrollTo(0, 0);
                    $scope.errorpopup = "Please enter your First Name";
                    return false;
                } else if ($scope.info.lastname === "" || $scope.info.lastname === " ") {
                    $window.scrollTo(0, 0);
                    $scope.errorpopup = "Please enter your Last Name";
                    return false;
                } else if ($scope.info.email === "" || $scope.info.email === " ") {
                    $window.scrollTo(0, 0);
                    $scope.errorpopup = "Please enter your email";
                    return false;
                } else if ($scope.info.phonenumber === "" || $scope.info.phonenumber === " ") {
                    $window.scrollTo(0, 0);
                    $scope.errorpopup = "Please enter your Contact Number";
                    return false;
                } else {
                    return true;
                }
            }

            //check weather Password nd Confirm Password matches
            $scope.checkMatch = function () {
                if ($scope.signed.password === "" || $scope.signed.password === " ") {
                    $scope.matching = false;
                    document.getElementById("matching_indicator").className = "eoko-text-field-not-matching-password";
                    document.getElementById("matching_indicator2").className = "eoko-text-field-not-matching-password";
                } else if ($scope.signed.matching === "" || $scope.signed.matching === " ") {
                    $scope.matching = false;
                    document.getElementById("matching_indicator").className = "eoko-text-field-not-matching-password";
                    document.getElementById("matching_indicator2").className = "eoko-text-field-not-matching-password";
                } else {
                    if ($scope.signed.password === $scope.signed.matching) {
                        $scope.matching = true;
                        document.getElementById("matching_indicator").className = "eoko-text-field-matching-password";
                        document.getElementById("matching_indicator2").className = "eoko-text-field-matching-password";

                    } else {
                        $scope.matching = false;
                        document.getElementById("matching_indicator").className = "eoko-text-field-not-matching-password";
                        document.getElementById("matching_indicator2").className = "eoko-text-field-not-matching-password";
                    }
                }
            };


            $scope.submitInfo = function () {
                console.log("signupPageCtrl: button clicked, submitting");
                try {
                    $scope.buildingcode = randomString(8, alphanum);
                    firebase.auth().createUserWithEmailAndPassword($scope.info.email, $scope.signed.password)
                        .then(function (success) {
                            var usr = firebase.auth().currentUser;
                            usr.updateProfile({
                                displayName: $scope.buildingcode
                            })
                            firebase.database().ref('Buildings').child($scope.buildingcode).child('Admin/Users').child(usr.uid).set($scope.info).then(function (success) {
                                console.log("signupPageCtrl: thanks!");
                                $scope.thankyou = true;
                                $timeout(function () {
                                    $scope.$apply();
                                });
                                $timeout(function () {
                                    $scope.thankyou = false;
                                    $state.go('home');
                                }, 6000);
                            }, function (fail) {
                                $scope.errorpopup = "email was typed incorrectly";
                                console.log("signupPageCtrl: error:", fail);
                                return;
                            });
                        }, function (fail) {
                            if (fail.code === "auth/weak-password") {
                                $scope.errorpopup = "Password should be at least 6 characters";
                                return;
                            }
                        });
                } catch (err) {
                    $scope.errorpopup = "email was typed incorrectly";
                    //console.log("error:",fail);
                    return;
                }
            };
        }])


    .controller('loginPageCtrl', ['$scope', '$state',
        // a verbose line seperator between the top construction section and the function for the controller below
        function ($scope, $state) {

            $scope.errorpopup = "";
            $scope.info = {email: "", password: ""};

            $scope.LogUser = function () {
                if ($scope.info.email === "" || $scope.info.email === " ") {
                    $scope.errorpopup = "Please enter your email";
                    return;
                }
                if ($scope.info.password === "" || $scope.info.password === " ") {
                    $scope.errorpopup = "Please enter your Password";
                    return;
                }

                console.log("loginPageCtrl: Logging in");

                firebase.auth().signInWithEmailAndPassword($scope.info.email, $scope.info.password).then(function (resolve) {
                        console.log("loginPageCtrl: Logged in!");
                        var usr = firebase.auth().currentUser;
                        var ref = firebase.database().ref("Buildings").child(usr.displayName).child('Admin');

                        //check whether the user is an admin
                        ref.child(usr.uid).once("value").then(function (snapshot) {
                            console.log(snapshot.val());
                            console.log(usr.displayName, usr);
                            $state.go('portal');
                            if (snapshot.val() === null) {
                                $scope.errorpopup = "Only Administrators can use this portal" +
                                    "If you are an Administrator, please try again.";
                                return;
                            }
                        });
                    },
                    function (error) {
                        console.log(error);
                        $scope.errorpopup = error.message;
                        return;
                    });
            };
        }])


    .controller('feedbackCtrl', ['$scope', '$window', '$timeout',
        // a verbose line seperator between the top construction section and the function for the controller below

        function ($scope, $window, $timeout) {

            $scope.user = {description: ""};
            $scope.thankyou = false;

            $scope.submitFeeback = function () {
                if ($scope.user.description === "" || $scope.user.description === " ") {
                    $scope.errorpopup = "Please enter some feedback";
                    return;
                }

                firebase.database().ref("Feedback").push($scope.user.description).then(function (success) {
                    $window.scrollTo(0, 0);
                    $scope.thankyou = true;
                    $timeout(function () {
                        $scope.$apply();
                    });
                    $timeout(function () {
                        $scope.thankyou = false;
                        $window.history.back();
                    }, 3000);
                });

            };

        }])


    .controller('constructionCtrl', ['$scope',
        // a verbose line seperator between the top construction section and the function for the controller below

        function ($scope) {


        }])


    .controller('portalPageCtrl', ['$scope', '$firebaseArray', '$timeout', '$window',
        // a verbose line seperator between the top construction section and the function for the controller below

        function ($scope, $firebaseArray, $timeout, $window) {


            var usr = firebase.auth().currentUser;
            var userRef, eventRef;
            $scope.errorpopup = '';

            firebase.auth().onAuthStateChanged(function (user) {
                var usr = firebase.auth().currentUser;
                console.log("user confirmed", usr);
                userRef = firebase.database().ref('Buildings').child(usr.displayName).child('Users');
                eventRef = firebase.database().ref('Buildings').child(usr.displayName).child('UserEvents');
                adminRef = firebase.database().ref('Buildings').child(usr.displayName).child('Admin');

                $scope.userData = $firebaseArray(userRef);
                $scope.userData.$loaded().then(function (x) {
                    console.log("got User Data", $scope.userData)

                })
                    .catch(function (error) {
                        console.log("Error:", error);
                    });


                $scope.eventData = $firebaseArray(eventRef);
                $scope.eventData.$loaded().then(function (x) {
                    console.log("got Event Data", $scope.eventData)

                })
                    .catch(function (error) {
                        console.log("Error:", error);
                    });


            });


            $scope.userList = [];


            //-----------------------------
            //    NAVIGATION

            $scope.selection = {tab: "Residents"};

            var previousSelectedTab = "residentsTab";
            document.getElementById("residentsTab").className =  "eoko-nav-selected";

            $scope.selector = function (num) {
                switch (num) {
                    case 0:
                        $scope.selection.tab = 'Events';
                        document.getElementById(previousSelectedTab).className =  "";
                        document.getElementById("eventsTab").className =  "eoko-nav-selected";
                        previousSelectedTab = "eventsTab";
                        break;
                    case 1:
                        $scope.selection.tab = 'Surveys';
                        document.getElementById(previousSelectedTab).className =  "";
                        document.getElementById("surveysTab").className =  "eoko-nav-selected";
                        previousSelectedTab = "surveysTab";
                        break;
                    case 2:
                        $scope.selection.tab = 'Comments';
                        document.getElementById(previousSelectedTab).className =  "";
                        document.getElementById("commentsTab").className =  "eoko-nav-selected";
                        previousSelectedTab = "commentsTab";
                        break;
                    case 3:
                        $scope.selection.tab = 'Residents';
                        document.getElementById(previousSelectedTab).className =  "";
                        document.getElementById("residentsTab").className =  "eoko-nav-selected";
                        previousSelectedTab = "residentsTab";
                        break;
                    case 4:
                        $scope.selection.tab = 'Approve';
                        document.getElementById(previousSelectedTab).className =  "";
                        document.getElementById("approveTab").className =  "eoko-nav-selected";
                        previousSelectedTab = "approveTab";
                        break;
                    case 5:
                        $scope.selection.tab = 'Statistics';
                        document.getElementById(previousSelectedTab).className =  "";
                        document.getElementById("statisticsTab").className =  "eoko-nav-selected";
                        previousSelectedTab = "statisticsTab";
                        break;
                    case 6:
                        $scope.selection.tab = 'Ranking';
                        document.getElementById(previousSelectedTab).className =  "";
                        document.getElementById("rankingTab").className =  "eoko-nav-selected";
                        previousSelectedTab = "rankingTab";
                        break;
                }
                console.log($scope.selection.tab);
            };


            //-----------------------------
            //    APPROVE TAB

            $scope.approveUser = function (user) {
                console.log("approve");
                userRef.child(user.$id).update({adminConfirmed: 'true'}).then(function (success) {
                    console.log("user can now use full site");
                });
            };

            $scope.denyUser = function (user) {
                var r = confirm("Are you sure you want to deny user access?");
                if (r === true) {
                    $scope.userData.$remove(user).then(function (done) {
                        console.log("user is denied access and removed");
                    });
                } else {
                    return;
                }
            };



            //-----------------------------
            //    EVENT TAB

            var weekday = new Array();
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";

            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

            $scope.eventsubmitted = false;

            $scope.event = {
                type: "",    //public or private
                category: [],
                date: new Date(),
                location: "",
                time: "",
                description: "",
                title: ""
            };

            //Set event type
            $scope.setEventType = function (eventType){
                $scope.event.type = eventType;
            };

            //Set event category
            $scope.selectEventsCategory = function (elementId){
                var elementClass = document.getElementById(elementId).className;
                if(elementClass === "eoko-horizontal-scroll-button eoko-text-thin"){
                    document.getElementById(elementId).className = "eoko-horizontal-scroll-button-selected eoko-text-thin";
                    $scope.event.category.push(elementId);
                }else{
                    document.getElementById(elementId).className = "eoko-horizontal-scroll-button eoko-text-thin";
                    for(var i in $scope.event.category)
                    {
                        if($scope.event.category[i] === elementId)
                        {
                            $scope.event.category.splice(i, 1);
                        }
                    }
                }
            };

            //Submit event
            $scope.submitEvent = function () {
                console.log("Event submit begin");
                if ($scope.event.category.length === 0 || $scope.event.category.length === 0) {
                    $scope.errorpopup = "Please enter at least one category";
                    return;
                }
                if ($scope.event.date === "" || $scope.event.date === " ") {
                    $scope.errorpopup = "Please enter the event date";
                    return;
                }
                if ($scope.event.location === "" || $scope.event.location === " ") {
                    $scope.errorpopup = "Please enter the event location";
                    return;
                }
                if ($scope.event.time === "" || $scope.event.time === " ") {
                    $scope.errorpopup = "Please enter the event time";
                    return;
                }
                if ($scope.event.description === "" || $scope.event.description === " ") {
                    $scope.errorpopup = "Please enter a description";
                    return;
                }
                if ($scope.event.title === "" || $scope.event.title === " ") {
                    $scope.errorpopup = "Please enter a title";
                    return;
                }

                var postedEvent = {
                    title: $scope.event.title,
                    location: $scope.event.location,
                    date: "",
                    time: "",
                    description: $scope.event.description,
                    category: $scope.event.category
                };

                var d = $scope.event.date;
                postedEvent.date = weekday[d.getDay()] + ", " + month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
                postedEvent.time = $scope.event.time.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                console.log(postedEvent);

                adminRef.child('buildingEvents').push(postedEvent).then(function (success) {
                    $scope.event = {
                        type: "",
                        category: [],
                        date: "",
                        location: "",
                        time: "",
                        description: "",
                        title: ""
                    };
                    $scope.errorpopup = '';
                    $scope.eventsubmitted = true;
                    $timeout(function () {
                        $scope.$apply();
                    });
                    $timeout(function () {
                        $scope.eventsubmitted = false;
                        $scope.$apply();
                    }, 3000);
                })
            };




            //-----------------------------
            //    SURVEY TABS

            $scope.surveysubmitted = false;

            $scope.survey = {
                type: "",    //public or private
                category: [],
                title: "",
                description: "",
                questions: []
            };

            //Set survey Type
            $scope.setSurveyType = function (surveyType){
                $scope.survey.type = surveyType;
            };

            //Set survey Category
            $scope.selectSurveysCategory = function (elementId){
                var elementClass = document.getElementById(elementId).className;
                if(elementClass === "eoko-horizontal-scroll-button eoko-text-thin"){
                    document.getElementById(elementId).className = "eoko-horizontal-scroll-button-selected eoko-text-thin";
                    $scope.survey.category.push(elementId);
                }else{
                    document.getElementById(elementId).className = "eoko-horizontal-scroll-button eoko-text-thin";
                    for(var i in $scope.survey.category)
                    {
                        if($scope.survey.category[i] === elementId)
                        {
                            $scope.survey.category.splice(i, 1);
                        }
                    }
                }
            };

            //Adding survey questions
            function question(title, choices) {
                this.title = title;
                this.choices = choices;
            }

            function answer(text) {
                this.answer = text;
            }

            $scope.addQuestion = function () {
                $scope.survey.questions.push(new question("", []));
                console.log($scope.survey);

            };

            $scope.removeQuestion = function () {
                $scope.survey.questions.pop();
                console.log($scope.survey);

            };

            $scope.addCheckbox = function (index) {
                $scope.survey.questions[index].choices.push(new answer(""));
                console.log($scope.survey);

            };

            $scope.removeCheckbox = function (index) {
                $scope.survey.questions[index].choices.pop();
                console.log($scope.survey);

            };

            //Submit Survey
            $scope.submitSurvey = function () {
                console.log("survey submit begin");
                if ($scope.survey.category.length === 0 || $scope.survey.category.length === 0) {
                    $scope.errorpopup = "Please enter at least one category";
                    return;
                }
                if ($scope.survey.title === "" || $scope.survey.title === " ") {
                    $scope.errorpopup = "Please enter a title";
                    return;
                }
                if ($scope.survey.description === "" || $scope.survey.description === " ") {
                    $scope.errorpopup = "Please enter a description";
                    return;
                }
                if ($scope.survey.questions.length === 0) {
                    $scope.errorpopup = "You must have at least 1 question to submit";
                    return;
                }

                for (var i in $scope.survey.questions) {
                    if ($scope.survey.questions[i].title === "" || $scope.survey.questions[i].title === " ") {
                        $scope.errorpopup = "Please fill out all fields";
                        return;
                    }
                    if ($scope.survey.questions[i].choices.length < 2) {
                        $scope.errorpopup = "You must have at least 2 answers per question";
                        return;
                    }
                    else {
                        for (var j in $scope.survey.questions[i].choices) {
                            if ($scope.survey.questions[i].choices[j].answer === ""
                                || $scope.survey.questions[i].choices[j].answer === " ") {
                                $scope.errorpopup = "Please fill out all fields";
                                return;
                            }
                        }
                    }
                }

                console.log("Submitting survey");

                /*var postedEvent = {
                 title: $scope.event.title,
                 location: $scope.event.location,
                 date: "",
                 time: "",
                 description: $scope.event.description,
                 category: $scope.event.category
                 };

                 var d = $scope.event.date;
                 postedEvent.date = weekday[d.getDay()] + ", " + month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
                 postedEvent.time = $scope.event.time.toLocaleTimeString([], {
                 hour: '2-digit',
                 minute: '2-digit'
                 });
                 console.log(postedEvent);
                 */
                adminRef.child('Surveys').push($scope.survey).then(function (success) {
                    $scope.survey = {
                        type: "",
                        category: [],
                        title: "",
                        description: "",
                        questions: []
                    };
                    $scope.errorpopup = '';
                    $scope.surveysubmitted = true;
                    $timeout(function () {
                        $scope.$apply();
                    });
                    $timeout(function () {
                        $scope.surveysubmitted = false;
                        $scope.$apply();
                    }, 3000);
                })
            };
        }]);

