


var app = angular.module('scopeApp', []);


//Kid Chores - Test 1 

app.directive("kid", function(){
	return {
		restrict: "E",
		//scoping like this breaks the connection with the controller.  
		scope: {}, //this empty object limits the scope to one per kid.  so a diff {{chore}} for each kid
		template: '<input type="text" ng-model="chore"/><p>{{chore}}</p>'
	}
});

app.controller("ChoreCtrl", function($scope){
	$scope.logChore = function(chore){
		alert(chore + " is done!");
	}

});

app.directive("bigKid", function(){
	return {
		restrict: "E", 
		scope: {
			done: "&" //& means an expression
		}, 
		template: '<input type="text" ng-model="chore"/>'+
					'<p>{{chore}}</p>' + 
					'<button ng-click="done({chore: chore})">Log Chore</button>'
	}
});


// Phone calling - test 2 (&)

app.controller("CallCtrl", function($scope){
	$scope.call = function(whoToCall){
		alert("called " + whoToCall+  "!");
	}
});

app.directive("phoneHome", function(){
	return {
		restrict: "E",
		scope: {
			//the properties in here can map to custom attributes (I think)
			dial: "&" //html gets the call method from controller and passes it to the isolated-scope directive
		},
		template: '<input type="text" ng-model="whoToCall"/>' //input with model, which can be passed to dial
		+'<button ng-click="dial({whoToCall:whoToCall})">Call</button>' //funky object-notation here
	}
});


// Drinking - test 3 (@)

app.controller("FlavorCtrl", function($scope){
	$scope.ctrlFlavor = "Watermelon"  //part 3
	//if you pass a var from the scope into your directive, and add it to scope with the "@", 
	//all it does is evaluate your expression as a string and add it. 
	//see pt3 in html 
});

//part 1
//this basically does the same thing as the ice cream directive, but uses scope, element, and attrs 
//as arguments.  
app.directive("drink", function(){
	return {
		restrict: "A", //default is A though
		template: '<div>{{flavor}}</div>',
		link: function(scope, element, attrs){
			scope.flavor = attrs.flavor; 
		}
	}
});


//part 2
//this is a better way to do that.  Same result as drink directive
//takes flavor as an attribute in html too!  exact same!!
app.directive("iceCream", function(){
	return {
		restrict: "A", //default is A 
		scope: {
			//note: key name has to match attribute name in html
			flavor: "@" //accepts a string
		},
		template: '<div>{{flavor}}</div>',
	}
});



//next section!!  Testing out the "=" 2-way binding scope

app.directive("lollipop", function(){
	return {
		restrict: "A", //default is A though
		scope: {
			//note: key name has to match attribute name in html
			flavor: "=" //two-way binding.  
			//Expects an object to combine to, such as a property defined on the controller scope
		},
		template: '<div>{{flavor}}</div>',
	}
});

//Last Section!!  Put everything together

app.controller("PhoneCtrl", function($scope){
	$scope.network = "ATT"
	$scope.leaveVoicemail = function(number, message){
		alert("called " + number + " and left voicemail saying \"" + message + "\"");
		console.log("working!");
	}
});

app.directive("phone", function(){
	return {
		restrict: "E",
		scope: {
			number: "@",
			network: "=",
			makeCall: "&"
		},
		template: '<p>Number: {{number}}   network: <select ng-model="network" ng-options="net for net in networks"></select> </p>' + 
				'<input type="text" placeholder="type message here" ng-model="message"/>' + 
				'<button ng-click="makeCall({number:number, message:message})">Leave Voicemail!</button>',
		link: function(scope){
			scope.networks = ["Verizon", "AT&T", "Sprint"],
			scope.network = scope.networks[0]; //linked to select box in template
		}



	}
});
