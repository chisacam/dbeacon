import React, { Component } from "react"; //임시 로그인 창
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  BackHandler,
  Button,
  Image
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {StackViewStyleInterpolator} from 'react-navigation-stack';

import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

import Main from './Main';
import Join from './Join';
const DBEACON_TOKEN = 'dblab_dbeacon';

class Inputs extends Component {
  state = {
    email: "",
    password: ""
  };
 
  handleEmail = text => {
    this.setState({ email: text });
  };
 
  handlePassword = text => {
    this.setState({ password: text });
  };

  async _onValueChange(selectedValue) {
    try {
      const Value = JSON.stringify(selectedValue);
      await AsyncStorage.setItem(DBEACON_TOKEN, Value);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  login = (email, pass) => {
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
      console.log(responseData);
      this._onValueChange(responseData);
      Actions.main();
    })
    .done();
  };

  render() {
    return (
      
      <View style={styles.container3}>
        
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Email"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Password"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => Actions.join()}
        >
          <Text style={styles.submitButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const stateHandler = (prevState, newState, action) => {
    console.log('onStateChange: ACTION:', action);
  };
  
  // on Android, the URI prefix typically contains a host in addition to scheme
  const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';
  
  const transitionConfig = () => ({
    screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
  });

class loginpage extends Component {                   //로그인페이지
  state = {
    isLogin:false
  }
  
  async isLoggedin() {
    const val = await AsyncStorage.getItem(DBEACON_TOKEN);
    if(val !== null){
      this.setState({isLogin:true});
    }else{
      this.setState({isLogin:false});
    }
  }
  
  componentDidMount() {
    this.isLoggedin();
    this.homeBackPressHandler = BackHandler.addEventListener('homeBackPress', () => {
      BackHandler.exitApp();
    })
  }
  componentWillUnmount() {
    this.homeBackPressHandler.remove();
  }           
  render() {
    
    return (
        <Router
            onStateChange={stateHandler}
            sceneStyle={styles.scene}
            uriPrefix={prefix}>
            <Overlay key="overlay">
                <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
                    <Stack key="root" titleStyle={{alignSelf: 'center'}} hideNavBar>
                        <Scene
                            key="login"
                            component={Inputs}
                            title="login"
                            initial={!this.state.isLogin}
                        />            
                        <Scene
                            key="main"
                            component={Main}
                            title="main"
                            initial={this.state.isLogin}
                        />
                        <Scene
                            key="join"
                            component={Join}
                            title="join"
                        />
                    </Stack>
                </Modal>
            </Overlay>
        </Router>
    );
  }
}
export default loginpage;
 
const styles = StyleSheet.create({
  container2: {
    flex: 1,
    flexDirection: 'column',
  },
  container3: {
        flex: 1,
    paddingTop: 20,
    paddingLeft:40,
    justifyContent:"center",
    width:"90%"
  },
  container1: {
      flex: 1,
      alignItems:"center",
      justifyContent:"flex-end"
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  },
  and: {
    flex: 1
	}
});
