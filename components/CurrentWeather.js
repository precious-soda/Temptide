import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CurrentWeather = ({ data }) => {
  return (
    <View style={styles.container}>

      <View style={styles.left}>
        <Text style={styles.title}>Now</Text>
        {/* <View style={styles.current}> */}
        <Text style={styles.temperature}>{Math.round(data.main.temp)}°</Text>
        {/* </View> */}

        <Text style={styles.description}>
          High: {Math.round(data.main.temp_max)}° Low: {Math.round(data.main.temp_min)}°
        </Text>

      </View>

      <View style={styles.right}>
        <Text style={styles.sky} >{data.weather[0].description}</Text>
        <Text style={styles.description}>Feels like {Math.round(data.main.temp_min)}°</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18
  },
  title: {
    color: '#adb5bd',
    fontSize: 16,
    marginBottom: 8
  },
  current: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  temperature: {
    fontSize: 48,
    color: '#e9ecef',
  },
  right: {
    alignItems: 'flex-end',
  },
  sky: {
    fontSize: 16,
    color: '#e9ecef'
  },
  description: {
    fontSize: 11,
    color: '#adb5bd'
  }
});
export default CurrentWeather;
