import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class NavButton extends Component {
    
  render() {
      return (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#DCCDDC' }]}
          conpress={this.props.onPress}
        >
          <Text style={[styles.title, { color: 'black' }]}>
            {this.props.title}
          </Text>
        </TouchableOpacity>
      )
    }
  }
  
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: "grey",
      margin: 5,
    },
    title: {
      fontSize: 30,
    },
    ImageIcon: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: "stretch",
    },
  });
  