import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import wordsData from "../../data/word_data.json";

let customFonts = {
  "Noto-Serif-KR": require("../../assets/fonts/NotoSerifKR-Regular.otf"),
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "",
      navigation: props.navigation,
      fontsLoaded: false,
      ideasLoaded: false,
      wordLoaded: false,
      isOpeningMenu: props.route.params,
      isHaveIdea: false,
      ideas: {},
      words: [],
    };
  }

  componentDidMount() {
    this._loadFontsAsync();
    this._loadIdeas();
    this._loadWord();
  }

  render() {
    const { navigation, isOpeningMenu, ideas, isHaveIdea, words } = this.state;

    if (
      this.state.fontsLoaded &&
      this.state.ideasLoaded &&
      this.state.wordLoaded
    ) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            {isOpeningMenu ? (
              <TouchableOpacity onPress={this._closeMenu}>
                <Image
                  style={styles.btnMenu}
                  source={require("../../assets/icon/close.png")}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this._openMenu}>
                <Image
                  style={styles.btnMenu}
                  source={require("../../assets/icon/menu.png")}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.content}>
            {isOpeningMenu ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("Write", {
                      word: words[0],
                      isEdit: false,
                      saveIdeas: this._saveIdeas,
                    })
                  }
                >
                  <Text style={[styles.textMenu, { marginBottom: 60 }]}>
                    글쓰기
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("List", {
                      listTitle: "아이디어",
                      ideas: ideas,
                      isHaveIdea: isHaveIdea,
                      showDetail: this._showDetail,
                    })
                  }
                >
                  <Text style={[styles.textMenu, { marginBottom: 60 }]}>
                    아이디어
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("List", {
                      listTitle: "단어",
                      words: words,
                    })
                  }
                >
                  <Text style={styles.textMenu}>단어</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.textWord}>{words[0]}</Text>
            )}
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
      fontsLoaded: true,
    });
  }

  async _loadIdeas() {
    try {
      const ideas = await AsyncStorage.getItem("ideas");
      const parsedIdeas = JSON.parse(ideas);
      this.setState({
        ideasLoaded: true,
        ideas: parsedIdeas,
      });
      if (this.state.ideas != null) {
        this.setState({
          isHaveIdea: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async _loadWord() {
    const { date, words } = this.state;

    const today = new Date();
    const currentDate = today.toISOString().substring(0, 10); // yyyy-mm-dd

    const rndNum = Math.floor(Math.random() * wordsData.length);

    if (date == "") {
      const dbDate = await AsyncStorage.getItem("date");
      const dbWords = await AsyncStorage.getItem("words");
      const parsedDate = JSON.parse(dbDate);
      const parsedWords = JSON.parse(dbWords);

      if (parsedWords == null) {
        this.setState({
          date: currentDate,
          word: wordsData[rndNum],
          words: [wordsData[rndNum]],
        });
      } else if (parsedDate != currentDate) {
        this.setState({
          date: currentDate,
          word: wordsData[rndNum],
          words: [wordsData[rndNum], ...parsedWords],
        });
      } else {
        this.setState({
          date: currentDate,
          word: parsedWords[0],
          words: parsedWords,
        });
      }
    } else if (date != currentDate) {
      this.setState({
        date: currentDate,
        word: wordsData[rndNum],
        words: [wordsData[rndNum], ...words],
      });
    }

    AsyncStorage.setItem("date", JSON.stringify(this.state.date));
    AsyncStorage.setItem("words", JSON.stringify(this.state.words));

    this.setState({
      wordLoaded: true,
    });
  }

  _openMenu = (event) => {
    event.stopPropagation();
    this.setState({
      isOpeningMenu: true,
    });
  };

  _closeMenu = (event) => {
    event.stopPropagation();
    this.setState({
      isOpeningMenu: false,
    });
  };

  _saveIdeas = (newIdea) => {
    const { ideas } = this.state;
    this.setState(() => {
      const newState = {
        ideas: {
          ...ideas,
          ...newIdea,
        },
        isHaveIdea: true,
      };
      this._saveStorage(newState.ideas);
      return { ...newState };
    });
  };

  _deleteIdea = (id) => {
    const { ideas } = this.state;
    delete ideas[id];
    this.setState(() => {
      const newState = {
        ideas: {
          ...ideas,
        },
        isHaveIdea: true,
      };
      this._saveStorage(newState.ideas);
      return { ...newState };
    });
  };

  _saveStorage = (ideas) => {
    AsyncStorage.setItem("ideas", JSON.stringify(ideas));
  };

  _showDetail = (id) => {
    const { navigation } = this.state;
    navigation.push("Detail", {
      idea: this.state.ideas[id],
      saveIdeas: this._saveIdeas,
      deleteIdea: this._deleteIdea,
    });
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
    justifyContent: "flex-end",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnMenu: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    margin: 30,
  },
  textWord: {
    fontSize: 30,
    fontFamily: "Noto-Serif-KR",
  },
  textMenu: {
    fontSize: 24,
    fontFamily: "Noto-Serif-KR",
  },
});

export default HomeScreen;
