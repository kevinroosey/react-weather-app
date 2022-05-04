import { useState } from 'react';
import weatherImg from '../assets/sunnysky.png';
import DaytimeSun from '../assets/DaytimeSun.png';

const styles = {
        backgroundImage: `url(${DaytimeSun})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
};

function Weather(props) {
    const [temp, setTemp] = useState();
    const [feelsLike, setFeelsLike] = useState();
    const [humidity, setHumidity] = useState();
    const [weather, setWeather] = useState();
    const [windSpeed, setWindSpeed] = useState();
    //use props.lat and props.long to call weather api
    const key = 'bd8f2f6392d75381ea48909665be17ec';
    const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?lat=' + props.lat + '&lon=' + props.long + '&appid=' + key + '&units=imperial';
    fetch(weatherAPI)
        .then(response => response.json())
        .then(data => {
            setTemp(Math.round(data.main.temp));
            setFeelsLike(Math.round(data.main.feels_like));
            setHumidity(Math.round(data.main.humidity));
            setWeather(Math.round(data.weather[0].main));
            setWindSpeed(Math.round(data.wind.speed));
        });
    
    

    
    return (
        <div className="weather-div" style={styles}>
            <div className="main-div">
                <div className="city">
                    
                    <p>{props.city}</p>
                </div>
                <div className="weather-svg">
                    <img src={weatherImg} />
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

export default Weather;