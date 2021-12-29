import {useEffect, useState} from 'react';
import {StatusBar as StatusBarReact, TouchableOpacity} from 'react-native';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {useFonts, Anton_400Regular} from '@expo-google-fonts/anton';
import {Rajdhani_400Regular} from '@expo-google-fonts/rajdhani';
import {LinearGradient} from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import colors from './constants/colors';

export default function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  let [fontsLoaded] = useFonts({
    Anton_400Regular,
    Rajdhani_400Regular,
  });

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        clearInterval(interval);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = 25;
            let seconds = 59;

            setSeconds(seconds);
            setMinutes(minutes);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
  }, [isRunning, seconds]);

  if (!fontsLoaded) {
    return null;
  }

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <>
      <StatusBar style="auto" backgroundColor={colors.primary} />
      <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.container}>
        <View style={styles.containerIntern}>
          <Text style={styles.text}>
            {timerMinutes}:{timerSeconds}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsRunning(true);
            }}>
            <Text style={styles.textButton}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setMinutes(25);
              setSeconds(0);
            }}>
            <Text style={styles.textButton}>Reset</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBarReact.currentHeight : 0,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerIntern: {
    minHeight: '50%',
    maxHeight: '50%',
    maxWidth: '95%',
    minWidth: '95%',
    backgroundColor: 'rgba(90,90, 90,0.5)',
    borderRadius: 7,
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
    fontSize: 110,
    color: 'white',
    fontFamily: `Anton_400Regular`,
    textShadowOffset: {width: 3, height: 8},
    textShadowColor: '#81655F',
    textShadowRadius: 10,
  },

  button: {
    backgroundColor: 'white',
    borderRadius: 7,
    elevation: 10,
    marginTop: 10,
    width: '30%',
    padding: 15,
    alignItems: 'center',
  },

  textButton: {
    color: 'black',
    fontSize: 20,
    fontFamily: `Rajdhani_400Regular`,
  },
});
