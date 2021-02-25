//https://stackoverflow.com/questions/37693982/how-to-fetch-xml-with-fetch-api

let apis = {
    currentWeather: { //get user selected recomendation weather api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=b8fdde4311418dc6fe23e7e4c38f5dca
        api: "http://api.openweathermap.org/data/2.5/weather?",
        parameters: "&lang=ru&mode=json&units=metric&APPID=b8fdde4311418dc6fe23e7e4c38f5dca", //lang=
        url: (lat, lon) => {
            return apis.currentWeather.api + "lat=" + lat + "&lon=" + lon +
                apis.currentWeather.parameters
        }
    }
};

function getCurrentLoc() {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject))
}

const numFixed = (s, f = 4) => Number(s).toFixed(f);

function getCurrentCity(location) {
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    //   return fetch(apis.currentWeather.url(numFixed(lat), numFixed(lon)), { mode: "no-cors" }) //.then(response => response.json()).then(data => console.log(data))
    return fetch(apis.currentWeather.url(numFixed(lat), numFixed(lon)), {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(console.error);
    //    .then(response => response.text())
    //    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
};

getCurrentLoc()
    .then(coords => getCurrentCity(coords))