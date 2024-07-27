import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
//import { Icon } from 'react-native-elements';

export default function HomeScreen() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [resultHours, setResultHours] = useState("");
  const [resultMinutes, setResultMinutes] = useState("");

  const [resultStartTime, setStartTime] = useState("");
  const [resultbloodDownPeriod, setbloodDownPeriod] = useState("");
  const [resultbloodNormalPeriod, setbloodNormalPeriod] = useState("");
  const [resultfatBurningPeriod, setfatBurningPeriod] = useState("");
  const [resultketosisPeriod, setketosisPeriod] = useState("");

  const handleAddTime = () => {
    // Convert input to integers
    let inputHours = parseInt(hours) || 0;
    let inputMinutes = parseInt(minutes) || 0;

    // Add  hours and calculate new time
    let bloodDownPeriod = inputHours + 2;
    let bloodNormalPeriod = inputHours + 8;
    let fatBurningPeriod = inputHours + 10;
    let ketosisPeriod = inputHours + 14;
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
    // houres convertion
    //const [hours24, minutes] = totalHours.split(':').map(Number);

    // Determine AM or PM suffix
    let finalHour = formatHoursToAMnPM(totalHours);

    // Update state with the result
    setResultHours(finalHour);
    setResultMinutes(totalMinutes.toString());
    setStartTime(formatHoursToAMnPM(inputHours));
    setbloodDownPeriod(formatHoursToAMnPM(bloodDownPeriod));
    setbloodNormalPeriod(formatHoursToAMnPM(bloodNormalPeriod));
    setfatBurningPeriod(formatHoursToAMnPM(fatBurningPeriod));
    setketosisPeriod(formatHoursToAMnPM(ketosisPeriod));

    //Helper functions
    function formatHoursToAMnPM(hours: number) {
      const period = hours >= 12 ? "PM" : "AM";
      // Convert hours from 24-hour to 12-hour format
      const hours12 = hours % 12 || 12;
      // Format the hours and minutes into a 12-hour time string
      return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#7c9177", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
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
            onChangeText={(text) => setHours(text)}
          />
          <Text style={[styles.colon, styles.shadowProp]}>:</Text>
          <TextInput
            style={[styles.inputMM, styles.shadowProp]}
            placeholder="00"
            keyboardType="numeric"
            value={minutes}
            onChangeText={(text) => setMinutes(text)}
          />
        </View>
        <Button title="Add 16 Hours" onPress={handleAddTime} />
        <View style={[styles.resultContainer, styles.shadowProp]}>
          <Text style={[styles.resultDetailText]}>Start:Blood Sugar Rises</Text>
          <Text style={[styles.result, styles.shadowProp, styles.bloodSugerUpPeriod]}>{resultStartTime}</Text>

          <Text style={[styles.resultDetailText]}>
            (2h):Blood Sugar goes down
          </Text>
          <Text style={[styles.result, styles.shadowProp, styles.bloodDownPeriod]}>{resultbloodDownPeriod}</Text>

          <Text style={[styles.resultDetailText]}>
            (8h):Blood Sugar goes to normal
          </Text>
          <Text style={[styles.result, styles.shadowProp, styles.bloodNormalPeriod]}>{resultbloodNormalPeriod}</Text>

          <Text style={[styles.resultDetailText]}>
            (10h):Fat Burn (yeahhh!)
          </Text>
          <Text style={[styles.result, styles.shadowProp, styles.fatBurningPeriod]}>{resultfatBurningPeriod}</Text>

          <Text style={[styles.resultDetailText]}>(14-16h):Ketosis</Text>
          <Text style={[styles.result, styles.shadowProp, styles.ketosisPeriod]}>{resultketosisPeriod}</Text>

          <Text style={[styles.resultDetailText]}>(16h):Autophagy</Text>
          <Text style={[styles.result, styles.shadowProp, styles.autophagy]}>{resultHours}</Text>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  bloodSugerUpPeriod: { color: "#fc0a0a"},
  bloodDownPeriod:  { color:"#ada824"},
  bloodNormalPeriod:  { color:  "#f8fc0a"},
  fatBurningPeriod:  { color: "#fa6502"},
  ketosisPeriod: { color: "#62ad24" },
   autophagy:  { color: "#2499ad"},
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#000000",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#a1f9ff",
    opacity: 0.88,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputHours: {
    fontWeight: "bold",
    width: 80,
    height: 40,
    opacity: 0.88,
    borderColor: "#748071",
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: 18,
    color: "#a1f9ff",
  },
  inputMM: {
    fontWeight: "bold",
    width: 80,
    height: 40,
    opacity: 0.88,
    borderColor: "#748071",
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: 18,
    color: "#a1f9ff",
  },
  colon: {
    fontSize: 24,
    marginHorizontal: 5,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
    color: "#a1f9ff",
  },
  resultText: {
    fontSize: 18,
    color: "#a1f9ff",
    fontWeight: "bold",
    opacity: 0.88,
  },
  resultDetailText: {
    fontSize: 18,
    color: "#a1f9ff",
    fontWeight: "bold",
  },
  result: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    opacity: 0.88,
  },
  reactLogo: {},
  Shit: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  shadowProp: {
    textShadowColor: "#6e7d6a",
    shadowOpacity: 0.1,
    textShadowRadius: 1,
  },
});
