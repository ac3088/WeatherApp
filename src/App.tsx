import Box from '@mui/material/Box';
import Container from '@mui/system/Container';
import Grid from '@mui/system/Unstable_Grid';
import Stack from '@mui/joy/Stack';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Switch from '@mui/material/Switch';

import ThermostatIcon from '@mui/icons-material/Thermostat';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudIcon from '@mui/icons-material/Cloud';
import AirIcon from '@mui/icons-material/Air';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './App.css'

const API_KEY: string = '25034e1902ed4c92981114031241501';

const boxStyles = {
  borderColor: 'black',
  border: 1,
  borderRadius: '16px',
  height: '12rem',
  width: '12rem',
  padding: '1rem',
  margin: 'auto',
};

function App() {

  function updateTemperature(city: string) {
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    const tempDisplayContainer: any = document.getElementById('temp-display');
    const extraInfoContainer: any = document.getElementById('extra-info-display');

    const temperatureP: any = document.getElementById('temperature-p');
    const conditionP: any = document.getElementById('condition-p');

    const precipP: any = document.getElementById('precip-p');
    const windP: any = document.getElementById('wind-p');
    const humidityP: any = document.getElementById('humidity-p');
    const feelsLikeP: any = document.getElementById('feelslike-p');
    const uvP: any = document.getElementById('uv-p');
    const visP: any = document.getElementById('vis-p');

    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        temperatureP.innerHTML = `${data.current.temp_c}°C`;
        conditionP.innerHTML = `${data.current.condition.text}`;

        precipP.innerHTML = `Precipitation<br />${data.current.precip_mm}mm`;
        windP.innerHTML = `Wind<br />${data.current.wind_kph}kph ${data.current.wind_dir}`;
        humidityP.innerHTML = `Humidity<br />${data.current.humidity}%`;
        feelsLikeP.innerHTML = `Feels Like<br />${data.current.feelslike_c}°C`;
        uvP.innerHTML = `UV Index<br />${data.current.uv}`;
        visP.innerHTML = `Visibility<br />${data.current.vis_km}km`;

        tempDisplayContainer.style.visibility = "visible";
        extraInfoContainer.style.visibility = "visible";

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
      <Stack id="main-stack">
        <Container id="search-bar">
          <TextField id="location-input" label="Location" variant="outlined" />
          <IconButton onClick={() => search()}><TravelExploreIcon fontSize="large" /></IconButton>
          {/* TODO: Implement switch for changing between Celcius and Fahrenheit (and miles and km) */}
        </Container>

        <Container id="temp-display">
          <Stack>
            <p id='temperature-p'>0°C</p>
            <p id='condition-p'>Clear</p>
          </Stack>
        </Container>

        <Container id="extra-info-display">
          <Grid container rowSpacing={8} sx={{ width: '75%', margin: 'auto' }}>
            <Grid xs={4}>
              <Box sx={{ ...boxStyles }}>
                <CloudIcon fontSize="large" />
                <p id='precip-p'>Precipitation<br />0mm</p>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Box sx={{ ...boxStyles }}>
                <AirIcon fontSize="large" />
                <p id='wind-p'>Wind<br />0kph N</p>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Box sx={{ ...boxStyles }}>
                <WaterDropIcon fontSize="large" />
                <p id='humidity-p'>Humidity<br />0%</p>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Box sx={{ ...boxStyles }}>
                <ThermostatIcon fontSize="large" />
                <p id='feelslike-p'>Feels Like<br />0°C</p>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Box sx={{ ...boxStyles }}>
                <WbTwilightIcon fontSize="large" />
                <p id='uv-p'>UV Index<br />0</p>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Box sx={{ ...boxStyles }}>
                <VisibilityIcon fontSize="large" />
                <p id='vis-p'>Visibility<br />0km</p>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </>
  )
}

export default App
