import React from "react";
import { StyleSheet } from "react-native";
import DatePicker from "react-native-datepicker";

export default class MyDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      date: null
    };
  }

  liftDateUp = () => {
    this.props.updateState(this.state.date);
  }

  render() {
    return (
      <DatePicker
        style={styles.datebox}
        date={this.state.date}
        mode="date"
        placeholder="날짜를 선택하세요"
        format="YYYY-MM-DD"
        minDate="2020-01-01"
        maxDate="2099-12-31"
        confirmBtnText="확인"
        cancelBtnText="취소"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: -300,
            top: 5,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 30,
          },
        }}
        onDateChange={(changeDate) => {
          this.setState({date: changeDate}, this.liftDateUp) 
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
    datebox: {
        width: 150,
        height: 100,
        marginHorizontal: -23,
        marginVertical: 7
    }
});
