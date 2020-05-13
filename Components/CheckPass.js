import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Image,
} from "react-native";
import { Actions } from "react-native-router-flux";
import alert from "../App";

export default class CheckPass extends React.Component {
  state = {
    password: "",
  };

  _checkPassAndGo = (pass) => {
    
    // 서버작업시 이 코드를 지우고 주석을 활성화 시킬 것
    Actions.EditProfile();


    // 서버의 패스워드와 검사하고 값 리턴
    // if ( pass === "" ) {
    //   _errorAlert("Error", "비밀번호를 입력하세요");
    // } else {
    //   fetch( "https://api.chiyak.duckdns.org/users/passcheck", {
    //     method: "POST",
    //     headers: {
    //       "Accept": "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       uid: UserInfo["uid"],
    //       pass: pass,
    //     }),
    //   })
    //     .then( (res) => res.json() )
    //     .then( (json) => {
    //       if (json.code !== "error") {
    //         Actions.EditProfile();
    //       } else {
    //         alert("Error", "비밀번호를 확인해주세요")
    //       }
    //     });
    // }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navBar}>
          <Text style={styles.navText}>비밀번호 확인</Text>
        </View>
        <View style={styles.mainView}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../assets/key.png")}
            />
            <TextInput
              style={{ marginLeft: 10 }}
              placeholder="현재 비밀번호 입력"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(password) => this.setState({ password })}
            />
          </View>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this._checkPassAndGo(this.state.password)}
          >
            <Text style={styles.inputText}>제출</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  navBar: {
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
  inputContainer: {
    borderBottomColor: "grey",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    color: "white",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    width: 200,
    borderRadius: 30,
    backgroundColor: "#00b5ec",
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
});
