import React from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Idea from "../Idea";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const Word = (props) => {
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
      words: ["바이러스", "교과서", "프로그래밍"],
      ideas: props.route.params.ideas,
    };
  }

  render() {
    const { navigation, words, ideas } = this.state;
    const { listTitle } = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.listTitleText}>{listTitle}</Text>
          <View style={styles.line} />
        </View>
        <ScrollView style={styles.content}>
          {listTitle == "단어"
            ? words.reverse().map((word) => <Word word={word} />)
            : Object.values(ideas)
                .reverse()
                .map((idea) => <Idea key={idea.id} {...idea} />)}
        </ScrollView>
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
