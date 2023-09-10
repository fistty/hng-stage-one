let currentDay;
let currentTime;
let timeInterval;
const dayElement = document.querySelector(".current-day");
const timeElement = document.querySelector(".utc-milli");
const daysOfWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

// Sets the day and time before fetching from the api
const setDefaultDayAndTime = () => {
	let day = daysOfWeek[new Date().getUTCDay()];
	timeInterval = setInterval(() => {
		dayElement.innerText = `DAY OF THE WEEK: ${day}`;
		timeElement.innerText = `UTC TIME IN MILLISECONDS: ${new Date().getTime()}`;
	}, 1000);
};

setDefaultDayAndTime();

const getDefaultDayAndTime = async () => {
	try {
		const res = await fetch("https://worldtimeapi.org/api/ip");
		const data = await res.json();
		currentDay = data.day_of_week;
		currentTime = new Date(data.datetime).getTime();

		// Starts the interval
		onInterval();
	} catch (err) {
		console.log(err);
	}
};

const onInterval = () => {
	if (currentDay >= 0) {
		// 0 because day is 0 - 6
		dayElement.innerText = `DAY OF THE WEEK: ${daysOfWeek[currentDay]}`;
	}

	if (currentTime) {
		setInterval(() => {
			clearInterval(timeInterval); //Add 1000 milliseconds (1 second) to prevent calling the api more than once
			currentTime += 1000;
			dayElement.innerText = `DAY OF THE WEEK: ${daysOfWeek[currentDay]}`;
			timeElement.innerText = `UTC TIME IN MILLISECONDS: ${currentTime}`;
		}, 1000);
	}
};

const onLoad = () => {
	getDefaultDayAndTime();
};

document.onload = onLoad();
