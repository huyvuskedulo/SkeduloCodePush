import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
  NativeEventEmitter
} from 'react-native';

const RNHighScores = ({ scores }) => {

  const { CalendarModule } = NativeModules;

  console.log("WHAT", NativeModules.ReactNativeEventEmitter)

  const exit = function() {
    CalendarModule.exit()
  }

  const increaseNativeCount = function() {
    CalendarModule.increaseNativeCount()
  }

  return (
    <View style={styles.container}>

      <Text style={{fontSize: 30}}>React Native View</Text>

      <Text style={styles.highScoresTitle}>
        RN Count Data: {globalData.count}
      </Text>

      <Button title='exit' onPress={exit}></Button>

      <Button title='Increase Native Count' onPress={increaseNativeCount}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
    backgroundColor: '#FFFFFF'
  },
  highScoresTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  scores: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

console.log("start")

const globalData = {
  count: 0
}

const eventEmitter = new NativeEventEmitter(NativeModules.ReactNativeEventEmitter)
eventEmitter.addListener("increaseCount", () => {
  globalData.count++;
})

// Module name
AppRegistry.registerComponent('RNHighScores', () => RNHighScores);
