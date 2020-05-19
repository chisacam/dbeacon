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

export default class LostPass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      questionType: "treasure",
      questionAnswer: "",
    };
  }

  _lostPass = (email, questionType, questionAnswer) => {
    if (email === "") {
      alert("알림", "이메일을 입력하세요");
    } else if (questionAnswer === "") {
      alert("알림", "답변을 입력하세요");
    } else {
      fetch("https://api.chiyak.duckdns.org/users/lostpass", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          questionType: questionType,
          questionAnswer: questionAnswer,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData["code"] != "error") {
            Actions.ChangePass({ email: email });
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
                source={require("../assets/mail.png")}
              />
              <TextInput
                style={styles.inputs}
                placeholder="이메일을 입력하세요"
                underlineColorAndroid="transparent"
                onChangeText={ (email) => this.setState({ email })}
              />
            </View>
            <Picker
              selectedValue={this.state.questionType}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ questionType: itemValue });
              }}
            >
              <Picker.Item label="내 보물 1호는?" value="treasure" />
              <Picker.Item label="나의 고향은?" value="hometown" />
              <Picker.Item label="어릴적 내 별명은?" value="nickname" />
            </Picker>
            <View style={styles.inputContainer}>
              <Image
                style={styles.inputIcon}
                source={require("../assets/empty.png")}
              />
              <TextInput
                style={styles.inputs}
                placeholder="답변을 입력하세요"
                underlineColorAndroid="transparent"
                onChangeText={(questionAnswer) =>
                  this.setState({ questionAnswer })
                }
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
              <Text style={{ color: 'white' }}>확인</Text>
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
