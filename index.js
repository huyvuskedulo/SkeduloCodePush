import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DanceSettings from './mex/dance_settings';
import ReactNative2048 from './mex/game_2048/game_2048';
import globalData from './mex/global_data';
import TinderApp from './mex/tinder_swipe/tinder_app'

const { CalendarModule } = NativeModules;
const Stack = createNativeStackNavigator();

const MainScreen = ({ navigation }) => {

  const exit = function() {
    CalendarModule.exit()
  }

  const increaseNativeCount = function() {
    CalendarModule.increaseNativeCount()
  }

  const goToReactNative2048 = function() {
    navigation.navigate('ReactNative2048')
  }

  const goToCatTinder = function() {
    navigation.navigate('TinderApp')
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={exit} title="Exit" />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, {fontSize: 30}]}>React Native View</Text>

      <Text style={[styles.highScoresTitle, styles.text]}>
        RN Count Data: {globalData.count}
      </Text>

      <TouchableOpacity onPress={increaseNativeCount}>
        <View>
          <Text style={styles.button}>Increase Native Count 123</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToReactNative2048}>
        <View>
          <Text style={styles.button}>Play 2048</Text>
        </View>
      </TouchableOpacity>


      <TouchableOpacity onPress={goToCatTinder}>
        <View>
          <Text style={styles.button}>Cat Tinder</Text>
        </View>
      </TouchableOpacity>
    
    </View>
  );
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
          screenOptions={{
            contentStyle:{
              backgroundColor:'#04293A'
            },
            headerTintColor: '#FFFFFF',
            headerStyle: {
              backgroundColor: '#041C32',
            },      
        }}>
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
        <Stack.Screen
          name="ReactNative2048"
          component={ReactNative2048}
          options={{ title: '2048' }}
        />
          <Stack.Screen
          name="TinderApp"
          component={TinderApp}
          options={{ title: 'Cat Tinder' }}
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
  },
  highScoresTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  text: {
    color: '#FFFFFF'
  },
  button: {
    margin: 10,
    fontSize: 18,
    color: '#ECB365'
  },
  scores: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

const eventEmitter = new NativeEventEmitter(NativeModules.ReactNativeEventEmitter)
eventEmitter.addListener("increaseCount", () => {
  globalData.count++;
})
eventEmitter.addListener("onJobCompleted", () => {
  if (globalData.RN2048Score > 50) {
    return CalendarModule.callback("")
  } else {
    return CalendarModule.callback(JSON.stringify({
      "message": "You need to play 2048 with score above 50!",
      "redirectionUrl": "skedcodepush://extension/ReactNative2048?requireScore=50"
    }))
  }

})

// Module name
AppRegistry.registerComponent('RNHighScores', () => MyStack);
AppRegistry.registerComponent('ReactNative2048', () => ReactNative2048)
AppRegistry.registerComponent('CatTinder', () => TinderApp)