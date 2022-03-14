/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-10-26 10:57:23
 * @LastEditTime: 2022-03-13 20:29:17
 * @LastEditors: 石破天惊
 * @Description: 
 */

import React from "react";
import { SpringScrollView } from "react-native-spring-scrollview";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { WaterfallListExample } from "./WaterfallListExample";
import { PictureExample } from "./PictureExample";

export class WaterfallListExamples extends React.Component {
  static navigationOptions = {
    title: "WaterfallListExamples",
  };

  render() {
    return (
      <SpringScrollView>
        {this.state.examples.map((example, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => this.props.navigation.navigate(example)}
          >
            <Text style={styles.text}>{example}</Text>
          </TouchableOpacity>
        ))}
      </SpringScrollView>
    );
  }

  state = {
    examples: ["WaterfallListExample", "PictureExample"],
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  button: { alignItems: "center" },
});
