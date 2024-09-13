import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import CurrentWeather from './CurrentWeather.js';
import HourlyWeather from './HourlyWeather.js';
import CurrentConditions from './CurrentConditions.js';
import AirPollution from './AirPollution.js';
import SearchBar from './SearchBar.js';
import { getHourlyWeatherData, getWeatherData, getAQIData } from '../apiService.js';
import axios from 'axios';
import { LOCATIONIQ_API_KEY } from '@env';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Home = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [mLat, setMLat] = useState(0);
  const [mLong, setMLong] = useState(0);
  const [value, setValue] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const debouncedLat = useDebounce(mLat, 3000);
  const debouncedLong = useDebounce(mLong, 3000);
  const debouncedPermissionGranted = useDebounce(permissionGranted, 3000);

  const reverseGeocoding = async () => {
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/reverse`, {
        params: {
          key: LOCATIONIQ_API_KEY,
          lat: debouncedLat,
          lon: debouncedLong,
          format: 'json',
        },
      });
      setValue(response.data.address);
      console.log(response.data.address);
    } catch (error) {
      console.error(error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission Required',
          message: 'This app needs access to your location to show weather data.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true);
        getLocation();
      } else {
        setPermissionGranted(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setMLat(position.coords.latitude);
        setMLong(position.coords.longitude);
      },
      (error) => {
        Alert.alert('Location Error', 'Unable to fetch location. Please turn on location services.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (!debouncedLat || !debouncedLong) return;
      const weather = await getWeatherData(debouncedLat, debouncedLong);
      if (weather) setWeatherData(weather);
    };

    const fetchHourlyWeather = async () => {
      if (!debouncedLat || !debouncedLong) return;
      const hourlyWeather = await getHourlyWeatherData(debouncedLat, debouncedLong);
      if (hourlyWeather) setHourlyWeatherData(hourlyWeather);
    };

    const fetchAQI = async () => {
      if (!debouncedLat || !debouncedLong) return;
      const AQI = await getAQIData(debouncedLat, debouncedLong);
      if (AQI) setAqi(AQI);
    };

    const loadData = async () => {
      await Promise.all([fetchWeather(), fetchHourlyWeather(), fetchAQI(), reverseGeocoding()]);
      setIsDataLoaded(true);
    }

    loadData()
  }, [debouncedLat, debouncedLong]);

  useEffect(() => {
    if (isDataLoaded) {
      navigation.goBack();
    }
  }, [isDataLoaded]);

  const locationChange = (lat, lon) => {
    setMLat(lat);
    setMLong(lon);
  };

  return !weatherData || !hourlyWeatherData || !aqi ? (
    <View style={styles.container}>
      <SearchBar
        value={value}
        onFocusSearch={() =>
          navigation.navigate('LocationInput', {
            onLocationChange: locationChange,
            requestPermission: requestLocationPermission,
          })
        }
      />
    </View>
  ) : (
    <View style={styles.container}>
      <SearchBar
        value={value}
        onFocusSearch={() =>
          navigation.navigate('LocationInput', {
            onLocationChange: locationChange,
            requestPermission: requestLocationPermission,
          })
        }
      />
      <CurrentWeather data={weatherData} />
      <HourlyWeather data={hourlyWeatherData} />
      <CurrentConditions data={weatherData} />
      <AirPollution data={aqi} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#415a77',
  },
});
