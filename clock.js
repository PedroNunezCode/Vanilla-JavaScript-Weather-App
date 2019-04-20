clock = () => {
    let date = new Date();

    let options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    }

    let stringDate = date.toString().substr(0, 10);
    
    
    let timeString = date.toLocaleString('en-US', options);
    document.getElementById('clock').innerHTML = timeString.substr(0, 7).replace(/:/g, " ");
    document.getElementById('date').innerHTML = stringDate;
}

setInterval(clock, 100);



