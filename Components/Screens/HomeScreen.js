import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation
        };
    }

    render() {
        const { navigation } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this._openMenu}>
                        <Image
                            style={styles.btnMenu}
                            source={require('../../assets/icon/menu.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <Text>바이러스</Text>
                </View>
            </SafeAreaView>
        );
    }

    _openMenu = (event) => {
        event.stopPropagation();
        const { navigation } = this.state;
        navigation.navigate('MenuModal');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: "100%",
        height: "9%",
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    btnMenu: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        margin: 30
    }
});

export default HomeScreen;