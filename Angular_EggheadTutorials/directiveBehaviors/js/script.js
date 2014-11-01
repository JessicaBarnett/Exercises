var app = angular.module('behaviorApp', []);

app.directive("enter", function(){
	return function(scope, element, attrs){
		element.bind("mouseenter", function(){
			console.log("I'm Inside!!!");
			element.addClass(attrs.enter);
		});
	};
});

//Note: to make these directives SUPER reusable, extract the 
//classname from the js and pass it in as an attribute in your html

app.directive("exit", function(){
	return function(scope, element, attrs){
		element.bind("mouseleave", function(){
			console.log("I'm Outside!!!");
			element.removeClass(attrs.enter);
		});
	};
});

//same 2 apps as above, but written out longhand
//note that the camel case has to be translated into verbose-enter in the html

app.directive("verboseEnter", function(){
	return { //if all you're returning is a function, you can just return the function.  it's the most common use-case, hence the shortcut
		restrict: "A", //A is actually the default, so you could omit this and be fine
		link: function(scope, element){
			element.bind("mouseenter", function(){
				console.log("I'm within the boundaries of these four lines!!");
				element.addClass("tomato");
			});
		}
	}
});

app.directive("verboseExit", function(){
	return { //if all you're returning is a function, you can just return the function.  it's the most common use-case, hence the shortcut
		restrict: "A", //A is actually the default, so you could omit this and be fine
		link: function(scope, element){
			element.bind("mouseleave", function(){
				console.log("I've left the bindings of that square and stuffy place");
				element.removeClass("tomato");
			});
		}
	}
});
