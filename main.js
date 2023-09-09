let time;
const utcElement = document.querySelector(".utc-milli");
const getDate = async () => {
	try {
		const res = await fetch("http://worldtimeapi.org/api/ip");
		const data = await res.json();
		time = data.datetime;
		time = new Date(time).getTime();
		console.log(time);
	} catch (err) {
		console.log(err);
	}
};

const onInterval = () => {
	setInterval(() => {
		utcElement.innerText = new Date().getTime();
	}, 1000);
};

const onLoad = () => {
	getDate();
	onInterval();
};

document.onload = onLoad();
