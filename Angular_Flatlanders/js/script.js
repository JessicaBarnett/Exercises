// Some Definitions: 

// 	Directives - HTML annotations that trigger js behaviors

// 	Modules - Where our application components live

// 	Controllers - Where we add application behavior

// 	Expressions - How values get displayed within the page

//  Filters - use a pipe to run a value through a filter, ex. currency

//	Expressions in angular: http://docs.angularjs.org/guide/expression
//	
//		they look like this 
//			<p>	I am {{4 + 6}} years old </p>
//			output: I am 10 years old
//
//	Directives:
//		ng-show 
//		ng-hide
//		ng-repeat
//
//	filters
//		Basic set-up: {{ data | filter:options }}
//
//		 | currency
//		 | date: 'MM/dd/yyy @h:mma'  outputs: 12/27/2013 @12:50am
//		 | uppercase 
//		 | lowercase
//		 | limitTo:8  limits number of chars in a string, or number of elements in an array
//			ex: <div ng-repeat = "product in store.products | limitTo:8">
//		 | orderBy  lists items in array by specidied property.  defaults to ascending order.  prefix '-' for descending order
//		 	ex: <div ng-repeat = "product in store.products | orderBy:'-price'"> 


(function(){

	var gems = [{
		name: "dodecahedron",
		price: 3.75,
		description:  "a sparkly, twenty-sided gem!",
		images: [{
					full: "/Angular_Flatlanders/images/gem2.jpg",
					thumb: "/Angular_Flatlanders/images/gem1.jpg"
				}, {
					full: "/Angular_Flatlanders/images/gem2.jpg",
					thumb: "/Angular_Flatlanders/images/gem1.jpg"
				}],
		reviews: [{
			stars: 5,
			body: "This thing is so cool!",
			author: "Shyguy22"
		},{
			stars: 3,
			body: "Not too sure about it myself",
			author: "BlueYoshiRox"

		},{
			stars: 3,
			body: "it was okay",
			author: "MarioHasABigNose73"
		}],
		canPurchase: true, //note: if there was no "canPurchase" property, angular would default to a falsy value
		soldOut: false 
	}, {
		name: "pentahedron",
		price: 100,
		description:  "a gem that looks like a house!",
		images: [{
			full: "/Angular_Flatlanders/images/gem2.jpg",
			thumb: "/Angular_Flatlanders/images/gem1.jpg"
		}, {
			full: "/Angular_Flatlanders/images/gem2.jpg",
			thumb: "/Angular_Flatlanders/images/gem1.jpg"
		}],
		reviews: [{
			stars: 5,
			body: "This thing is so cool!",
			author: "Shyguy22"
		},{
			stars: 3,
			body: "Not too sure about it myself",
			author: "BlueYoshiRox"

		},{
			stars: 3,
			body: "it was okay",
			author: "MarioHasABigNose73"
		}],
		canPurchase: true,
		soldOut: false 
	}, {
		name: "cube",
		price: 30.35,
		description:  "Everyone loves the classics.",
		images: [{
					full: "/Angular_Flatlanders/images/gem2.jpg",
					thumb: "/Angular_Flatlanders/images/gem1.jpg"
				}, {
					full: "/Angular_Flatlanders/images/gem2.jpg",
					thumb: "/Angular_Flatlanders/images/gem1.jpg"
				}],
		reviews: [{
			stars: 5,
			body: "This thing is so cool!",
			author: "Shyguy22"
		},{
			stars: 3,
			body: "Not too sure about it myself",
			author: "BlueYoshiRox"

		},{
			stars: 3,
			body: "it was okay",
			author: "MarioHasABigNose73"
		}],
		canPurchase: true, 
		soldOut: false
	}]

	//This is our module. 
	var app = angular.module('GemStore', []); //empty array is for dependencies

	//this is our controller
	app.controller('StoreController', function(){
		this.products = gems; 
	});

	app.controller('GalleryController', function(){
		this.current = 0;
		this.changeImage  = function(newImage){
			this.current = newImage || 0;
		};
		
		
	});

	app.controller('ReviewController', function(){
		this.review = {},
		this.clearForm = function(){
			this.review = {};
		},
		this.addReview = function(product){
			product.reviews.push(this.review);
			this.clearForm();
		}

	});

	//code for custom product-title directive
	//custom directives = "allow you to write code that expresses the behavior of your application"

	//can be used to...
		//define a custom tag or attribute that is expanded or replaces
		//can include controller logic if needed

		//expressing complex ui
		//calling events + registering event handlers
		//reusing common components

	//in html, this custom directive is called like this
	//<product-title></product-title>
	//note that we're not using a self-closing tag.  some browsers don't like self-closing tags when using custom elements.  
	//also note that the dash in the html is converted to camelCase in the javascript, as in 'productTitle'

	app.directive('productTitle', function(){
		return { //returns a config object defining how your directive will work
			restrict: 'E', //defines type of directive, in this case E for element
			templateUrl: 'product-title.html' //source of template

		};
	});

	//directive types

	// Element Directives
	// 		html: <product-title></product-title>
	//		js: restrict: 'E'
	// 		-use these for UI widgets

	// Attribute Directives
	// 		html: <h3 product-title></h3>
	//		js: restrict: 'A'
	// 		-use these for moxin behaviors, like a tooltip


	//CUSTOM DIRECTIVE WITH A CONTROLLER!!!


	app.controller('PanelController', function(){
		this.tab = 1;
		this.selectTab = function(setTab){
			this.tab = setTab;
		};
		this.isSelected = function(tabToCheck){
			return this.tab === tabToCheck;
		};

	});


	app.directive('productPanels', function(){
		return {
			restrict: 'E',
			templateUrl: "product-panels.html",
			controller: function(){
							this.tab = 1;
							this.selectTab = function(setTab){
								this.tab = setTab;
							};
							this.isSelected = function(tabToCheck){
								return this.tab === tabToCheck;
							};
						},
			controllerAs: "panels"
		};//end return object
	});


})();