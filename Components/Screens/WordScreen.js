import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

class WordScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <Text>Word Screen</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default WordScreen;