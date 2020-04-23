import React, {Component} from 'react';

import {
Alert,
DeviceEventEmitter
} from 'react-native';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';

import Beacons from 'react-native-beacons-manager';

import {PermissionsAndroid} from 'react-native';

async function requestPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  } catch (err) {
    console.warn(err);
  }
}

requestPermission();

Beacons.detectIBeacons();

Beacons.startRangingBeaconsInRegion('Region1');

class NavBar extends Component {        //상단바 컴포넌트
  render() {
    return(
      <View style={styles.navBar}>
       <Text style={styles.navBarText}>
          MainPage: User
        </Text>
      </View>
    )

  }
}

class CButton extends Component {   //버튼크기
  render() {
    return (
      <View style={{flex: 1, height: 205, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: 50, height: 50}} />
        <Text>{this.props.name}</Text>
      </View>
    )
  }
}

class User extends Component {            //유저 컴포넌트
  render() {
    
    return(
      <View style={styles.user}>
       <View style={{height: 100, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: 110}}>
            <View style={{marginLeft: 5,width: 100, height: 90, backgroundColor: 'gray'}} ></View>
          </View>
          <View style={{flex: 1}}>
            <Text>이름</Text>
            <Text>직책</Text>
            <Text>직장명</Text>
          </View>
        </View>
        <View style={{height: 50, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 50, flexDirection: 'row', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>오늘일자</Text>
          </View>
          <View style={{flex: 1, height: 50, flexDirection: 'row', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>최근이력</Text>
          </View>
          <View style={{flex: 1, height: 50, flexDirection: 'row', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>로그아웃</Text>
          </View>
        </View>
      </View>
    )
  }
}

class ButtonGroup extends Component {             // 버튼 컴포넌트
  constructor(){
 
    super();
 
    this.state={
 
      // Default Value for ButtonStateHolder State. Now the button is Enabled.
      ButtonStateHolder : false,
 
      // Default Text for Button Title.
      ButtonTitle : '버튼 활성화'
 
    }
    this.listener = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      if (data.beacons.length) {
        this.setState({
      
          // On State True it will Disable the button.
          ButtonStateHolder : false ,
    
          ButtonTitle : '버튼 활성화'
        
        })
      }
      else {
        this.setState({
        
          // On State True it will Disable the button.
          ButtonStateHolder : true ,
   
          ButtonTitle : '버튼 비활성화'
        
        })
      }
    });
  }
  
  SampleButtonFunction=()=>
   {
      Alert.alert('요청을 받았습니다.');
   }

  render() {
    return(
      <View>
       <View style={styles.buttonGroup}>

        <View style={{flex: 1, flexDirection: 'row'}}>

         <TouchableOpacity style={{flex: 1, height: 205, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}
           activeOpacity = { .5 } 
           disabled={this.state.ButtonStateHolder}
           onPress={this.SampleButtonFunction} >
          <Text> "출근" </Text>
         </TouchableOpacity>

         <TouchableOpacity style={{flex: 1, height: 205, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}
           activeOpacity = { .5 } 
           disabled={this.state.ButtonStateHolder}
           onPress={this.SampleButtonFunction} >
          <Text> "퇴근" </Text>
         </TouchableOpacity>

      </View>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style={{flex: 1, height: 205, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}
          activeOpacity = { .5 } 
          disabled={this.state.ButtonStateHolder}
          onPress={this.SampleButtonFunction} >
         <Text> "외출" </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flex: 1, height: 205, borderWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}
          activeOpacity = { .5 } 
          disabled={this.state.ButtonStateHolder}
          onPress={this.SampleButtonFunction} >
          <Text> "복귀" </Text>
        </TouchableOpacity>

      </View>
     </View>
    </View>
    )
  }
}
class Taps extends Component {                //탭 컴포넌트
  render() {
    return(
      <View style={styles.taps}>
         <CButton name= "종료" />
      </View>
    )
  }
}


class Mainpage extends Component {                   //메인페이지
  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners();
  }
  render() {
    return (
      <View style={styles.container,styles.and}>
        <NavBar />
        <User />
        <ButtonGroup/>
        <Taps />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  navBar: {
    height: 60,
    backgroundColor: '#00498c',
    justifyContent: 'center',
    alignItems: 'center',
  },

  navBarText: {
    fontSize: 20,
    color: 'white',
  },
  user: {
    height: 150,
    backgroundColor: '#84B1ED',
  },
  buttonGroup: {
    height: 410,
    backgroundColor: 'white',
  },
  taps: {
    height: 80,
    backgroundColor: '#83a4d4'
  },
  and: {
    flex: 1
	},
});



export default Mainpage;

