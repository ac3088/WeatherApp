import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import './App.css'

const apiKey: string = '25034e1902ed4c92981114031241501';

function updateTemperature(city: string) {
  const apiURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const temperatureP: any = document.getElementById('temperature-p');
  const uvP: any = document.getElementById('uv-p');
  const localtimeP: any = document.getElementById('localtime-p');

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      localtimeP.innerHTML = `Local Time: ${data.location.localtime}`;
      temperatureP.innerHTML = `Current Temperature: ${data.current.temp_c}°C`;
      uvP.innerHTML = `Current UV Index: ${data.current.uv}`;
      console.log(data);
    });
}

function App() {

  const search = () => {
    const input: any = document.getElementById('location-input');
    updateTemperature(input.value);
  }

  return (
    <>
      <div>
        <TextField id="location-input" label="Location" variant="outlined" />
        <IconButton onClick={() => search()}><TravelExploreIcon fontSize="large" /></IconButton>
      </div>
      <div className='weather-info'>
        <p id='temperature-p'></p>
        <p id='uv-p'></p>
        <p id='localtime-p'></p>
      </div>
    </>
  )
}

export default App
