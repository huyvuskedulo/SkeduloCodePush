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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DanceSettings from './mex/dance_settings';

const Stack = createNativeStackNavigator();

const MainScreen = ({ navigation }) => {

  const { CalendarModule } = NativeModules;

  const exit = function() {
    CalendarModule.exit()
  }

  const increaseNativeCount = function() {
    CalendarModule.increaseNativeCount()
  }

  const goToDanceSettings = function() {
    navigation.navigate('DanceSettings')
  }

  return (
    <View style={styles.container}>

      <Text style={{fontSize: 30}}>React Native View</Text>

      <Text style={styles.highScoresTitle}>
        RN Count Data: {globalData.count}
      </Text>

      <Button title='Increase Native Count' onPress={increaseNativeCount}></Button>
    
      <Button title="Go to 'Can I dance settings'" onPress={goToDanceSettings}/>

      <Button title='exit' onPress={exit}></Button>

    </View>
  );
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="DanceSettings"
          component={DanceSettings}
          options={{ title: 'Dance Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
AppRegistry.registerComponent('RNHighScores', () => MyStack);
