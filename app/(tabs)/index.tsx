import { Image, StyleSheet, Platform,View, Text, TextInput, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
//import { Icon } from 'react-native-elements';


export default function HomeScreen() {


  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [resultHours, setResultHours] = useState('');
  const [resultMinutes, setResultMinutes] = useState('');

  const handleAddTime = () => {
    // Convert input to integers
    let inputHours = parseInt(hours) || 0;
    let inputMinutes = parseInt(minutes) || 0;

    // Add 16 hours and calculate new time
    let totalHours = inputHours + 16;
    let totalMinutes = inputMinutes;

    // Adjust minutes if it exceeds 59
    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes = totalMinutes % 60;
    }

    // Adjust hours if it exceeds 23
    if (totalHours >= 24) {
      totalHours = totalHours % 24;
    }

    // Update state with the result
    setResultHours(totalHours.toString());
    setResultMinutes(totalMinutes.toString());
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
       <View style={styles.container}>
      <Text style={styles.header}>Time Addition App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter hours"
          keyboardType="numeric"
          value={hours}
          onChangeText={text => setHours(text)}
        />
        <Text style={styles.colon}>:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter minutes"
          keyboardType="numeric"
          value={minutes}
          onChangeText={text => setMinutes(text)}
        />
      </View>
      <Button title="Add 16 Hours" onPress={handleAddTime} />
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Result:</Text>
        <Text style={styles.result}>{resultHours}:{resultMinutes}</Text>
      </View>
    </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: 80,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  colon: {
    fontSize: 24,
    marginHorizontal: 5,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
