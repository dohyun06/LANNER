import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Calendar from './src/Calendar.js';

export default function App() {
  return (
    <View style={styles.container}>
      <Calendar style={{ flex: 1 }}></Calendar>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
