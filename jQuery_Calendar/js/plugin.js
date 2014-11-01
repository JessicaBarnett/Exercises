//plugin that builds a calendar element based on today's date, 
//allows user to click through months before/after
//returns a string when the user clicks on a day

(function ( $ ) {

	$.fn.calendar = {}; //empty slot for plugin

	/*****  Converters  ****/

	$.fn.calendar.dateToString = function(date){
		return (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
	};

	$.fn.calendar.getDayOfWeekName = function(dayOfWeekNum){
		var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		return daysOfWeek[dayOfWeekNum];
	}

	$.fn.calendar.getMonthName = function(monthNum){
		var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return monthNames[monthNum];	
	}

	/*****  Methods for Setting Default Values  *****/

	$.fn.calendar.getLastDateOfMonth = function(date){
		var month = date.getMonth();
		var year = date.getFullYear();
		return (new Date(year, month+1, 0)).getDate(); //kind of a hack.  gets the 0th day of the next month, which is the last day of the current month
	}

	$.fn.calendar.getDayOfWeekOfFirstDay = function(date){
		var firstDayOfMonth = new Date( date.getFullYear(), date.getMonth(), 1);
		return firstDayOfMonth.getDay();
	}

	$.fn.calendar.setDefaultValues = function(date){
		this.year = date.getFullYear();
		this.startMonth = date.getMonth(); //1-12 for month 
		this.dayOfWeekOfFirstDay = this.getDayOfWeekOfFirstDay(date);  //0-6 for sun-sat, day of week of first day of month
		this.lastDate = this.getLastDateOfMonth(date); //number of last day of month
	};

	/*****  Build Methods  *****/

	$.fn.calendar.initializeCalendar = function(){
		return $('<table class="calendarTable"></table>').append('<tr><th colspan="7">'+ this.getMonthName(this.startMonth) +'</th></tr>')
			.append(
				$('<tr></tr>')
					.append('<th>Sun</th>')
					.append('<th>Mon</th>')
					.append('<th>Tue</th>')
					.append('<th>Wed</th>')
					.append('<th>Thu</th>')
					.append('<th>Fri</th>')
					.append('<th>Sat</th>')
				);
	}

	$.fn.calendar.buildCalendar = function(){

		var $calendar = this.initializeCalendar();

		var currentDate = 1, $currentWeek;

		//iterate weeks
		for (var row = 0; row < 6; row++){
			$currentWeek = $('<tr></tr>')

			//iterate days of week
			for (var col=0; col < 7; col++){

				//if it's the first day of the month and it isn't the right day-of-week 
				if (currentDate === 1 && col != this.dayOfWeekOfFirstDay){
					$currentWeek.append($('<td class="blank"></td>')) //append a blank td
				}
				//if it's the last day of the month
				else if (currentDate > this.lastDate)
				{
					$currentWeek.append($('<td class="blank"></td>')) //append a blank td
					currentDate++; //increment current date
				}
				else{
					$currentWeek.append($('<td class="date">'+ currentDate +'</td>'))
					currentDate++; //increment current date
				}
				
			}

			$calendar.append($currentWeek);
		}

		return $calendar;

	}

	$.fn.calendar.makeCalendar = function($element){
		this.setDefaultValues(new Date());

		$calendar = this.buildCalendar();

		//add element to dom
		$element.after($calendar);

		//add handlers to calendar dates 
		$("td.date").click(this.toggleCalendar);
		$("td.date").hover(this.printDate, this.clearDate);
	}


	/*****  Event Handlers  *****/

	//prints chosen date in any p element with the .chosenDate class
	$.fn.calendar.printDate = function(){
		$("p#chosenDate").empty();
		$("p#chosenDate").append("You picked " + ($.fn.calendar.startMonth+1) + "/" +  $(this).text() + "/" + $.fn.calendar.year);
	};

	$.fn.calendar.clearDate = function(){
		$("p#chosenDate").empty();
	};

	$.fn.calendar.toggleCalendar = function(){
		if ($(".calendarTable").length)
			$(".calendarTable").remove();
		else
			$.fn.calendar.makeCalendar($(this));
	};

	$(".calendar").click($.fn.calendar.toggleCalendar);


}(jQuery));

