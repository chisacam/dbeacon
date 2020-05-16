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

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordCheck: "",
    }
  }

  _editProfile = (id, password, passwordCheck) => {
    if (password === passwordCheck) {
      fetch("https://api.chiyak.duckdns.org/users/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // uid: UserInfo["uid"],
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          // json 결과에 따라 로직 처리
          if (json.code !== "error") {
            Alert.alert(
              "알림",
              "비밀번호가 변경되었습니다. 다시 로그인해주세요.",
              {
                text: "확인"
              }
            )
          } else {
            Alert.alert(
              "알림",
              json.errorValue,
              {
                text: "확인"
              }
            )
          }
        });
    } else {
      alert("Error", "비밀번호가 다릅니다");
    }
  };

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <View style={styles.navView}>
          <Text style={styles.navText}>정보수정</Text>
        </View>
        <View style={styles.main}>
          <View style={[styles.inputContainer, { backgroundColor: "#e2e2e2" }]}>
            <Image
              style={styles.inputIcon}
              source={require("../assets/grayUser.png")}
            />
            <TextInput
              style={styles.inputs}
              // placeholder={ UserInfo['id'] }
              placeholder="유저아이디"
              editable={false}
              underlineColorAndroid="transparent"
            />
          </View>
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
              onPress={() => this._editProfile(
                this.state.id,
                this.state.password,
                this.state.passwordCheck
              )}
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
