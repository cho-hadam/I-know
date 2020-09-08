import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: props.navigation,
    };
  }

  render() {
    const { navigation } = this.state;
    const { idea } = this.props.route.params;

    return <SafeAreaView style={{ flex: 1 }}></SafeAreaView>;
  }
}

const styles = StyleSheet.create({});

export default DetailScreen;
