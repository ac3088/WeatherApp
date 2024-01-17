import Container from '@mui/system/Container';
import Grid from '@mui/system/Unstable_Grid';
import Stack from '@mui/joy/Stack';

import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudIcon from '@mui/icons-material/Cloud';
import AirIcon from '@mui/icons-material/Air';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './App.css'

const API_KEY: string = '25034e1902ed4c92981114031241501';

function App() {

  function updateTemperature(city: string) {
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
    const temperatureP: any = document.getElementById('temperature-p');
    const localtimeP: any = document.getElementById('localtime-p');
    const uvP: any = document.getElementById('uv-p');
    const humidityP: any = document.getElementById('humidity-p');
    const precipP: any = document.getElementById('precip-p');
    const windP: any = document.getElementById('wind-p');
    const visP: any = document.getElementById('vis-p');

    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        temperatureP.innerHTML = `${data.current.temp_c}°C`;
        localtimeP.innerHTML = `${data.location.localtime}`;
        uvP.innerHTML = `${data.current.uv}`;
        humidityP.innerHTML = `${data.current.humidity}%`;
        precipP.innerHTML = `${data.current.precip_mm}mm`;
        windP.innerHTML = `${data.current.wind_kph}kph ${data.current.wind_dir}`;
        visP.innerHTML = `${data.current.vis_km}km`;
        console.log(data);
      });
  }

  // TODO: Replace this whole process with a useState hook
  const search = () => {
    const input: any = document.getElementById('location-input');
    updateTemperature(input.value);
  }

  return (
    <>
      <Stack>
        <Container id="search-bar">
          <TextField id="location-input" label="Location" variant="outlined" />
          <IconButton onClick={() => search()}><TravelExploreIcon fontSize="large" /></IconButton>
        </Container>
        <Container id="temp-display">
          <p id='temperature-p'></p>
        </Container>
        <Container id="climate-display">
          <Grid container spacing={2}>
            <Grid xs={4}>
              <AccessTimeIcon fontSize="large" />
              <p id='localtime-p'></p>
            </Grid>
            <Grid xs={4}>
              <WbTwilightIcon fontSize="large" />
              <p id='uv-p'></p>
            </Grid>
            <Grid xs={4}>
              <WaterDropIcon fontSize="large" />
              <p id='humidity-p'></p>
            </Grid>
            <Grid xs={4}>
              <CloudIcon fontSize="large" />
              <p id='precip-p'></p>
            </Grid>
            <Grid xs={4}>
              <AirIcon fontSize="large" />
              <p id='wind-p'></p>
            </Grid>
            <Grid xs={4}>
              <VisibilityIcon fontSize="large" />
              <p id='vis-p'></p>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </>
  )
}

export default App
