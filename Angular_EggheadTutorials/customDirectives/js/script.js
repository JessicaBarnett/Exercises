/* Properties in the Directive's returned object:

restrict - A: attribute, E: element, C: class, M: comment.  Prefer the first two.
template - html
templateURL - url to html 
link - for if you want to add a behavior, not a template.  this will run every time the code hits your attribute
transclude - no idea yet

*/


var knickKnacks = angular.module("KnickKnacks", []);

//first custom directive
knickKnacks.directive("superman", function(){
	return {
		restrict: "E", //E for "element"
		template: "<div>I have super strength!</div>"
	}
});

knickKnacks.directive("batman", function(){
	return {
		restrict: "A", //A for "Attribute",
		template: "<div>I am super batty</div>",
		link: function(){
			console.log("And also mysterious.")
		}

	}
});

knickKnacks.directive("wonderwoman", function(){
	return {
		restrict: "A", //A for "Attribute"
		template: "<div>I am super wonderous!</div>"
	}
});

knickKnacks.directive("jeangray", function(){
	return {
		restrict: "A", //A for "Attribute"
		link: function(){
			alert("I'm gonna turn evil before the series is over : ) ")
		}
	}
});

knickKnacks.directive("flash", function(){
	return {
		restrict: "C", //C for "class"
		template: "<div>I am super fast!</div>"
	}
});

knickKnacks.directive("aquaman", function(){
	return {
		restrict: "M", //M for "comment" because C was taken for "class"
		link: function(){
			alert("I am kinda fishy...")
		}
		// template: "<div>I am super fishy!</div>"
	}
});


//controller to play with second custom directive
knickKnacks.controller('Ghost', function(){
	var ghost = this;
	ghost.message = "boo!!!";
});

//second custom directive
knickKnacks.directive("sayBoo", function(){
	return function(scope, element, attrs){ //this is called a linking function
		console.log(scope.ghost.message);
		element.text(scope.ghost.message + " \n " + attrs.scaree + " runs away!");  //.text is part of jquery lite, included with angular
	}
});


//Notes: not the best example b/c it would be easier to do this with templates, 
//and you typically DON'T want to inherit scope like we did above.  There are better ways
