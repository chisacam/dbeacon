import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";
import {
  Actions
} from "react-native-router-flux";
import AsyncStorage from '@react-native-community/async-storage';
import * as AppFunction from "../App"
const DBEACON_TOKEN = 'dblab_dbeacon';

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    
    this.state ={
      email: "",
      password: "",
    }
  }

  async _onValueChange(selectedValue) {
    try {
      const Value = JSON.stringify(selectedValue);
      await AsyncStorage.setItem(DBEACON_TOKEN, Value);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  login = (email, pass) => {
    if(email === "") {
      AppFunction.alert("Error", "이메일을 입력하세요")
    }
    else if (pass === "") {
      AppFunction.alert("Error", "비밀번호를 입력하세요");
    }
    else {
      fetch("https://api.chiyak.duckdns.org/users/login", {
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userid: email,
        userpw: pass, 
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.code === "success") {
        this._onValueChange(responseData);
        Actions.Main();
      } else {
        Alert.alert("알림", "가입정보를 확인하세요.");
        Actions.refresh();
      }
      console.log(responseData);
      // if (responseData["code"] != "error") {
      //   alert("회원가입 완료! 가입한 정보로 로그인해주세요.");
      //   Actions.login();
      // } else {
      //   alert(responseData["reason"]);
      //   Actions.refresh();
      // }
    })
    .done();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/mail.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="이메일"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={(email) => this.setState({ email })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/key.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="비밀번호"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={(password) => this.setState({ password })}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.loginText}>로그인</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => Actions.LostPass()}
        >
          <Text>비밀번호를 잊으셨나요?</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => Actions.Register()}
        >
          <Text>회원가입</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: "white",
  },
});
