import React from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const WordList = (props) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Text style={styles.text}>{props.word}</Text>
    </View>
  );
};

class IdeaScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: props.navigation,
    };
  }

  render() {
    const { navigation } = this.state;
    const { listTitle } = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.listTitleText}>{listTitle}</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.content}>
          <WordList word="바이러스" />
          <WordList word="교과서" />
          <WordList word="프로그래밍" />
        </View>
      </SafeAreaView>
    );
  }
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
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    padding: 30,
  },
  line: {
    width: width - 60,
    borderBottomColor: "#999",
    borderBottomWidth: 0.5,
    marginTop: 16,
  },
  text: {
    fontSize: 18,
    fontFamily: "Noto-Serif-KR",
  },
  listTitleText: {
    fontSize: 24,
    fontFamily: "Noto-Serif-KR",
  },
});

export default IdeaScreen;
