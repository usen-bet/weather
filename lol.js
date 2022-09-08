const tempelement = document.querySelector(".temperature p")
const description = document.querySelector(".description p")
const locielement = document.querySelector(".location p")
const notielement = document.querySelector(".notifications")

const weather = {}

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)

}else{
    notielement.style.display = "block"
    notielement.innerHTML = "<p>an error has occured</p>"
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(){
    notielement.style.display = "block"
    notielement.innerHTML = `<p>an error has occured</p>`
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

     fetch( api)
     .then((response) => {
        let data = response.json()
        return data
     })
     .then((data) => {
       weather.temperature.value = Math.floor(data.main.temp - KELVIN);
       weather.description = data.weather[0].description
       weather.city = data.name
       weather.country = data.sys.country
     })
     .then(function(){
        dropthebomb();
    });
}    

function dropthebomb(){
    tempelement.innerHTML = `<p>${weather.temperature.value}<span>${weather.temperature.unit}</span></p>`
    description.innerHTML = `<p>${weather.description}</p>`
    locielement.innerHTML = `<p>${weather.city},${weather.country}</p>`
}

function celtofaren(temp){
    return (temp * 9/5) + 32;
}

tempelement.addEventListener("click", () => {
    if (weather.temperature.value === undefined)
        return;
  
    if (weather.temperature.unit === "celsius"){
        celtofaren(weather.temperature.value)

        fahrenheit = Math.floor(fahrenheit);
        
        tempelement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";

        alert("you have clicked")
    }else{
        tempelement.innerHTML = `<p>${weather.temperature.value}</p>`
        weather.temperature.unit = "celsius"
    } 
});