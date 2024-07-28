import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [resultHours, setResultHours] = useState('');
  const [resultMinutes, setResultMinutes] = useState('');
  const [resultStartTime, setStartTime] = useState('');
  const [resultBloodDownPeriod, setBloodDownPeriod] = useState('');
  const [resultBloodNormalPeriod, setBloodNormalPeriod] = useState('');
  const [resultFatBurningPeriod, setFatBurningPeriod] = useState('');
  const [resultKetosisPeriod, setKetosisPeriod] = useState('');

  function formatHoursToAMnPM(hours: number, minutes: number) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  const retrieveDataFromStorage = async (key: string) => {
    try {
      const serializedValue = await AsyncStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error('Failed to retrieve data from AsyncStorage:', error);
      return null;
    }
  };

  const storeData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save data to AsyncStorage:', error);
    }
  };

  const calculateFastingTime = (hours: number, minutes: number) => {
    let bloodDownPeriod = hours + 2;
    let bloodNormalPeriod = hours + 8;
    let fatBurningPeriod = hours + 10;
    let ketosisPeriod = hours + 14;
    let totalHours = hours + 16;
    let totalMinutes = minutes;

    if (totalMinutes >= 60) {
      totalHours += Math.floor(totalMinutes / 60);
      totalMinutes %= 60;
    }

    if (totalHours >= 24) {
      totalHours %= 24;
    }

    setResultHours(formatHoursToAMnPM(totalHours, totalMinutes));
    setResultMinutes(totalMinutes.toString());
    setStartTime(formatHoursToAMnPM(hours, minutes));
    setBloodDownPeriod(formatHoursToAMnPM(bloodDownPeriod, minutes));
    setBloodNormalPeriod(formatHoursToAMnPM(bloodNormalPeriod, minutes));
    setFatBurningPeriod(formatHoursToAMnPM(fatBurningPeriod, minutes));
    setKetosisPeriod(formatHoursToAMnPM(ketosisPeriod, minutes));
  };

  useEffect(() => {
    const uploadFromLocalStorage = async () => {
      const h = await retrieveDataFromStorage('inputHours');
      const m = await retrieveDataFromStorage('inputMinutes');
      setHours(h || '');
      setMinutes(m || '');
      calculateFastingTime(parseInt(h) || 0, parseInt(m) || 0);
    };
    uploadFromLocalStorage();
  }, []);

  const handleAddTime = () => {
    const inputHours = parseInt(hours) || 0;
    const inputMinutes = parseInt(minutes) || 0;
    storeData('inputHours', inputHours);
    storeData('inputMinutes', inputMinutes);
    calculateFastingTime(inputHours, inputMinutes);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#7c9177', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <View style={[styles.container, styles.shadowProp]}>
        <Text style={[styles.header, styles.shadowProp]}>
          Fast Starting Time
        </Text>
        <View style={[styles.inputContainer, styles.shadowProp]}>
          <TextInput
            style={[styles.inputHours, styles.shadowProp]}
            placeholder="00"
            keyboardType="numeric"
            value={hours}
            onChangeText={setHours}
          />
          <Text style={[styles.colon, styles.shadowProp]}>:</Text>
          <TextInput
            style={[styles.inputMM, styles.shadowProp]}
            placeholder="00"
            keyboardType="numeric"
            value={minutes}
            onChangeText={setMinutes}
          />
        </View>
        <Button title="Add 16 Hours" onPress={handleAddTime} />
        <View style={[styles.resultContainer, styles.shadowProp]}>
          <Text style={styles.resultDetailText}>Start: Blood Sugar Rises</Text>
          <Text style={[styles.result, styles.bloodSugerUpPeriod]}>{resultStartTime}</Text>

          <Text style={styles.resultDetailText}>(2h): Blood Sugar goes down</Text>
          <Text style={[styles.result, styles.bloodDownPeriod]}>{resultBloodDownPeriod}</Text>

          <Text style={styles.resultDetailText}>(8h): Blood Sugar goes to normal</Text>
          <Text style={[styles.result, styles.bloodNormalPeriod]}>{resultBloodNormalPeriod}</Text>

          <Text style={styles.resultDetailText}>(10h): Fat Burn (yeahhh!)</Text>
          <Text style={[styles.result, styles.fatBurningPeriod]}>{resultFatBurningPeriod}</Text>

          <Text style={styles.resultDetailText}>(14-16h): Ketosis</Text>
          <Text style={[styles.result, styles.ketosisPeriod]}>{resultKetosisPeriod}</Text>

          <Text style={styles.resultDetailText}>(16h): Autophagy</Text>
          <Text style={[styles.result, styles.autophagy]}>{resultHours}</Text>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  bloodSugerUpPeriod: { color: '#fc0a0a' },
  bloodDownPeriod: { color: '#ada824' },
  bloodNormalPeriod: { color: '#f8fc0a' },
  fatBurningPeriod: { color: '#fa6502' },
  ketosisPeriod: { color: '#62ad24' },
  autophagy: { color: '#2499ad' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000000',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#a1f9ff',
    opacity: 0.88,
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
    opacity: 0.88,
    borderColor: '#748071',
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#a1f9ff',
  },
  inputMM: {
    fontWeight: 'bold',
    width: 80,
    height: 40,
    opacity: 0.88,
    borderColor: '#748071',
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#a1f9ff',
  },
  colon: {
    fontSize: 24,
    marginHorizontal: 5,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    color: '#a1f9ff',
  },
  resultDetailText: {
    fontSize: 18,
    color: '#a1f9ff',
    fontWeight: 'bold',
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    opacity: 0.88,
  },
  reactLogo: {},
  shadowProp: {
    // Add shadow properties if necessary
  },
});
