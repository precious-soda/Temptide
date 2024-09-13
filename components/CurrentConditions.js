import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function CurrentConditions({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Conditions</Text>

      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Wind</Text>
              <Text style={styles.sectionText}>{(data.wind.speed * 3.6).toFixed(1)} km/h</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Humidity</Text>
              <Text style={styles.sectionText}>{data.main.humidity}%</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pressure</Text>
              <Text style={styles.sectionText}>{data.main.pressure} mBar</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Visibility</Text>
              <Text style={styles.sectionText}>{(data.visibility / 1000).toFixed(1)} km/h</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  title: {
    fontSize: 16,
    color: '#E0E5F4',
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  section: {
    flex: 1,
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b263b',
  },
  sectionTitle: {
    fontSize: 12,
    color: '#adb5bd',
  },
  sectionText: {
    fontSize: 15,
    color: '#e9ecef',
  },
});

export default CurrentConditions;
