import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./Components/Screens/HomeScreen";
import IdeaScreen from "./Components/Screens/IdeaScreen";
import WriteScreen from "./Components/Screens/WriteScreen";
import WordScreen from "./Components/Screens/WordScreen";

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Write"
            component={WriteScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="Idea" component={IdeaScreen} />
          <Stack.Screen name="Word" component={WordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
