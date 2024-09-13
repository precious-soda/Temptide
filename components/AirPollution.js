import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
const convertToUSAAQI = (aqi) => {
  switch (aqi) {
    case 1:
      return { range: '0-50', concern: 'Good', color: 'green' };
    case 2:
      return { range: '51-100', concern: 'Satisfactory', color: 'yellow' };
    case 3:
      return { range: '101-150', concern: 'Moderate', color: 'orange' };
    case 4:
      return { range: '151-200', concern: 'Poor', color: 'red' };
    case 5:
      return { range: '201-300', concern: 'Very Poor', color: 'purple' };
    case 6:
      return { range: '301-500', concern: 'Servere', color: 'maroon' };
    default:
      return { range: 'Unknown', concern: 'Unknown', color: 'gray' };
  }
};

export default function AirPollution({ data }) {
  const aqiData = convertToUSAAQI(data.list[0].main.aqi);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Air Quality</Text>
      <View style={styles.main}>
        <View style={[styles.dot, { backgroundColor: aqiData.color }]} />
        <Text style={styles.value}>  {aqiData.range} AQI  ·  {aqiData.concern}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  title: {
    fontSize: 16,
    color: '#E0E5F4',
    marginBottom: 10,
  },
  main: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1b263b',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  value: {
    color: '#e9ecef',
    fontSize: 13,
  },
  concernText: {
    color: '#e9ecef',
    fontSize: 14,
  },
});
