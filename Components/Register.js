import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Platform,
  StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import * as AppFunction from "../App"

export default class Register extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      depart: "",
    }
  } 

  join = (name, email, pass, passre, depart) => {
    if(name === "") {
      AppFunction.alert("Error", "이름을 입력하세요");
    }
    else if (email === "") {
      AppFunction.alert("Error", "이메일을 입력하세요");
    }
    else if (pass === "") {
      AppFunction.alert("Error", "비밀번호를 입력하세요");
    }
    else if (passre === "") {
      AppFunction.alert("Error", "비밀번호를 다시 입력하세요");
    }
    else if (depart === "") {
      AppFunction.alert("Error", "부서를 입력하세요");
    }
    else if (pass !== passre) {
      AppFunction.alert("Error", "비밀번호가 일치하지 않습니다");
    }
    else {
      fetch("https://api.chiyak.duckdns.org/users/signup", {
        method: "POST", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          userid: email,
          userpw: pass, 
          userpwre: passre,
          depart:depart
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData['code'] != "error") {
            alert('회원가입 완료! 가입한 정보로 로그인해주세요.');
            Actions.Login();
        } else {
            alert(responseData['reason']);
            Actions.refresh();
        }
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
            source={require("../assets/user.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="이름"
            underlineColorAndroid="transparent"
            onChangeText={(name) => this.setState({ name })}
          />
        </View>
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
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/key.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="비밀번호 재입력"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            onChangeText={(passwordCheck) => this.setState({ passwordCheck })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={require("../assets/org.png")}
          />
          <TextInput
            style={styles.inputs}
            placeholder="조직"
            underlineColorAndroid="transparent"
            onChangeText={(depart) => this.setState({ depart })}
          />
        </View>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          // 회원가입 버튼 이벤트
          onPress = {() => this.join(this.state.name,this.state.email, this.state.password, this.state.passwordCheck, this.state.depart)}
        >
          <Text style={styles.loginText}>회원가입</Text>
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
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
