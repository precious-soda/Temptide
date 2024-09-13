import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import moment from 'moment';

const HourlyWeather = ({ data }) => {
  const hourlyData = data.list
    .slice(0, 10)
    .map((item) => ({
      time: moment.unix(item.dt).format('h A'),
      temp: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));

  const renderHourlyItem = ({ item }) => (
    <View style={styles.hourlyItem}>
      <Text style={styles.temp}>{item.temp}°</Text>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hourly Forecast</Text>
      <FlatList
        data={hourlyData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderHourlyItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.listitems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    // paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    color: '#E0E5F4',
    marginBottom: 10,
  },
  hourlyItem: {
    display: 'flex',
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 10,
    color: '#adb5bd',
  },
  temp: {
    fontSize: 13,
    marginBottom: 8,
    color: '#e9ecef',
  },
  listitems: {
    padding: 15,
    backgroundColor: '#1b263b',
    borderRadius: 5
  },
  description: {
    fontSize: 10,
    color: '#adb5bd',
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 8,
  },
});

export default HourlyWeather;
