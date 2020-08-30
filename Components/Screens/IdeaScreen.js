import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

class IdeaScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        const { post } = this.props.route.params;
        return (
            <View style={styles.container}>
                <Text>Idea Screen</Text>
                <Text>{post}</Text>
                <Button
                    title="Go to Idea... again"
                    onPress={() => navigation.push('Idea')}
                />
                <Button
                    title="Go to Home"
                    onPress={() => navigation.push('Home')}
                />
                <Button
                    title="Go back"
                    onPress={() => navigation.goBack()}
                />
                <Button
                    title="Go back to first screen in stack"
                    onPress={() => navigation.popToTop()}
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

export default IdeaScreen;