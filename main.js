let currentTime;
let defaultInterval;
const utcElement = document.querySelector(".utc-milli");
const currDay = document.querySelector(".current-day");

const setDate = () => {
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const currentDate = new Date();
	let day = daysOfWeek[currentDate.getUTCDay()];
	defaultInterval = setInterval(() => {
		utcElement.innerText = `UTC TIME IN MILLISECONDS: ${new Date().getTime()}`;
	}, 1000);
	let int = setInterval(() => {
		currDay.innerText = `DAY OF THE WEEK: ${day}`;
	}, 1000);
};

const getDate = async () => {
	try {
		const res = await fetch("https://worldtimeapi.org/api/ip");
		const data = await res.json();
		console.log(new Date(data.datetime).getDay());
		currentTime = data.datetime;
		currentTime = new Date(currentTime).getTime();
		// Starts the interval
		onInterval();
	} catch (err) {
		console.log(err);
	}
};

const onInterval = () => {
	setInterval(() => {
		if (currentTime) {
			clearInterval(defaultInterval);
			//Add 1000 milliseconds (1 second) to prevent calling the api more than once
			currentTime += 1000;
			utcElement.innerText = `UTC TIME IN MILLISECONDS: ${currentTime}`;
		}
	}, 1000);
};

const getDay = () => {};

const onLoad = () => {
	setDate();
	getDate();
};

document.onload = onLoad();
