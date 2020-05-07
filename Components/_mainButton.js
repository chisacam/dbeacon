import React, { Component } from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

export default class MainButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OnWork: false,
      Outing: false
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: this.props.buttonColor }]}
        onpress={this.props.onPress}
      >
        {/* <Image source={this.props.url} style={styles.ImageIcon} /> */}
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.subtitle}>{this.props.subtitle}</Text>
      </TouchableOpacity>
    );
  } 
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: 130,
    height: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#007bff",
    margin: 5,
  },
  title: {
    fontSize: 30,
    color: "#007bff",
  },
  subtitle: {
    fontSize: 15,
    color: "grey",
  },
  ImageIcon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
  },
});
