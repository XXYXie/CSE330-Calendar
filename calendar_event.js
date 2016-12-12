// Login
// When user hit the login button:
$("#login_btn").click(function() {
	var username = document.getElementById("username").value; // Get the username from the form
	var password = document.getElementById("password").value; // Get the password from the form

  $.ajax({
    url: "login_ajax.php",
    type: "post",
    data: {"username": username, "password": password},
    success: function(data){
			var jsonData = JSON.parse(data)
			if(jsonData.success){
				$(".Login").hide();
				alert("Login successfully");
				var token = jsonData.token;
				$("#token").val(token);
				console.log(token);
				// After user is logged in, show username, logout button and addEvent form.
				document.getElementById("ShowUser").innerHTML = username;
				document.getElementById("logout_btn").style.display = 'block';
				document.getElementById("AddEvent").style.display = 'block';
				document.getElementById("Category").style.display = 'block';
				getEventList();
			} else {
				alert(jsonData.message);
			}
     }
   });
 });

// When user hit the register button:
 $("#register_btn").click(function() {
 	var username = document.getElementById("username").value; // Get the username from the form
 	var password = document.getElementById("password").value; // Get the password from the form

   $.ajax({
     url: "register_ajax.php",
     type: "post",
     data: {"username": username, "password": password},
     success: function(data){
 			var jsonData = JSON.parse(data);
 			if(jsonData.success){
 				$(".Login").hide();
 				alert("Register successfully");
				var token = jsonData.token;
				$("#token").val = token;
				//console.log(token);
				// After user is logged in, show username, logout button and addEvent form.
				document.getElementById("ShowUser").innerHTML = username;
				document.getElementById("logout_btn").style.display = 'block';
				document.getElementById("AddEvent").style.display = 'block';
				document.getElementById("Category").style.display = 'block';
				updateCalendar();
 			} else {
 				alert(jsonData.message);
 			}
    }
  });
});

function CalEvent(id, title, month, date, year, hour, minute, category) {
	"use strict";

	//create new event

	this.id = id; //index in database
	this.title = title; //string
	this.month = month;
	this.date = date;
	this.year = year;
	this.hour = hour;
	this.minute = minute;
	this.category = category;

	eventlist.push(this);
    eventCount++;

	this.editEvent = function(title, month, date, year, hour, minute, category){
		this.title = title; //string
		this.month = month;
		this.date = date;
		this.year = year;
		this.hour = hour;
		this.minute = minute;
		this.category = category;
	};

	this.deleteEvent=function(){
		for(var e in events){
			var count = 0;
			if (e.id == this.id) {
				 	eventlist[count] = null;
			 }
			 count++;
		}
	};
}


function displayEvents(events){
	var m=currentMonth.month,
		 y=currentMonth.year;
	//console.log(events);
	jsonData = JSON.parse(events);
	eventlist = jsonData;
	//console.log(eventlist);
	// for(var i = 0; i < jsonData.length; i++){
	// 	var eventParsed2 = jsonData[i];
	// 	//console.log(eventParsed2);
	// 	var eventId2 = eventParsed2.id;
	// 	var eventTitle2 = eventParsed2.title;
	// 	var eventDate2 = eventParsed2.date;
	// 	var eventHour2 = eventParsed2.hour;
	// 	var eventMinute2 = eventParsed2.minute;
	// 	var eventCategory2 = eventParsed2.category;
	// 	//  console.log(eventTitle2);
	// 	// console.log(eventHour2);
	// 	// 	console.log(eventMinute2);
	// 	// 	console.log(eventCategory2);
	// 	console.log(document.getElementById("day"+eventDate2).innerHTML);
	// 	document.getElementById("day"+eventDate2).innerHTML+='<button class="indicator-wrap" data = "'+eventId2+'" id="event'+eventId2+'">'+eventTitle2+'</button>';
	// 	console.log(document.getElementById("day"+eventDate2).innerHTML);
	// 	document.getElementById("event"+eventId2).onclick = eventClicked;
	// }
	//
	var colorIndex=Math.floor(Math.random()*eventColors.length);
	for(var i in events){

		var eventParsed = jsonData[i];
		//console.log(eventParsed);
		var eventId = eventParsed.id;
		var eventTitle = eventParsed.title;
		var eventDate = eventParsed.date;
		var eventHour = eventParsed.hour;
		var eventMinute = eventParsed.minute;
		var eventCategory = eventParsed.category;
		// console.log(eventTitle);
		// console.log(eventHour);
		// console.log(eventMinute);
		// console.log(eventCategory);
		// console.log(eventDate);
		//console.log(document.getElementById("day"+eventDate).innerHTML);
		//document.getElementById("day"+eventDate).innerHTML+='<button class="indicator-wrap" data = "'+eventId+'" id="event'+eventId+'">'+eventTitle+'</button>';
		var eventColor = eventColors[eventId % eventColors.length];
		document.getElementById("day"+eventDate).innerHTML+='<button class="indicator-wrap" id="event'+eventId+'" data = "'+eventId+'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</button>';
		//console.log(document.getElementById("day"+eventDate).innerHTML);

		document.getElementById("event"+eventId).onclick = eventClicked;
		colorIndex=(colorIndex+1) % eventColors.length;
	}

}


		function getEventList(){
			var token = $("#token").val();
			var month=currentMonth.month;
			var	year=currentMonth.year;
			//console.log("getEventList");
			$.post("GetEvent.php", {
										token: token,
										year: year,
										month: month
		            }, function (data) {
												console.log(data);
												updateCalendar();
												displayEvents(data);
		    });
		}

