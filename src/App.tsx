import { useState } from 'react';

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

var boxStyles = {
  border: 1,
  borderRadius: '16px',
  height: '12rem',
  width: '12rem',
  padding: '1rem',
  margin: 'auto',
};

interface Background {
  '--background-color': string,
  '--background-image': string,
  '--color': string,
}
const backgrounds: { [key: string]: Background } = {
  day: {
    '--background-color': 'rgb(92,160,242)',
    '--background-image': 'linear-gradient(315deg, rgba(92,160,242,1) 0%, rgba(245,247,246,1) 74%)',
    '--color': 'black',
  },
  morning: {
    '--background-color': 'rgb(150,197,255)',
    '--background-image': 'linear-gradient(315deg, rgba(150,197,255,1) 16%, rgba(235,244,188,1) 75%)',
    '--color': 'black',
  },
  night: {
    '--background-color': 'rgb(0,25,42)',
    '--background-image': 'linear-gradient(315deg, rgba(0,25,42,1) 0%, rgba(245,247,246,1) 85%)',
    '--color': 'black',
  }
}

function changeBackground(condition: string) {
  const root = document.documentElement;
  const theme: Background = backgrounds[condition];

  for (const key in theme) {
    root.style.setProperty(key, theme[key as keyof Background]);
  }
}

function App() {

  const [location, setLocation] = useState("");

  function updateWeather(city: string) {
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    function setElementContent(id: string, content: string) {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = content;
      }
    }

    function setElementVisibility(id: string, visibility: string) {
      const element = document.getElementById(id);
      if (element) {
        element.style.visibility = visibility;
      }
    }

    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        setElementContent('temperature-p', `${data.current.temp_c}°C`);
        setElementContent('condition-p', `${data.current.condition.text}`);
        setElementContent('precip-p', `Precipitation<br />${data.current.precip_mm}mm`);
        setElementContent('wind-p', `Wind<br />${data.current.wind_kph}kph ${data.current.wind_dir}`);
        setElementContent('humidity-p', `Humidity<br />${data.current.humidity}%`);
        setElementContent('feelslike-p', `Feels Like<br />${data.current.feelslike_c}°C`);
        setElementContent('uv-p', `UV Index<br />${data.current.uv}`);
        setElementContent('vis-p', `Visibility<br />${data.current.vis_km}km`);
        setElementVisibility('temp-display', 'visible');
        setElementVisibility('extra-info-display', 'visible');

        const localtime = data.location.localtime.split(' ');
        const hour = localtime[1].split(':')[0];
        if (hour <= 6 || hour >= 20) {
          changeBackground('night');
        }
        else if (hour > 6 && hour < 10) {
          changeBackground('morning');
        }
        else {
          changeBackground('day');
        }

        console.log(data);
      });
  }

  // TODO: Localtime somewhere?
  return (
    <>
      <Stack id="main-stack">
        <Container id="search-bar">
          <TextField id="location-input" label="Location" variant="outlined" onChange={event => setLocation(event.target.value)} />
          <IconButton onClick={() => updateWeather(location)}><TravelExploreIcon fontSize="large" /></IconButton>
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
