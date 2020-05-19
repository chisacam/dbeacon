import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import alert from "../App";
import { Actions } from "react-native-router-flux";
import AsyncStorage from '@react-native-community/async-storage';
const DBEACON_TOKEN = 'dblab_dbeacon';

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UID: "",
      password: "",
      passwordCheck: "",
    };
  }

  async _getUserInfo() {
    try {
      const val = await AsyncStorage.getItem(DBEACON_TOKEN);
      if (val !== null) {
        const UserInfo = JSON.parse(val);
        this.setState({ UID: UserInfo["uid"] });
      }
      // Alert.alert(this.state.UID)
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this._getUserInfo();
  }

  _editProfile = (UID, password, passwordCheck) => {
    if (password === "") {
      Alert.alert("알림", "비밀번호를 입력해주세요");
    } else if (passwordCheck === "") {
      Alert.alert("알림", "비밀번호를 재입력해주세요");
    } else if (password !== passwordCheck) {
      Alert.alert("알림", "비밀번호가 일치하지 않습니다");
    } else {
      fetch("https://api.chiyak.duckdns.org/users/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          uid: UID,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then(async (json) => {
          if (json['code'] === "success") {
            await AsyncStorage.removeItem(DBEACON_TOKEN);
            Alert.alert("알림", "비밀번호가 변경되었습니다.");
            Actions.Login();
          } else {
            Alert.alert("알림", json.reason);
            Actions.refresh();
          }
        });
    }
  };

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <View style={styles.navView}>
          <Text style={styles.navText}>정보수정</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../assets/key.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="변경할 비밀번호"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(password) => this.setState({ password })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../assets/key.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="비밀번호 확인"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(passwordCheck) => this.setState({ passwordCheck })}
            />
          </View>
          <View style={{ height: 100 }} />
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() =>
                this._editProfile(
                  this.state.UID,
                  this.state.password,
                  this.state.passwordCheck
                )
              }
            >
              <Text style={{ fontSize: 18, color: "white" }}>수정완료</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 9,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  navView: {
    width: "100%",
    height: "10%",
    backgroundColor: "#007bff",
    justifyContent: "center",
  },
  navText: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 25,
    fontWeight: "bold",
    alignContent: "center",
    alignItems: "center",
    color: "white",
  },
  boldText: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  inputs: {
    fontSize: 15,
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputContainer: {
    borderBottomColor: "grey",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 50,
    marginBottom: 20,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
});
