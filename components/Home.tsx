import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { ScrollView,  Alert, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import CurrentWeather from './CurrentWeather.js';
import HourlyWeather from './HourlyWeather.js';
import CurrentConditions from './CurrentConditions.js';
import AirPollution from './AirPollution.js';
import SearchBar from './SearchBar.js';
import { getHourlyWeatherData, getWeatherData, getAQIData } from '../apiService.js';

const Home = ({navigation}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [mLat, setMLat] = useState(0);
  const [mLong, setMLong] = useState(0);

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
        getLocation();
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
    requestLocationPermission();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!mLat || !mLong) return;
      const weather = await getWeatherData(mLat, mLong);
      if (weather) setWeatherData(weather);
    };

    const fetchHourlyWeather = async () => {
      if (!mLat || !mLong) return;
      const hourlyWeather = await getHourlyWeatherData(mLat, mLong);
      if (hourlyWeather) setHourlyWeatherData(hourlyWeather);
    };

    const fetchAQI = async () => {
      if (!mLat || !mLong) return;
      const AQI = await getAQIData(mLat, mLong);
      if (AQI) setAqi(AQI);
    };

    fetchWeather();
    fetchHourlyWeather();
    fetchAQI();
  }, [mLat, mLong]);


  const locationChange = (lat, lon) => {
    setMLat(lat);
    setMLong(lon);
    navigation.goBack();
  };
  
  return (
    !weatherData || !hourlyWeatherData || !aqi)?(
      <View style={styles.container}>
          <SearchBar onFocusSearch={() => navigation.navigate('LocationInput', { onLocationChange: locationChange }) }/>
      </View>
    ):(
      <View style={styles.container}>
      <SearchBar onFocusSearch={() => navigation.navigate('LocationInput', { onLocationChange: locationChange })} />
      <CurrentWeather data={weatherData} />
      <HourlyWeather data={hourlyWeatherData} />
      <CurrentConditions data={weatherData} />
      <AirPollution data={aqi} />
    </View>
    )  

  }
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#415a77',
  },
})