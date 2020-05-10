import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class EditProfile extends React.Component {
  state = {
    name: '이름을 입력해 주세요',
    email: 'temp@email.com',
    password: '',
    passwordCheck: '',
  };

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <View style={styles.navView}>
          <Text style={styles.navText}>정보수정</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.boldText}>이름</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="여기에 원래 이름을 넣으세요"
              underlineColorAndroid="transparent"
              onChangeText={name => this.setState({ name })}
            />
          </View>
          <Text style={styles.boldText}>이메일</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="여기에 원래 이메일을 넣으세요"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={name => this.setState({ name })}
            />
          </View>
          <Text style={styles.boldText}>비밀번호</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="비밀번호"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <Text style={styles.boldText}>비밀번호 확인</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="비밀번호 확인"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <View style={{ flex: 0.5 }} />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={null}>
              <Text style={{ fontSize: 18, color: 'white' }}>수정완료</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 7,
    alignContent: 'center',
    justifyContent: 'center',
  },
  navView: {
    backgroundColor: '#007bff',
    justifyContent: 'flex-end',
    flex: 1,
  },
  navText: {
    marginLeft: 15,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  boldText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
  inputs: {
    fontSize: 15,
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputContainer: {
    borderBottomColor: 'grey',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 50,
    marginBottom: 20,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
});
