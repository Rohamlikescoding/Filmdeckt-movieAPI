const BASE_URL=
"https://api.openweathermap.org/data/2.5";
const API_KEY="42a59cabcaca5a59ff4bedde5002d1a0";


const searchInput=document.querySelector("input");
const searchButton=document.querySelector("button");
const weatherContainer=document.querySelector("#weather");


const getCurrentWeatherByName=async city=>{
    const url=`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    //console.log(url)
    const response=await fetch(url);
    const json=await response.json();
    return json;
}

const renderCurrentWeather=data=>{
    console.log(data);
    const weatherJSX=`
        <h1>${data.name},${data.sys.country}</h1>
        <div id="main">
            <img alt="weather icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
            <span>${data.weather[0].main}</span>
            <p>${Math.round(data.main.temp)} °C</p>
        </div>
        <div id="info">
            <p>Humidity: <span>${data.main.humidity} %</span> </p>
            <p>wind speed: <span>${data.wind.speed} m/s</span> </p>
        </div>
    `;
    weatherContainer.innerHTML=weatherJSX;
}


const searchHandler=async ()=>{
    const cityName=searchInput.value;

    if(!cityName){
        alert("please enter city name!")
    }

    const currentData=await getCurrentWeatherByName(cityName);
    //console.log(currentData)
    renderCurrentWeather(currentData)
}


searchButton.addEventListener("click",searchHandler);

