// 1) Loop through alphabet 
// 2) Capitalize every other Letter
// 3) Convert Alphabet to a string 
// 4) Display alphabet w/ every other letter uppercase

camelLetters = angular.module("camelLetters", []);

camelLetters.factory("Alphabet", function(){
	var tempLetters = "abcdefghijklmnopqrstuvwxyz";
	var alphabet = {};
	alphabet.letters = []; //vill contain array of objects with "letter" values

	tempLetters = tempLetters.split(""); //turns tempLetters into an array

	//adds a {"letter" : "letterGoesHere"} for each element in the array
	tempLetters.forEach(function(currentLetter, index, array){
		if (index % 2 === 1)
			alphabet.letters.push({"value" : currentLetter.toUpperCase()});
		else
			alphabet.letters.push({"value" : currentLetter});
	});

	return alphabet;
});

camelLetters.factory("convertCamelLetters", function(){
	return function(nested){
		var arrayified = [];

		nested.forEach(function(element, index, array){
			console.dir(element.value);
			arrayified.push(element.value);
		});

		return arrayified.join(" ");
	}
});



function camelCtrl ($scope, Alphabet, convertCamelLetters){
	$scope.alphabet = Alphabet;

	//this step is kind of redundant...
	$scope.alphabet.stringified = convertCamelLetters($scope.alphabet.letters);
	console.log($scope.stringified);
}

//should this be a factory too?
// function convertNestedObject(nested){
// 	arrayified = [];

// 	nested.forEach(function(element, index, array){
// 		console.dir(element.value);
// 		arrayified.push(element.value);
// 	});

// 	return arrayified.join(" ");
// }