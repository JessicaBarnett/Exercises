var myApp = angular.module("myApp", []);


myApp.factory('Numbers', function(){
	var numbers  = {};
	numbers.list = []; 

	for (i=0; i<20; i++){
		numbers.list.push({"value" : generateRandomNumber()});
	}

	return numbers;
});

myApp.factory('Letters', function(){
	var letters  = {};
	letters.list = []; 

	for (i=0; i<20; i++){
		letters.list.push({"value" : generateRandomLetter()});
	}

	return letters;
});


function generateRandomLetter(){
	var alphabet = "abcdefghijklmnopqrstuvwxyz";
	return alphabet.charAt(Math.floor(Math.random() * 25));
}

function generateRandomNumber(){
	return Math.floor(Math.random() * 100);
}

function FiltersCtrl($scope, Numbers, Letters){
	$scope.numbers = Numbers;
	$scope.letters = Letters;
	console.log($scope.numbers.list);
	// console.log($scope.letters.list);
}
