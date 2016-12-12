//consts
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var eventColors = ["#28cbff", "#9f4b99", "#9cc370", "#ff9900"];

// For our purposes, we can keep the current month in a variable in the global scope
var currentMonth = new Month(2016, 10); //Oct 2016

//main

   //Initialize the calendar
   updateCalendar();

   //buttons to switch months

   document.getElementById("prev_month_btn").onclick=function () {
      currentMonth = currentMonth.prevMonth();
      updateCalendar();
   };

   document.getElementById("next_month_btn").onclick=function () {
      currentMonth = currentMonth.nextMonth();
      updateCalendar();
   };

//Update visual emelents in calendar, including headings, day blocks, and events
function updateCalendar(){

   var m=currentMonth.month,
      y=currentMonth.year;

   var d=new Date(),
      todayDate=d.getDate(),
      todayMonth=d.getMonth(),
      todayYear=d.getFullYear();

   // Remove old days
   document.getElementById("day-wrap").innerHTML="";

   // Prepare for adding days

   document.getElementById("header-title-date").innerHTML=monthNames[m] +' '+ y;
   var weeks = currentMonth.getWeeks();

   var totaldays = 0,
      totalweeks = 0;

   //Display day blocks
   for(var w in weeks){
		var days = weeks[w].getDates();
      totalweeks++;
      document.getElementById("day-wrap").innerHTML+= '<div class="week" id="week'+totalweeks+'">';
		for(var d in days){
         if(days[d].getMonth()==m){
            totaldays++;

            //If today
            var className="day";
            if (todayMonth == m && todayYear == y && todayDate==totaldays) {
               className+=" today";
            }

            //add a block with day number
            document.getElementById("day-wrap").innerHTML+='<div class="'+className+'" id="day'+totaldays+'"><div class="day-number">'+days[d].getDate()+'</div>';
         }else{
            //add an empty block
            document.getElementById("day-wrap").innerHTML += '<div class="day-blank" name="day-blank"><div class="day-number"></div></div>';
         }
		}

      document.getElementById("day-wrap").innerHTML+= '</div>';
	}

   //Add events on the top
   //var list=loadEvents();
   //displayEvents(eventlist);
}
