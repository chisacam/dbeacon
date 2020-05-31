import React, { Component } from "react";
import {
  StyleSheet,
  BackHandler,
  Alert,
  AppState,
  ToastAndroid
} from "react-native";
import Main from "./Components/Main";
import Login from "./Components/Login";
import Register from "./Components/Register";
import MyPage from "./Components/MyPage";
import EditProfile from "./Components/EditProfile";
import CheckPass from "./Components/CheckPass";
import LostPass from "./Components/LostPass"
import ChangePass from "./Components/ChangePass"
import {
  Scene,
  Router,
  Overlay,
  Modal,
  Stack,
  Actions,
} from "react-native-router-flux";

import AsyncStorage from '@react-native-community/async-storage';

const DBEACON_TOKEN = 'dblab_dbeacon';

const prefix = Platform.OS === "android" ? "mychat://mychat/" : "mychat://";

export function alert (title, msg) {
  Alert.alert(
    title,
    msg,
    [
      { text: "확인" }
    ],
    { cancelable: true }
  )
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      appState: AppState.currentState
    };

    this.handleBackButton = this.handleBackButton.bind(this)

  }


  async isLoggedin() {
    try{
      const val = await AsyncStorage.getItem(DBEACON_TOKEN);
      if (val !== null) {
        this.setState({ isLogin: true });
      } else {
        this.setState({ isLogin: false });
      }
    }
    catch(e){
      console.log(e);
    }
  }

  componentDidMount() {
    this.isLoggedin();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    console.log("didmount!");
  }

  componentWillUnmount() {
    this.exitApp = false;
    BackHandler.removeEventListener('hardwareBackPress');
    console.log("willunmount!");
  }

  handleBackButton = () => {
    // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
    if (this.exitApp == undefined || !this.exitApp) {
      if(Actions.currentScene !== 'Main' || Actions.currentScene !== 'Login'){
        this.exitApp = true;
        ToastAndroid.show("한번더 누르면 종료합니다.",ToastAndroid.SHORT);
        this.timeout = setTimeout(
            () => {
                this.exitApp = false;
            },
            2000    // 2초
        );
      } else {
        this.exitApp = false;
        Actions.pop();
      }
      return true;
    } else {
        clearTimeout(this.timeout);

        BackHandler.exitApp();  // 앱 종료
        return false;
    }
}
  render() {
    return (
        <Router
          sceneStyle={styles.container}
          uriPrefix={prefix}
          backAndroidHandler={this.handleBackButton}
        >
              {this.state.isLogin ? (
                <Stack
                  key="root"
                  titleStyle={{ alignSelf: "center" }}
                  hideNavBar
                >
                  <Scene key="Main" component={Main} title="main" initial />
                  <Scene key="Login" component={Login} title="Login" />
                  <Scene key="Register" component={Register} title="Register" />
                  <Scene key="MyPage" component={MyPage} title="MyPage" />
                  <Scene key="EditProfile" component={EditProfile} title="EditProfile" />
                  <Scene key="CheckPass" component={CheckPass} title="CheckPass" />
                  <Scene key="LostPass" component={LostPass} title="LostPass" />
                  <Scene key="ChangePass" component={ChangePass} title="ChangePass" />
                </Stack>
              ) : (
                <Stack
                  key="root"
                  titleStyle={{ alignSelf: "center" }}
                  hideNavBar
                >
                  <Scene key="Main" component={Main} title="main" />
                  <Scene key="Login" component={Login} title="Login" initial />
                  <Scene key="Register" component={Register} title="Register" />
                  <Scene key="MyPage" component={MyPage} title="MyPage" />
                  <Scene key="EditProfile" component={EditProfile} title="EditProfile" />
                  <Scene key="CheckPass" component={CheckPass} title="CheckPass" />
                  <Scene key="LostPass" component={LostPass} title="LostPass" />
                  <Scene key="ChangePass" component={ChangePass} title="ChangePass" />
                </Stack>
              )}
        </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
