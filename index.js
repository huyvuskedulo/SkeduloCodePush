import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DanceSettings from './mex/dance_settings';
import ReactNative2048 from './mex/game_2048/game_2048';
import globalData from './mex/global_data';
import NativeBlur from './mex/native_blur/native_blur'
import TinderApp from './mex/tinder_swipe/tinder_app'
import MyBigList from './mex/big_list/my_big_list'

const { CalendarModule } = NativeModules;
const Stack = createNativeStackNavigator();

const MainScreen = ({ navigation }) => {

  const exit = function() {
    CalendarModule.exit()
  }

  const goToReactNative2048 = function() {
    navigation.navigate('ReactNative2048')
  }

  const goToCatTinder = function() {
    navigation.navigate('TinderApp')
  }

  const goToNativeBlur = function() {
    navigation.navigate('NativeBlur')
  }

  const goToBigList = function() {
    navigation.navigate('BigList')
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

      <TouchableOpacity onPress={goToNativeBlur}>
        <View>
          <Text style={styles.button}>Native Blur</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToBigList}>
        <View>
          <Text style={styles.button}>Big List</Text>
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
          options={{ title: 'Cat Tinder',   
            headerStyle: {
              backgroundColor: '#F08F90',
            },       
          }}
        />
        <Stack.Screen
          name="BigList"
          component={MyBigList}
          options={{ title: 'Big List' }}
        />

        <Stack.Screen
          name="NativeBlur"
          component={NativeBlur}
          options={{ title: 'Native Blur' }}
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
    backgroundColor: 'green'
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