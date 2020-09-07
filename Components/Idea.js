import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class Idea extends React.Component {
  render() {
    const { showDetail, title, word, id } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={(event) => {
            event.stopPropagation();
            showDetail(id);
          }}
        >
          <Text style={[styles.text, styles.title]}>{title}</Text>
          <Text style={[styles.text, styles.word, { color: "#666" }]}>
            # {word}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    fontFamily: "Noto-Serif-KR",
  },
  title: {
    flex: 2,
  },
  word: {
    flex: 1,
    textAlign: "right",
  },
});

export default Idea;
