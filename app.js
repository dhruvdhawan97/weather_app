const api ={
    key:"6103b2255a40d73f52ee9cc17ddaa847",
    base:"http://api.openweathermap.org/data/2.5/"
}

const searchbox =document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);


function setQuery(evt){
    if (evt.keyCode == 13){
        getResults(searchbox.value);  
    }
}

function getResults(query){
 fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then (weather=>{
        return weather.json();
        }).then(displayResults);
}

// function getIMG(){
// const img = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
// return img;
// }

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText= dateBuilder(now);

    let time= document.querySelector('.location .your-time');
    let hs = now.getHours();    
    let ms = now.getMinutes();
    time.innerText = hs +" : "+ ms +" Time in 24 hours (your time)";

    let temp = document.querySelector('.current .temp');
    temp.innerText = `${Math.round(weather.main.temp)}°C`;

    let feelz = document.querySelector('.current .feels');
    feelz.innerText = ` Feels like ${Math.round(weather.main.feels_like)}°C`
    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText= `Max ${Math.ceil(weather.main.temp_max)}°C/ Min${Math.floor(weather.main.temp_min)}°C`
    
    let wth = document.querySelector('.current .weather');
    wth.innerText = `${weather.weather[0].description}`

    let mwth = document.querySelector('.current .mainWeather');
    mwth.innerText = `${weather.weather[0].main}`
    
    let img = weather.weather[0].icon;
    let imgSrc = "https://openweathermap.org/img/wn/"+img+"@2x.png";
    console.log(img);
    console.log(imgSrc);    
    document.getElementById('iconn').src =imgSrc;
}



function dateBuilder(d){
    const months =["January","February","March","April","May","June","July","August",
    "September","Ocotober","November","December"];
    const days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]; 

    let day = days [d.getDay()];
    let month = months [d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${day}, ${date}/${month}/${year}`;
}