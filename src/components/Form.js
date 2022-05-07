import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Weather from './Weather';
import weatherImg from '../assets/sunnysky.png';
import DaytimeSun from '../assets/DaytimeSun.png';

const americanstates = ['AL','AK','AZ','AR','CA', 'CO','CT','DE','FL',
'GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA',
'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK',
'OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];



function Form() {
    //initialize state variables
    const [city, setCity] = useState('');
    const [stateProv, setStateProv] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [complete, setComplete] = useState(null);

    const handleSubmit = () => {
        const geoCall = 'http://api.openweathermap.org/geo/1.0/direct?q=';
        const key = process.env.REACT_APP_KEY;
        fetch(geoCall + city + "," + stateProv + ",USA&limit=5&appid=" + key)
            .then(response => response.json())
            .then(data => {
                setLat(data[0].lat)
                setLong(data[0].lon)
            });
        setComplete(true);
    }
    

    if (complete === null) {
        return (
            <div className="page">
            
                <form className="form">
                    <div className="title">
                        <p>Check the weather in your area</p>
                    </div>
                    <div className="city-box">
                        <TextField id="standard-basic" label="City/Town" variant="outlined"
                        onChange={({target}) => setCity(target.value)} value={city} style={{ width: '100%' }}/>
                    </div>
                    <div className="state-box">
                        <Autocomplete
                            id="standard-basic"
                            options={americanstates}
                            renderInput={(params) => <TextField {...params} label="State" 
                            onChange={({target}) => setStateProv(target.value)} value={stateProv} style={{ width: '100%' }}/>}
                        />
                    </div>
                    <div className='button-div'>
                        <Button id="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
                    </div>
                </form>
            </div>
        );
    }
    else {
        return (
            <div>
                <Weather lat={lat} long={long} city={city}/>
            </div>
            
        );
    }
}


    
    


export default Form;

