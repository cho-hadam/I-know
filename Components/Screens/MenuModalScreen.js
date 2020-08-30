import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

class MenuModalScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <Text>Menu Screen</Text>
                <Button
                    title="Dismiss"
                    onPress={() => navigation.goBack('Idea')}
                />
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

export default MenuModalScreen;