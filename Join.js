import React, { Component } from "react";
import { StyleSheet, Text, Button,Image, View, TextInput,  TouchableHighlight, TouchableOpacity, Modal} from 'react-native';
import { Actions } from "react-native-router-flux";

const DBEACON_TOKEN = 'dblab_dbeacon';

class JoinScreen extends Component {
  state = {
      name: "",
      email:"",
      password:"",
      PasswordCheck:"",
      depart:""
  };
  changename = (text) => {
    this.setState({ name: text });
};
  changeEmail = (text) => {
      this.setState({ email : text });
  };

  changePassword = (text) => {
      this.setState({ password : text });
  };
  changePasswordCheck = (text) => {
    this.setState({ PasswordCheck: text });
  };
  changeDepartCheck = (text) => {
    this.setState({ depart: text });
  };

  join = (name, email, pass, passre, depart) => {
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
          Actions.login();
      } else {
          alert(responseData['reason']);
          Actions.refresh();
      }
    })
    .done();
  };

  render(){
      return (
          <View style={styles.container}>

            <Text style={styles.title}>Join DBeacon</Text>

            <TextInput
              placeholder='name'
              style={styles.textinput}
              onChangeText={this.changename}
              value={this.state.name}
              />

            <TextInput
              placeholder='email'
              style={styles.textinput}
              onChangeText={this.changeEmail}
              value={this.state.email}
              />
             
            <TextInput
              placeholder='password'
              style={styles.textinput}
              onChangeText={this.changePassword}
              value={this.state.password}
              />

            <TextInput
              placeholder='PasswordCheck'
              style={styles.textinput}
              onChangeText={this.changePasswordCheck}
              value={this.state.PasswordCheck}
              />   
            <TextInput
              placeholder='depart'
              style={styles.textinput}
              onChangeText={this.changeDepartCheck}
              value={this.state.depart}
              />
            <Button title="제출" onPress={() => this.join(this.state.name,this.state.email, this.state.password,this.state.PasswordCheck, this.state.depart)}/>
          </View>
        );
  }
}

class Joinpage extends Component {                  
  render() {
    return (
      <View style={styles.container2}>
        <JoinScreen/>
      </View>
    );
  }
}

export default Joinpage;

const styles = StyleSheet.create({
    container2: {
    flex: 1,
    flexDirection: 'column',
  }, 
    and: {
    flex: 1,
  },
  container1: {
    flex: 1,
    justifyContent:"center",
    alignItems: 'center',
  },
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:"center",
    
  },
      title: {
      margin: 30,
      fontSize: 30,
      fontSize: 20,
      fontWeight: 'bold',
  },
    textinput:{
    width: 250,
    marginBottom: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
}
});
