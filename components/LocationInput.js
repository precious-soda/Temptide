// LocationInput.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { LOCATIONIQ_API_KEY } from '@env';
import Icon from 'react-native-vector-icons/Ionicons'

const LocationInput = ({ navigation, route }) => {
  const { onLocationChange, requestPermission } = route.params;
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
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a location"
        placeholderTextColor="#e9ecef"
        value={query}
        onChangeText={setQuery}
        selectionColor="#ffffff"
        onSubmitEditing={handleSearch}
        returnKeyType="done"
      />
      <View style={styles.line} />
      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => requestPermission()}
        >
          <View style={styles.buttonView}>
            <Text style={styles.icon}>⦿</Text>
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
    paddingHorizontal: 15,
  },
  buttonContainer: {
    marginTop: 15,
  },
  buttonView: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: '#3f88c5',
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    fontSize: 13,
    color: '#000000'
  },
  buttonText: {
    fontSize: 12,
    color: '#000000',
    marginLeft: 10
  },
});

export default LocationInput;
