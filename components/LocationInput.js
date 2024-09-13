import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, PermissionsAndroid, Platform, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { LOCATIONIQ_API_KEY } from '@env'

const LocationInput = ({ navigation, route }) => {
  const { onLocationChange } = route.params;

  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
        params: {
          key: LOCATIONIQ_API_KEY,
          q: query,
          format: 'json',
        },
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        onLocationChange(lat, lon);
      } else {
        Alert.alert('No results found');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching the data');
      console.error(error);
    }
  };

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location Permission Required',
  //         message: 'This app needs access to your location to show weather data.',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       }
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       Alert.alert('Permission granted', 'Location access has been enabled.');
  //     } else {
  //       Alert.alert('Permission denied', 'Location access is required to fetch data.');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a location"
        placeholderTextColor="#e9ecef"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="done"
      />
      <View style={styles.line} />
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.buttonContainer}
        >
          <View style={styles.buttonView}>
            <Text style={styles.buttonText}>Use precise location</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#415a77',
  },
  input: {
    height: 50,
    padding: 15,
    color: '#ffffff',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  container2: {
    paddingHorizontal: 15
  },
  buttonContainer: {
    marginTop: 15
  },
  buttonView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: '#48cae4',
    alignSelf: 'flex-start'
  },
  buttonText: {
    fontSize: 11,
    color: '#000000'
  }
});

export default LocationInput;
