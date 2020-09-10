import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

class WriteScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: props.navigation,
      title: "",
      idea: "",
      isEdit: props.route.params.isEdit,
    };
  }

  componentDidMount() {
    const { editIdea } = this.props.route.params;
    if (this.state.isEdit) {
      this.setState({
        title: editIdea.title,
        idea: editIdea.idea,
      });
    }
  }

  render() {
    const { navigation, title, idea, isEdit } = this.state;
    const { word, editIdea } = this.props.route.params;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
          enabled
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={this._cancelWrite}>
              <Text style={[styles.text, { color: "#999" }]}>취소</Text>
            </TouchableOpacity>
            {isEdit ? (
              <Text style={styles.text}>{editIdea.word}</Text>
            ) : (
              <Text style={styles.text}>{word}</Text>
            )}
            <TouchableOpacity onPress={this._completeWrite}>
              <Text style={[styles.text, { color: "#666" }]}>완료</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.inputTitleContainer}>
              <Text style={styles.text}>#</Text>
              <TextInput
                style={[styles.text, styles.input]}
                value={title}
                onChangeText={this._controlInputTitle}
                returnKeyType={"done"}
                placeholder={"제목"}
                placeholderTextColor={"#999"}
              />
            </View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <TextInput
                style={[styles.text, styles.inputIdea]}
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
    const { navigation, isEdit } = this.state;
    let msg;
    if (isEdit) {
      msg = "수정을 취소하시겠습니까?";
    } else {
      msg = "정말 글쓰기를 취소하시겠습니까?";
    }
    Alert.alert("취소", msg, [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  _controlInputTitle = (text) => {
    this.setState({
      title: text,
    });
  };

  _controlInputIdea = (text) => {
    this.setState({
      idea: text,
    });
  };

  _completeWrite = () => {
    const { saveIdeas, word, editIdea } = this.props.route.params;
    const { navigation, isEdit } = this.state;

    if (this.state.title == "") {
      Alert.alert("제목을 입력하세요.", "제목은 필수 입력 사항입니다.");
    } else {
      let ID, realWord;
      if (isEdit) {
        ID = editIdea.id;
        realWord = editIdea.word;
      } else {
        ID = Date.now();
        realWord = word;
      }
      const editedIdea = {
        id: ID,
        title: this.state.title,
        idea: this.state.idea,
        word: realWord,
      };
      const newIdea = {
        [ID]: {
          ...editedIdea,
        },
      };
      saveIdeas(newIdea);

      if (isEdit) {
        navigation.pop(3);
      } else {
        navigation.popToTop();
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: "9%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  content: {
    flex: 1,
    width: "100%",
    padding: 30,
  },
  inputTitleContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: "Noto-Serif-KR",
  },
  input: {
    marginLeft: 10,
    width: 333,
  },
  inputIdea: {
    flex: 1,
    marginTop: 35,
    paddingBottom: 20,
    textAlignVertical: "top",
  },
});

export default WriteScreen;
