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
       <View style={[styles.container, styles.shadowProp]}>
      <Text style={[styles.header, styles.shadowProp]}>When are you starting your fast?</Text>
      <View style={[styles.inputContainer, styles.shadowProp]}>
        <TextInput
          style={[styles.inputHours, styles.shadowProp]}
          placeholder="00"
          keyboardType="numeric"
          value={hours}
          onChangeText={text => setHours(text)}
        />
        <Text style={[styles.colon, styles.shadowProp]}>:</Text>
        <TextInput
          style={[styles.inputMM, styles.shadowProp]}
          placeholder="00"
          keyboardType="numeric"
          value={minutes}
          onChangeText={text => setMinutes(text)}
        />
      </View>
      <Button  title="Add 16 Hours" onPress={handleAddTime} />
      <View style={[styles.resultContainer, styles.shadowProp]}>
        <Text style={[styles.resultText, styles.shadowProp]}>Result</Text>
        <Text style={[styles.result, styles.shadowProp]}>{resultHours}:{resultMinutes}</Text>
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
    backgroundColor: '#7c9177',
    shadowOpacity: 0.5,
    shadowColor: '#fff',
    textShadowRadius:2,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#485745',
     opacity: 0.5
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputHours: {
    fontWeight: 'bold',
    width: 80,
    height: 40,
    opacity: 0.5,
    borderColor: '#748071',
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 18,
    color:'#b6c4b3'
  },
  inputMM: {
     fontWeight: 'bold',
    width: 80,
    height: 40,
    opacity: 0.5,
    borderColor: '#748071',
    borderWidth: 1,
    paddingHorizontal: 10,
     textAlign: 'center',
    fontSize: 18,
    color:'#b6c4b3'
  },
  colon: {
    fontSize: 24,
    marginHorizontal: 5,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    color:'#9c2796'
  },
  resultText: {
    fontSize: 18,
    color: '#485745',
    fontWeight: 'bold',
     opacity: 0.5
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#b6c4b3',
     opacity: 0.5
  },
  reactLogo: {},
  Shit: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  shadowProp: {
    textShadowColor: '#6e7d6a',
    shadowOpacity: 0.5, 
    textShadowRadius: 3,
  },
});
