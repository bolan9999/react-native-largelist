/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-10-26 11:06:10
 * @LastEditTime: 2021-10-27 17:06:48
 * @LastEditors: 石破天惊
 * @Description:
 */

import React from "react";
import { View, Text, TouchableOpacityProps, TouchableOpacity, StyleSheet } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { SpringScrollView } from "react-native-spring-scrollview";
import { LargeList } from "./src/LargeList";

export class Test extends React.Component {
  static navigationOptions = {
    title: "Main",
  };

  render() {
    return (
      <LargeList
        sections={sections}
        renderItem={this._renderItem}
      />
    );
    // return (
    //   <SpringScrollView>
    //     <Button onPress={() => this.setState({ click: true })} title="Example" />
    //     {/* <Button style={{ opacity: 0 }} onPress={() => console.log("123")} title="Example" /> */}
    //     {/* <View style={styles.testCover} /> */}
    //   </SpringScrollView>
    // );
  }
  _renderItem = (item) => {
    return <Text style={{textAlign:"center"}}>{item}</Text>;
  };
}

const styles = StyleSheet.create({
  testCover: {
    opacity: 0,
    marginTop: -50,
    height: 50,
    backgroundColor: "white",
  },
});

const Button = (props: TouchableOpacityProps & { title: string }) => {
  return (
    <TouchableOpacity {...props} style={[{ margin: 10, alignSelf: "center" }, props.style]}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

const sections = [
  {
    items: [
      { data: 1, estimatedItemHeight: 25 },
      { data: 2, estimatedItemHeight: 25 },
      { data: 1, estimatedItemHeight: 25 },
      { data: 2, estimatedItemHeight: 25 },
      { data: 1, estimatedItemHeight: 25 },
      { data: 2, estimatedItemHeight: 25 },
      { data: 1, estimatedItemHeight: 25 },
      { data: 2, estimatedItemHeight: 25 },
      { data: 1, estimatedItemHeight: 25 },
      { data: 2, estimatedItemHeight: 25 },
      { data: 1, estimatedItemHeight: 25 },
      { data: 2, estimatedItemHeight: 25 },
    ],
  },
  {
    items: [
      { data: 3, estimatedItemHeight: 55 },
      { data: 1, estimatedItemHeight: 55 },
      { data: 1, estimatedItemHeight: 55 },
      { data: 1, estimatedItemHeight: 55 },
      { data: 1, estimatedItemHeight: 55 },
      { data: 1, estimatedItemHeight: 55 },
      { data: 1, estimatedItemHeight: 55 },
      { data: 1, estimatedItemHeight: 55 },
      { data: 1, estimatedItemHeight: 55 },
      { data: 1, estimatedItemHeight: 55 },
      { data: 1, estimatedItemHeight: 55 },
      { data: 1, estimatedItemHeight: 55 },
    ],
  },
]