function BasicCtrl($scope){
	$scope.data = { "greeting": "Hello",
					"farewell": "Goodbye"};
	console.dir($scope.data);
}




//Name "myApp" must match the ng-app="" in the html
//this app is defined on the html element
var myApp = angular.module('myApp', []);

//Note: capitalizing first letter of 'Data' is a convention
myApp.factory('Data', function(){
	return {message: "I am data from a service!"};
});

//custom filter. Use it with a pipe
//parameter is anything that you want to inject into your filter func
myApp.filter('reverse', function(Data){ 
	return function(text){
		return text.split("").reverse().join("") + Data.message;
	}
});

//Pass the factory 'Data' to our controllers to share its information
function FirstCtrl($scope, Data){
	$scope.data = Data;
}

function SecondCtrl($scope, Data){
	$scope.data = Data;

	//basic function
	$scope.reversedMessage = function(){
		return $scope.data.message.split("").reverse().join("");
	}

	//generally better not to reference $scope inside of a function.
	$scope.betterReversedMessage = function(message){
		return message.split("").reverse().join("");
	}

}