function eventClicked(event){
	data = event.target.getAttribute("data");
	currentEvent=getArrayIndex(data);
	updateEventPanel();
}

function getArrayIndex(data){
	var len=eventlist.length;
	for(var i=0; i<len;i++){
		if(eventlist[i].id==data){
			return i;
		}
	}
}

function updateEventPanel(){
	calEvent = jsonData[currentEvent];
	console.log("currentEvent"+currentEvent);
	document.getElementById("input-title").value = calEvent.title;
	document.getElementById("input-month").value = calEvent.month + 1;
	document.getElementById("input-year").value = calEvent.year;
	document.getElementById("input-date").value = calEvent.date;
	document.getElementById("input-hour").value = calEvent.hour;
	document.getElementById("input-minute").value = calEvent.minute;
	console.log(calEvent.category);
	if (calEvent.category === "Study" || calEvent.category === "Friends" || calEvent.category === "Family"
			|| calEvent.category === "Fun" || calEvent.category === "Other"){
				document.getElementById(calEvent.category).checked = true;
	}
}

function addEvent(){
	var title = document.getElementById("input-title").value;
	var month = document.getElementById("input-month").value - 1;
	var date = document.getElementById("input-date").value;
	var year = document.getElementById("input-year").value;
	var hour = document.getElementById("input-hour").value;
	var minute = document.getElementById("input-minute").value;
	var category = $('input[name=select]:checked').val();
	console.log(category);
	if (category == undefined) {
		category = "No";
	}
	//console.log(category);
	var token = $("#token").val();
	console.log(token);
	$.post("AddEvent.php", {
							token: token,
              title: title,
              year: year,
              month: month,
              date: date,
              hour: hour,
              minute: minute,
              category: category
            }, function (data) {
								console.log(data);
								if (data.eventAdded == true) {
										alert("Event Added!");
										var id = data.id;
										var e = new CalEvent(id, title, month, date, year, hour, minute, category);
										//updateCalendar();
										getEventList();
								} else {
										alert("Event Not Added!");
								}
    });
}

function changeEvent(){
	var title = document.getElementById("input-title").value;
	var month = document.getElementById("input-month").value - 1;
	var date = document.getElementById("input-date").value;
	var year = document.getElementById("input-year").value;
	var hour = document.getElementById("input-hour").value;
	var minute = document.getElementById("input-minute").value;
	var category = $('input[name=select]:checked').val();
	if (category == undefined) {
		category = "No";
	}
	//console.log(category);
	var id = eventlist[currentEvent].id;
	//console.log(id);

	var token = $("#token").val();
	console.log(token);
		// $.post("EditEvent.php", {
		// 							token: token,
		// 							id: id,
	  //               title: title,
	  //               year: year,
	  //               month: month,
	  //               date: date,
	  //               hour: hour,
	  //               minute: minute,
	  //               category: category
	  //           }, function (data, status, request) {
		// 							console.log(data);
		// 							if (data.eventEdited == true) {
		// 									alert("Event Edited!");
		// 									console.log(eventlist[currentEvent].id);
		// 									console.log(data.id);
		// 									eventlist[currentEvent].id = data.id;
		// 									updateCalendar();
		// 									console.log("Before:");
		// 									getEventList();
		// 									console.log("After");
		// 							} else {
		// 									alert("Event Not Edited!");
		// 							}
	  //   });
		$.ajax({
      url: "EditEvent.php",
      type: "post",
      data: {"token": token,
							"id": id,
		          "title": title,
							"year": year,
		   				"month": month,
		          "date": date,
		           "hour": hour,
		           "minute": minute,
		          "category": category,
						"dataType": "json"},
      success: function(data){
				console.log(data);
  			if(data.eventEdited == "true"){
					alert("Event edited.");
					updateCalendar();
					getEventList();
  			} else {
  				alert("Event not edited.");
  			}
     }
   });
}

