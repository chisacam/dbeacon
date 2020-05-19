import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  DeviceEventEmitter,
  Alert,
  BackHandler
} from "react-native";
import {
  Actions,
} from "react-native-router-flux";
import Beacons from 'react-native-beacons-manager';

import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import DeviceInfo from 'react-native-device-info';

const DBEACON_TOKEN = 'dblab_dbeacon';

async function requestPermission() {
  try {
    const grantedLoc = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  } catch (err) {
    console.warn(err);
  }
}

async function requestPermissionPhone() {
  try {
    const grantedPhone = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
    );
  } catch(e) {
    console.warn(e);
  }
}

requestPermission();
requestPermissionPhone();
Beacons.detectIBeacons();

Beacons.startRangingBeaconsInRegion('Region1', 'e2c56db5-dffb-48b2-b060-d0f5a7109');

class NavBar extends Component {
  //상단바 컴포넌트
  render() {
    return (
      <View style={styles.navBar}>
        <Text style={styles.navBarText}>근태관리</Text>
      </View>
    );
  }
}

class Button extends Component {
  //버튼
  async _SendFunction(text) {
    try{
      const val = await AsyncStorage.getItem(DBEACON_TOKEN);
      if(val !== null){
        const UserInfo = JSON.parse(val);
        fetch("https://api.chiyak.duckdns.org/records/insert", {
          method: "POST", 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uid: UserInfo['uid'],
            name: UserInfo['name'],
            depart: UserInfo['depart'],
            type: text
          })
        })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
        })
        .done();
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
            activeOpacity = { .5 } 
            disabled={this.props.ButtonStateHolder}
            onPress={() => this._SendFunction(this.props.type)}
        >
          <Image
            source={this.props.source}
            style={{ width: "100%", height: "100%" }}
          />
          <View />
        </TouchableOpacity>
      </View>
    );
  }
}

class User extends Component {
  //유저 컴포넌트
  state = {
    UserName: '',
    UserDep: ''
  };
  async _getUserInfo() {
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
  async _getPhoneInfo() {
    try{
      phonenumber = await DeviceInfo.getPhoneNumber();
      if(phonenumber !== null) {
        const val = await AsyncStorage.getItem(DBEACON_TOKEN);
        if(val !== null) {
          const UserInfo = JSON.parse(val);
          console.log(phonenumber.substr(3) + " " + UserInfo['phone']);
          if(phonenumber.substr(3) !== UserInfo['phone']){
            Alert.alert(
              "알림","전화번호가 일치하지 않거나, 읽을 수 없습니다!",
              [
              {
                text:"종료",
                onPress:() => {
                  AsyncStorage.removeItem(DBEACON_TOKEN);
                  BackHandler.exitApp();
                }
              }
              ]
            )
          }
        }
      }
    } catch(e) {
      console.log(e);
    }
  }
  _userLogout() {
    try {
      Alert.alert(
        "알림", "로그아웃 하시겠습니까?",
        [
          { 
            text: "아니요"
          },
          {
            text: "네",
            onPress: () => {
              AsyncStorage.removeItem(DBEACON_TOKEN);
              alert("로그아웃 완료");
              Actions.Login();
            }
          }
        ]
      )
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  componentDidMount() {
    this._getUserInfo();
    this._getPhoneInfo();
  }
  render() {
    return (
      <View style={styles.user}>
        <View
          style={{ flex: 1.5, flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ width: 110 }}>
            <Image
              style={{ height: "100%", width: "100%" }}
              source={require("../assets/man.jpeg")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text> {this.state.UserName} </Text>
            <Text> {this.state.UserDep} </Text>
          </View>
        </View>
        <View
          style={{ flex: 1, flexDirection: "row", alignItems: "center", borderBottomColor: 'grey', borderBottomWidth: 0.5 }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              borderWidth: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => 
              Actions.MyPage()
            }
          >
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>근태이력</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              borderWidth: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => Actions.CheckPass()}
          >
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>정보수정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              height: 50,
              flexDirection: "row",
              borderWidth: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => this._userLogout()}
          >
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class ButtonGroup extends Component {
  // 버튼 컴포넌트
  constructor(){
 
    super();
 
    this.state={
      ButtonStateHolder : false
    }
    this.listener = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      if (data.beacons.length) {
        this.setState({
          ButtonStateHolder : false
        })
      }
      else {
        this.setState({
          ButtonStateHolder : true
        })
      }
    });
  }
  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners()
  }
  render() {
    return (
      <View style={styles.buttonGroup}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button 
              source={require("../assets/출근1.png")}
              ButtonStateHolder={this.state.ButtonStateHolder}
              type='출근'
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button 
              source={require("../assets/퇴근1.png")} 
              ButtonStateHolder={this.state.ButtonStateHolder}
              type='퇴근'
            />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button 
              source={require("../assets/외근1.png")} 
              ButtonStateHolder={this.state.ButtonStateHolder}
              type='외근'
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button 
              source={require("../assets/복귀1.png")} 
              ButtonStateHolder={this.state.ButtonStateHolder}
              type='복귀'
            />
          </View>
        </View>
      </View>
    );
  }
}

class Mainpage extends Component {
  //메인페이지
  render() {
    return (
      <View style={styles.container}>
        <NavBar />
        <View style={{width:"100%", height:"1%"}}></View>
        <User />
        <ButtonGroup />
        <View style={{width:"100%", height:"2%"}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  navBar: {
    width: "100%",
    height: "7%",
    backgroundColor: "#007bff",
    justifyContent: "center",
  },

  navBarText: {
    marginLeft: 15,
    fontSize: 25,
    fontWeight: "bold",
    alignContent: "center",
    alignItems: "center",
    color: "white",
  },
  user: {
    width:"100%",
    height:"20%",
    backgroundColor: "white",
  },
  buttonGroup: {
    width:"100%",
    height:"60%",
    backgroundColor: "white",
  },
  taps: {
    height: 80,
    backgroundColor: "white",
  },
  and: {
    flex: 1,
  },
});

export default Mainpage;
