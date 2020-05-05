import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
const DBEACON_TOKEN = 'dblab_dbeacon';
export default class ScrollList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // name, date, type, depart.
      tempdata: [],
      order: 10,
    };
  }

  _getData = async () => {
    console.log(this.props.startTime)
    const val = await AsyncStorage.getItem(DBEACON_TOKEN);
    if(val !== null){
      const UserInfo = JSON.parse(val);
      fetch("https://api.chiyak.duckdns.org/records/read", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: UserInfo['uid'],
          startTime: this.props.startTime,
          endTime: this.props.endTime
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
          this.setState({
            data: json,
          });
        })
        .then(() => {
            this.setState({
              // 최초 10개만 노출
              tempdata: this.state.data.slice(0, 10),
            });
        });
    }
  };

  componentDidMount() {
    this._getData();
  }

  _loadMore = () => {
    this.setState({
      tempdata: this.state.tempdata.concat(
        // 10개씩 추가
        this.state.data.slice(this.state.order, this.state.order + 10)
      ),
      order: this.state.order + 10,
    });
  };

  _checkType(type) {
    let output;
    if (type === "출근") {
      output = <Text style={{ fontSize: 20, color: "blue" }}>{type}</Text>;
    } else if (type === "퇴근") {
      output = <Text style={{ fontSize: 20, color: "red" }}>{type}</Text>;
    } else if (type === "외출") {
      output = <Text style={{ fontSize: 20, color: "green" }}>{type}</Text>;
    } else {
      output = <Text style={{ fontSize: 20, color: "orange" }}>{type}</Text>;
    }
    return output;
  }

  _renderItem = ({ item }) => (
    <View
      style={{
        borderBottomWidth: 0.5,
        borderColor: "grey",
        marginBottom: 5,
      }}
    >
      {/* 위 */}
      <View style={{ flex: 1, marginLeft: 20, flexDirection: "row" }}>
        {/* 시간 */}
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <Text style={{ fontSize: 15, color: "black" }}>
            {item.time.slice(0, 10)}
          </Text>
          <Text style={{ fontSize: 12, color: "grey" }}>
            {item.time.slice(11, 19)}
          </Text>
        </View>
        {/* 타입 */}
        <View
          style={{
            flex: 2,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {/* 출퇴근 여부 */}
          {this._checkType(item.type)}
        </View>
      </View>

      {/* 아래 */}
      <View style={{ flex: 1, marginLeft: 20 }}>
        <View style={{ flex: 1 }}>
          {/* 이름 */}
          <Text style={{ fontSize: 20 }}>{item.name}</Text>
        </View>
        <View style={{ flex: 3 }}>
          {/* 부서 */}
          <Text style={{ fontSize: 15, color: "grey" }}>{item.depart}</Text>
        </View>
      </View>
    </View>
  );

  render() {
    return (
      <View>
          <FlatList
            data={this.state.tempdata}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this._loadMore}
            onEndReachedThreshold={1}
          />
      </View>
    );
  }
}
