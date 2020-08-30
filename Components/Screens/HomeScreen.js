import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

class HomeScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Idea"
                    onPress={() => navigation.navigate('Idea')}
                />
            </View>
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

export default HomeScreen;