console.log("hello, it's worked!");

//code

window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDegree = document.querySelector('#temp');
    let timezone = document.querySelector('#state');
    let temperatureSection = document.querySelector('#temp');
    const temperatureSpan = document.querySelector('#spans')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/e3e414ce13c205857802685aedbf7d28/${lat}, ${long}`;
       
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, icon} = data.currently;
                //set dom elements from the API
                temperatureDegree.textContent = temperature;
                timezone.textContent = data.timezone;
                let celsius = (temperature - 32) *  (5 / 9);
                setIcons(icon, document.querySelector('.icon'));

                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;

                    }
                });
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
});
