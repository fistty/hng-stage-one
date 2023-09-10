let currentDay;
let currentTime;
let timeInterval;
const dayElement = document.querySelector(".current-day");
const timeElement = document.querySelector(".utc-milli");

// Sets the day and time before fetching from the api
const setDefaultDayAndTime = () => {
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = daysOfWeek[new Date().getUTCDay()];
	timeInterval = setInterval(() => {
		dayElement.innerText = `DAY OF THE WEEK: ${day}`;
		timeElement.innerText = `UTC TIME IN MILLISECONDS: ${new Date().getTime()}`;
	}, 1000);
};

const getDefaultDayAndTime = async () => {
	try {
		const res = await fetch("https://worldtimeapi.org/api/ip");
		const data = await res.json();
		currentDay = new Date(data.datetime).getDay();
		currentTime = new Date(data.datetime).getTime();

		// Starts the interval
		onInterval();
	} catch (err) {
		console.log(err);
	}
};

const onInterval = () => {
	setInterval(() => {
		if (currentDay && currentTime) {
			clearInterval(timeInterval);
			//Add 1000 milliseconds (1 second) to prevent calling the api more than once
			currentTime += 1000;
			dayElement.innerText = `DAY OF THE WEEK: ${currentDay}`;
			timeElement.innerText = `UTC TIME IN MILLISECONDS: ${currentTime}`;
		}
	}, 1000);
};

const getDay = () => {};

const onLoad = () => {
	setDefaultDayAndTime();
	getDefaultDayAndTime();
};

document.onload = onLoad();
