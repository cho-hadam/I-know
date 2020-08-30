import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

let customFonts = {
    'Noto-Serif-KR': require('../../assets/fonts/NotoSerifKR-Regular.otf')
};

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            fontsLoaded: false
        };
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    render() {
        const { navigation } = this.state;

        if (this.state.fontsLoaded) {
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
                    <View style={styles.content}>
                        <Text style={styles.textWord}>바이러스</Text>
                    </View>
                </SafeAreaView>
            );
        } else {
            return <AppLoading />;
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({
            ...this.state,
            fontsLoaded: true
        })
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
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    btnMenu: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        margin: 30
    },
    textWord: {
        fontSize: 30,
        fontFamily: 'Noto-Serif-KR'
    }
});

export default HomeScreen;