console.log("Hey Clock");

const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const AmPm = document.querySelector("#AmPm");

function giveTime(format){
	const date = new Date();
	let time;
	if (format === "h"){ 
		time = date.getHours(); 
		
		//Convertion to 12-hours clock
		if (time >= 12) { AmPm.innerText = "PM" }
		else { AmPm.innerText = "AM" }

		time = (time > 12) ? time-12 : time; // At BeforeNoon
		time = (time === 0) ? 12 : time; // At MidNight
	}
	else if (format === "m"){ time = date.getMinutes(); }
	else if (format === "s"){ time = date.getSeconds(); }

	time = (time < 10) ? `0${time}` : time; // Add Zero
	return time
}

function setTime(){
	hours.innerText = giveTime("h");
	minutes.innerText = giveTime("m");
	seconds.innerText = giveTime("s");
}
setTime();

setInterval(setTime, 1000); // SetTime after every 1000 milliSeconds
