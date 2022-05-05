import { useState } from 'react';
import moonclouds from '../assets/moonclouds.png';
import sunnysky from '../assets/sunnysky.png';
import DaytimeSun from '../assets/DaytimeSun.png';
import nightsky from '../assets/nightsky.png';
import moon from '../assets/moon.png';
import sun from '../assets/sun.png';
import clouds from '../assets/clouds.png';

function Weather(props) {
    const [temp, setTemp] = useState();
    const [feelsLike, setFeelsLike] = useState();
    const [humidity, setHumidity] = useState();
    const [weather, setWeather] = useState();
    const [windSpeed, setWindSpeed] = useState();
    const [sunrise, setSunrise] = useState();
    const [sunset, setSunset] = useState();
    const [time, setTime] = useState();
    
    //use props.lat and props.long to call weather api
    const key = 'bd8f2f6392d75381ea48909665be17ec';
    const otherKey = 'ef0a2aeb99f471166b5075bb47a1d5a0';
    const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?lat=' + props.lat + '&lon=' + props.long + '&appid=' + otherKey + '&units=imperial';
    //call weatherAPI and setState
    fetch(weatherAPI)
        .then(response => response.json())
        .then(data => {
            setTemp(Math.round(data.main.temp));
            setFeelsLike(Math.round(data.main.feels_like));
            setHumidity(Math.round(data.main.humidity));
            setWeather(data.weather[0].main);
            setWindSpeed(Math.round(data.wind.speed));
            setSunrise(data.sys.sunrise);
            setSunset(data.sys.sunset);
            setTime(data.dt);
        });
    
    //if current time is in between sunrise and sunset, 
    //use daytime background, else use night
    const backgroundImage = time > sunrise && time < sunset ? DaytimeSun : nightsky;

    const styles = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    };
    
    return (
        <div className="weather-div" style={styles}>
            <div className="main-div">
                <div className="city">  
                    <p>{props.city}</p>
                </div>
                <div className="weather-svg">
                    <DisplayImage 
                        time={time} 
                        sunrise={sunrise} 
                        sunset={sunset} 
                        weather={weather}/> 
                </div>
                <div className="temp">
                    <p>{temp}&deg;</p>
                </div>
            </div>
            <div className="secondary-div">
                <div className="secondary-div-box">
                    <p id="box-titles">Feels like</p>
                    <p>{feelsLike}&deg;</p>
                </div>
                <div className="secondary-div-box">
                    <p id="box-titles">Wind</p>
                    <p>{windSpeed} mph</p>
                </div>
                <div className="secondary-div-box">
                    <p id="box-titles">Humidity</p>
                    <p>{humidity}%</p>
                </div>
            </div>
        </div>
    );
}


function DisplayImage(props) {

    let weatherImg;
    if (props.weather === "Clear" && props.time > props.sunrise && props.time < props.sunset) {
        weatherImg = sun;
    }
    else if (props.weather === "Clear" && props.time < props.sunrise){
        weatherImg = moon;
    }
    if (props.weather === "Rain" || props.weather === "Mist" && props.time > props.sunrise && props.time < props.sunset) {
        weatherImg = clouds;
    }
    else if (props.weather === "Rain" || props.weather === "Mist" && props.time < props.sunrise){
        weatherImg = moonclouds;
    }
    else if (props.weather === "Clouds" && props.time > props.sunrise && props.time < props.sunset){
        weatherImg = clouds;
    }
    else if (props.weather === "Clouds" && props.time < props.sunrise){
        weatherImg = moonclouds;
    }
    

    return(
        <img src={weatherImg} alt="weather"/>
    );
}

export default Weather;