function deleteEvent(){
	if(currentEvent>=0){
		//eventlist[currentEvent].deleteEvent();
		var id = eventlist[currentEvent].id;
		var token = $("#token").val();
		$.post("DeleteEvent.php", {
									token: token,
									id: id
	            }, function (data) {
									if (data.eventDeleted == true) {
											alert("Event Deleted!");
											//updateCalendar();
											getEventList();
									} else {
											alert("Event Not Deleted!");
									}
	    });
	}
}

function share(){
	var otherUser = document.getElementById("otherUser").value;
	var title = document.getElementById("input-title").value;
	var month = document.getElementById("input-month").value - 1;
	var date = document.getElementById("input-date").value;
	var year = document.getElementById("input-year").value;
	var hour = document.getElementById("input-hour").value;
	var minute = document.getElementById("input-minute").value;
	var category = $('input[name=select]:checked').val();
	if (category == undefined) {
		category = "No";
	}
	var id = eventlist[currentEvent].id;

	var token = $("#token").val();
}

function cleanForm(){
	currentEvent = -1;
	document.getElementById("input-title").value = "";
	document.getElementById("input-month").value = "";
	document.getElementById("input-year").value = "";
	document.getElementById("input-date").value = "";
	document.getElementById("input-hour").value = "";
	document.getElementById("input-minute").value = "";
}

//main
    var eventlist = [];
		var currentEvent = -1;
    var eventCount = 0;
		var jsonData;

	//alert(document.getElementById("edit_event_btn"));
	document.getElementById("edit_event_btn").onclick = function(){
		if(currentEvent>=0){
			//console.log(currentEvent);
			changeEvent();
		}else{
			addEvent();
		}
		cleanForm();
	};

	document.getElementById("delete_event_btn").onclick = function(){
		deleteEvent();
		cleanForm();
	};

	document.getElementById("reset_event_btn").onclick = function(){
		cleanForm();
	};

	document.getElementById("prev_month_btn").onclick=function () {
		 currentMonth = currentMonth.prevMonth();
		 updateCalendar();
		 getEventList();
	};

	document.getElementById("next_month_btn").onclick=function () {
		 currentMonth = currentMonth.nextMonth();
		 updateCalendar();
		 getEventList();
	};

	document.getElementById("disable").onclick = function(){
		document.getElementById("Study").checked = false;
		document.getElementById("Friends").checked = false;
		document.getElementById("Family").checked = false;
		document.getElementById("Fun").checked = false;
		document.getElementById("Other").checked = false;
	}
	//document.getElementById("share_btn").onclick=function () {
			//share();
	//}

    /*
    var e1 = new CalEvent("BDay",9,11,2016,0,0);
    var e3 = new CalEvent("Event 3",8,1,2016,0,0);
    var e4 = new CalEvent("Event 4",10,19,2016,0,0);
    var e5 = new CalEvent("Event 5",11,1,2016,0,0);
    var e2 = new CalEvent("M5 DDL",9,31,2016,0,0);
    */

    // for(var i = 0; i < 5; i++){
		// var title = "Event" + i,
		// 	year = 2016,
		// 	month = 9,
		// 	date = Math.floor(Math.random()*28)+1,
		//     hour = Math.floor(Math.random()*24),
		//     //minute = Math.floor(Math.random()*60);
		// 	minute = i;

		//var max_index = //FIX ME: This should be database.length
		//var e = new CalEvent(max_index, title, month, date, year, hour, minute);
    //}
    //e1.editEvent("BDay1",9,16,2016,0,0);
    //e2.deleteEvent();
