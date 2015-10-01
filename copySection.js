var Firebase=require('Firebase');
var ref= new Firebase('https://blazing-inferno-1723.firebaseio.com');
ref.child("Updates").once('value',function(snapshot){
	var updates=snapshot.val();
	console.log(updates);
	ref.child("Website/Updates").set(updates);
	
});