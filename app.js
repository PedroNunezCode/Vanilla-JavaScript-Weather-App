window.addEventListener('load', () => {

	// HTML Elements
	const temperatureDescription = document.querySelector('.temperature-description');
	const temperatureDegree = document.querySelector('.temperature-degree');
	const temperatureSection = document.querySelector('.degree-section');
	const temperatureSpan = document.querySelector('.degree-section span');

	/**
	 * The navigator interface allows to query the browsers information. This is used for
	 * the "Allow Google To use your location" prompt. The geolocation can then be accessed if allowed to.
	 */
	if (navigator.geolocation) {

		// getCurrentPosition() returns an object with the device's current location (position).
		navigator.geolocation.getCurrentPosition(position => {

			// Coordinate variables for current longitude and latitude.
			let long = position.coords.longitude;
			let lat = position.coords.latitude;


			// If on localhost we need a proxy to be able to fetch to the darksky.net API. (Remove if app is hosted).
			//const proxy = 'http://cors-anywhere.herokuapp.com/';
			//const url = `${proxy}https://api.darksky.net/forecast/592f11e28f8b197dcc41df2699af65f7/${lat},${long}`;

			const url = `https://api.darksky.net/forecast/592f11e28f8b197dcc41df2699af65f7/${lat},${long}`;

			// const data = getLocationWeather(url);
			// console.log(data);
			fetch(url, {mode: 'cors'})
				.then(res => {
					return res.json();
				})
				.then(data => {
					setCurrentDayInformation(data);
					setWeeklyInformation(data.daily.data);

				})
				.catch((error) => {
					console.log(error);
				})
		});
	}

	// async function getLocationWeather(url = '', data={}){
	// 	const response = await fetch(url, {
	// 		method: 'GET',
	// 		mode: 'cors',
	// 		headers: {
	// 			"Access-Control-Allow-Origin": "*"
	// 		}
	// 	})

	// 	return response.json();
	// }

	/**
	 * This function will handle setting the correct icon and weather information for the current day and weekly items.
	 */

	setCurrentDayInformation = (data) => {
		// Set the current day's stats on the main-icon / main-info section.
		const { temperature, summary, icon } = data.currently;
		let celcius = (temperature - 32) * (5 / 9);

		temperatureDegree.textContent = Math.floor(temperature);
		temperatureDescription.textContent = summary;
		setIcons(icon, document.querySelector('.icon'));

		// Convert from C to F
		temperatureSection.addEventListener('click', () => {
			if (temperatureSpan.textContent === "F") {
				temperatureSpan.textContent = "C";
				temperatureDegree.textContent = Math.floor(celcius);
			} else {
				temperatureSpan.textContent = "F";
				temperatureDegree.textContent = Math.floor(temperature);
			}
		});
	}

	setWeeklyInformation = (weeklyData) => {

		// Loops through the weekly data array and sets all the information according to its index.
		for (let i = 1; i < weeklyData.length; i++) {
			const { time, icon, temperatureMax, temperatureLow } = weeklyData[i];

			// Get the date of current index in the weekly array.
			let date = new Date(time * 1000);
			let day = date.toString().substr(0, 4);

			setIcons(icon, document.querySelector(`.weekly-icon${i}`));
			document.getElementById(`icon-day-span-${i}`).innerHTML = day;
			document.getElementById(`icon-temp-span-${i}`).innerHTML = `${Math.floor(temperatureMax)}F / ${Math.floor(temperatureLow)}F`;
			document.getElementById(`icon-temp-span-${i}`).addEventListener('click', () => changeUnit(weeklyData));
		};
	}


	//Set icons to its corresponding temperature
	setIcons = (icon, iconID) => {
		const skycons = new Skycons({ color: "white" });
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});

changeUnit = (weeklyData) => {

	let weeklyWeatherWrapper = document.querySelector(".weekly-weather-wrapper");
	// console.log(weeklyWeatherWrapper.id);

	if (weeklyWeatherWrapper.id === "F") {
		for (let i = 1; i < weeklyData.length; i++) {
			const { temperatureMax, temperatureLow } = weeklyData[i];
			let celciusMax = Math.floor((temperatureMax - 32) * (5 / 9));
			let celciusLow = Math.floor((temperatureLow - 32) * (5 / 9));

			document.getElementById(`icon-temp-span-${i}`).innerHTML = `${celciusMax}C / ${celciusLow}C`;
			weeklyWeatherWrapper.id = "C";
		};
	} else {
		for (let i = 1; i < weeklyData.length; i++) {
			const { temperatureMax, temperatureLow } = weeklyData[i];

			document.getElementById(`icon-temp-span-${i}`).innerHTML = `${Math.floor(temperatureMax)}F / ${Math.floor(temperatureLow)}F`;
			weeklyWeatherWrapper.id = "F";
		};
	}
	// for (let i = 1; i < weeklyData.length; i++) {
	// 	const { temperatureMax, temperatureLow } = weeklyData[i];

	// };
}
