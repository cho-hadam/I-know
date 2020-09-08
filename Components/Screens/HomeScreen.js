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

let customFonts = {
  "Noto-Serif-KR": require("../../assets/fonts/NotoSerifKR-Regular.otf"),
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: props.navigation,
      fontsLoaded: false,
      ideasLoaded: false,
      isOpeningMenu: false,
      isHaveIdea: false,
      word: "바이러스",
      ideas: {},
      words: ["바이러스", "교과서", "프로그래밍"],
    };
  }

  componentDidMount() {
    this._loadFontsAsync();
    this._loadIdeas();
  }

  render() {
    const {
      navigation,
      isOpeningMenu,
      word,
      ideas,
      isHaveIdea,
      words,
    } = this.state;

    if (this.state.fontsLoaded && this.state.ideasLoaded) {
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
                      word: word,
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
              <Text style={styles.textWord}>{word}</Text>
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
      AsyncStorage.setItem("ideas", JSON.stringify(newState.ideas));
      return { ...newState };
    });
  };

  _showDetail = (id) => {
    const { navigation } = this.state;
    navigation.push("Detail", {
      idea: this.state.ideas[id],
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
