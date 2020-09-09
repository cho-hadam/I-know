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

class ListScreen extends React.Component {
  render() {
    const {
      listTitle,
      ideas,
      isHaveIdea,
      words,
      showDetail,
    } = this.props.route.params;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.listTitleText}>{listTitle}</Text>
          <View style={styles.line} />
        </View>
        <ScrollView style={styles.content}>
          {listTitle == "단어" ? (
            words.map((word, index) => <Word key={index} word={word} />)
          ) : isHaveIdea ? (
            Object.values(ideas)
              .reverse()
              .map((idea, index) => (
                <Idea
                  key={index}
                  id={idea.id}
                  title={idea.title}
                  word={idea.word}
                  showDetail={showDetail}
                />
              ))
          ) : (
            <></>
          )}
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

export default ListScreen;
