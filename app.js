//First thing first. We need to get the longitude and latitude of our current location.
// This functionality comes pre built in js. (Thank god lol)

window.addEventListener('load', () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimeZone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.degree-section');
    const tempSpan = document.querySelector('.degree-section span');
    


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/592f11e28f8b197dcc41df2699af65f7/${lat},${long}`; 
            // Fetch from the dark sky api!
            // When you fetch from localhost, It will not allow you to do it. This results in some errors
            // and warnings on the console.
            // More information can be found on the read me.
            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    const { timezone } = data;
                    let celcius = (temperature - 32) * (5 / 9);


                    //Set DOM elements to api data.
                    temperatureDegree.textContent = Math.floor(temperature);
                    temperatureDescription.textContent = summary;
                    locationTimeZone.textContent = timezone.replace(/_/, " ");
                    
                    //Set icon to the canvas in html
                    setIcons(icon, document.querySelector('.icon'));

                    // Convert from C to F
                    temperatureSection.addEventListener('click', () => {
                        if(tempSpan.textContent === "F"){
                            tempSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        }else{
                            tempSpan.textContent = "F";
                            temperatureDegree.textContent = Math.floor(temperature);
                        }
                    });
                });
        });
    }

    //Set icons to its corresponding temperature
    setIcons = (icon, iconID) =>{
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});