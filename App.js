import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./Components/Screens/HomeScreen";
import IdeaScreen from "./Components/Screens/IdeaScreen";
import MenuModalScreen from './Components/Screens/MenuModalScreen';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

class MainStackScreen extends React.Component {
  render() {
    return (
      <MainStack.Navigator headerMode="none">
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="Idea" component={IdeaScreen} />
      </MainStack.Navigator>
    );
  }
}

class RootStackScreen extends React.Component {
  render() {
    return (
      <RootStack.Navigator mode="modal">
        <RootStack.Screen 
          name="Main" component={MainStackScreen} 
          options={{ headerShown: false }} 
        />
        <RootStack.Screen 
          name="MenuModal" 
          component={MenuModalScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    );
  }
}

export default App;