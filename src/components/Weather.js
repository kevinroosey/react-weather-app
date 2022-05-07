import { useState } from 'react';
import moonclouds from '../assets/moonclouds.png';
import sunnysky from '../assets/sunnysky.png';
import DaytimeSun from '../assets/DaytimeSun.png';
import nightsky from '../assets/nightsky.png';
import moon from '../assets/moon.png';
import sun from '../assets/sun.png';
import clouds from '../assets/clouds.png';
import Navbar from './Navbar';
import Form from './Form';
import Button from '@mui/material/Button';
function Weather(props) {
    const [temp, setTemp] = useState();
    const [feelsLike, setFeelsLike] = useState();
    const [humidity, setHumidity] = useState();
    const [weather, setWeather] = useState();
    const [weatherDesc, setWeatherDesc] = useState();
    const [windSpeed, setWindSpeed] = useState();
    const [sunrise, setSunrise] = useState();
    const [sunset, setSunset] = useState();
    const [time, setTime] = useState();
    const [newSearch, setNewSearch] = useState(false);
    //use props.lat and props.long to call weather api
    const key = process.env.REACT_APP_KEY;
    const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?lat=' + props.lat + '&lon=' + props.long + '&appid=' + key + '&units=imperial';
    //call weatherAPI and setState
    fetch(weatherAPI)
        .then(response => response.json())
        .then(data => {
            setTemp(Math.round(data.main.temp));
            setFeelsLike(Math.round(data.main.feels_like));
            setHumidity(Math.round(data.main.humidity));
            setWeather(data.weather[0].main);
            setWeatherDesc(data.weather[0].description);
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

    const handleSubmit = () => {
        setNewSearch(true);
    }


    if (newSearch == false){
        return (
            <div className="weather-div" style={styles}>
                <Navbar />
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
                        <p>{temp}</p>
                        
                    </div>
                    <div className="weather-desc">
                        <p>{weatherDesc}</p>
                        
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
                <div className="newSearch">
                    <Button id="newSearchButton" variant="contained" onClick={handleSubmit}>New City</Button>
                </div>
            </div>
        );
    } else {
        return (
            <Form />
        )
    }
    
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