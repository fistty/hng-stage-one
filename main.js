let time;
let defaultInterval;
const utcElement = document.querySelector(".utc-milli");

const setDate = () => {
	defaultInterval = setInterval(() => {
		utcElement.innerText = `UTC TIME IN MILLISECONDS: ${new Date().getTime()}`;
	}, 1000);
};

const getDate = async () => {
	try {
		const res = await fetch("http://worldtimeapi.org/api/ip");
		const data = await res.json();
		time = data.datetime;
		time = new Date(time).getTime();
		// console.log(time);
		// Starts the interval
		onInterval();
	} catch (err) {
		console.log(err);
	}
};

const onInterval = () => {
	setInterval(() => {
		if (time) {
			//Add 1000 milliseconds (1 second) to prevent calling the api more than once
			time += 1000;
			utcElement.innerText = `UTC TIME IN MILLISECONDS: ${time}`;
		}
	}, 1000);
};

const onLoad = () => {
	setDate();
	// 	console.log(defaultInterval);
	// 	getDate;
	// 	clearInterval(defaultInterval);
};

document.onload = onLoad();
