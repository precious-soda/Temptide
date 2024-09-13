import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';


const SearchBar = ({ value, onFocusSearch }) => {
  const [address, setAddress] = useState(`Search for a location`);

  useEffect(() => {
    if (value?.county && value?.state) {
      setAddress(`${value.county}, ${value.state}`);
    } else {
      setAddress('Search for a location');
    }
  }, [value]);


  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onFocusSearch}
    >
      <View >
        <Text style={styles.text}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#1b263b',
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
  },
  text: {
    color: '#ffffff',
  }
});

export default SearchBar;
