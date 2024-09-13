import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ onFocusSearch }) => {
  const inputRef = useRef(null);
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    onFocusSearch();
  }
  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Search for a location"
        placeholderTextColor="#e9ecef"
        onFocus={handleFocus}
        returnKeyType="done"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 18,
    padding: 7,
  },
  input: {
    height: 50,
    backgroundColor: '#1b263b',
    borderRadius: 25,
    padding: 15,
    color: '#ffffff',
  },
});

export default SearchBar;
