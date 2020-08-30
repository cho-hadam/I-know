import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput,
    KeyboardAvoidingView,
    Keyboard
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

class WriteScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navigation: props.navigation,
            title: "",
            idea: ""
        };
    }
    
    render() {
        const { navigation, title, idea } = this.state;
        const { word } = this.props.route.params;

        return (
            <SafeAreaView style={{ flex:1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.container}
                    enabled
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={this._cancelWrite}>
                            <Text style={[styles.text, {color: "#999"}]}>취소</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>{word}</Text>
                        <TouchableOpacity onPress={this._completeWrite}>
                            <Text style={[styles.text, {color: "#666"}]}>완료</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.inputTitleContainer}>
                            <Text style={styles.text}>#</Text>
                            <TextInput 
                                style={[
                                    styles.text,
                                    styles.input
                                ]}
                                value={title}
                                onChangeText={this._controlInputTitle}
                                returnKeyType={"done"}
                                placeholder={"제목"}
                                placeholderTextColor={"#999"}
                            />
                        </View>
                        <TouchableWithoutFeedback
                            onPress={() => Keyboard.dismiss()}
                        >
                            <TextInput 
                                style={[
                                    styles.text,
                                    {marginTop: 35,
                                    paddingBottom: 20}
                                ]}
                                value={idea}
                                onChangeText={this._controlInputIdea}
                                multiline={true}
                                placeholder={"아이디어를 입력하세요."}
                                placeholderTextColor={"#999"}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    _cancelWrite = () => {
        const { navigation } = this.state;
        navigation.goBack();
    }

    _controlInputTitle = (text) => {
        this.setState({
            title: text
        });
    };

    _controlInputIdea = (text) => {
        this.setState({
            idea: text
        });
    };
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
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 30,
        paddingRight: 30
    },
    content: {
        flex: 1,
        width: "100%",
        padding: 30
    },
    inputTitleContainer: {
        flexDirection: "row",
        marginTop: 20
    },
    text: {
        fontSize: 18,
        fontFamily: 'Noto-Serif-KR'
    },
    input: {
        marginLeft: 10,
        width: 333
    }
});

export default WriteScreen;