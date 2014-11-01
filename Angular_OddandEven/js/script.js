// 1) Create an array of 10 integers, randomly chose by you, between 1 and 100 
// 2) A function that accepts an array as an argument 
// 3) Build an HTML table with two columns containing two columns: - column showing the number - column showing whether the number is 'odd' or 'even' 
// 4) You'll have to loop through the array, use the modulus operator, if/else construct, build string 

var oddEvenApp = angular.module("oddEvenApp", []);


//create an object w/ an "array" property which contains 
//an array of 10 objects with "value" properties, containing an integer
//roundabout much? 
oddEvenApp.factory('NumbersArray', function(){
	var numbers = {}, number;
	numbers.array = [];

	for (var i = 0; i < 10; i++){
		number = {}
		number.value = Math.floor(Math.random() * 100);
		number.oddEven = isOddOrEven(number.value);
		numbers.array.push(number);
	}

	return numbers;
});

//should I do something else with this one?
function isOddOrEven(num){
	console.log(num);
	return num % 2 === 1 ? "Odd" : "Even"; 
}

function TableCtrl($scope, NumbersArray){
	$scope.numbers = NumbersArray;
	console.dir($scope.numbers);
};

