// 1) Create an array of 10 integers, randomly chose by you, between 1 and 100 
// 2) A function that accepts an array as an argument 
// 3) Build an HTML table with two columns containing two columns: - column showing the number - column showing whether the number is 'odd' or 'even' 
// 4) You'll have to loop through the array, use the modulus operator, if/else construct, build string 


//create an array of 10 integers
function createArray(){
	var array = [];
	for (var i = 0; i <= 10; i++){
		array.push(Math.floor(Math.random() * 100));
	}
	return array;
}

function isOddOrEven(num){
	return num % 2 === 1 ? "Odd" : "Even"; 
}

function buildTable(array){
	var element, parentElement;
	array.forEach(function(number, index, array){
		parentElement=document.createElement("tr");


		element = document.createElement("td");
		element.appendChild(document.createTextNode(number));
		parentElement.appendChild(element);
		
		element = document.createElement("td");
		element.appendChild(document.createTextNode(isOddOrEven(number)));
		parentElement.appendChild(element);

		document.getElementById("numberTable").appendChild(parentElement);

	});
	
}

buildTable(createArray());


