import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  TextInput,
  Alert,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { Picker } from "@react-native-community/picker";
import { alert } from "../App"
import AsyncStorage from '@react-native-community/async-storage';

async function _getUserInfo() {
  try{
    const val = await AsyncStorage.getItem(DBEACON_TOKEN);
    if(val !== null){
      const UserInfo = JSON.parse(val);
      this.setState({UserName:UserInfo['name']});
      this.setState({UserDep:UserInfo['depart']});
    }
  }
  catch(e) {
    console.log(e);
  }
} 

export default class LostPass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      passwordRe: ""
    };
  }

  componentDidMount() {
    _getUserInfo();
    Alert.alert("알림", this.props.email);
  }

  _changePass = (email, pass, passre) => {
    if (pass === "") {
      alert("알림", "비밀번호를 입력하세요");
    } else if (passre === "") {
      alert("알림", "비밀번호 확인을 입력하세요");
    } else if (pass !== passre) {
      alert("알림", "비밀번호가 일치하지 않습니다.");
    } else {
      fetch("https://api.chiyak.duckdns.org/users/edit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: UserInfo["uid"],
          pass: pass
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if (responseData["code"] != "error") {
            alert("비밀번호 변경 완료! 변경된 비밀번호로 로그인하세요.");
            Actions.Login();
          } else {
            alert(responseData["reason"]);
            Actions.refresh();
          }
        })
        .done();
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navView}>
          <Text style={styles.navText}>비밀번호 찾기</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.main}>
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
            onChangeText={( passwordRe ) => this.setState({ passwordRe })}
          />
        </View>
            <View style={{ height: 100 }} />
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this._lostPass(
                  this.state.email,
                  this.state.questionType,
                  this.state.questionAnswer
                )
              }
            >
              <Text style={{ color: 'white' }}>비밀번호 변경</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  main: {
    flex: 9,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
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
});
