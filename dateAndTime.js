// ES6 function syntax

let clockWrapper = document.querySelector('.clock-wrapper');

renderDateAndTime = () => {
	let date = new Date();

	let options = {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: true,
	}

	// Creates a copy of the date variable 
	// and cuts the string from the 0th position to the 10th position
	let stringDate = date.toString().substr(0, 10);
	let timeString = date.toLocaleString('en-US', options);
	let militaryTime = date.toString().substring(16, 24);

	document.getElementById('date').innerHTML = stringDate;
	document.getElementById('clock').innerHTML = timeString.substr(0, 8).replace(/:/g, " ");

	// if (clockWrapper.id === 12) {
	// 	document.getElementById('clock').innerHTML = timeString.substr(0, 8).replace(/:/g, " ");
	// } else {
	// 	document.getElementById('clock').innerHTML = militaryTime.replace(/:/g, " ");
	// }


}

setInterval(renderDateAndTime, 100);
// renderDateAndTime();
