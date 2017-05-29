angular.module('firebaseConfig', ['firebase'])

.run(function(){

    var config = {
    apiKey: "AIzaSyCu6owGWT99AXhg7d7UiMfNs_qcoV0coyk",
    authDomain: "mycommunity-a33e4.firebaseapp.com",
    databaseURL: "https://mycommunity-a33e4.firebaseio.com",
    storageBucket: "mycommunity-a33e4.appspot.com",
    messagingSenderId: "1093225836397"
  };
  firebase.initializeApp(config);

})

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/
