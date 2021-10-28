/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-10-26 11:06:10
 * @LastEditTime: 2021-10-28 17:06:27
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
    return <LargeList sections={sections} renderItem={this._renderItem} />;
  }
  _renderItem = (_, path) => {
    return <Button title={JSON.stringify(path)} />;
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
    <TouchableOpacity {...props} style={[{ alignSelf: "center" }, props.style]}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

const sections = [
  {
    items: [
      { data: 1, estimatedItemHeight: 25 },
      { data: 2, estimatedItemHeight: 25 },
      { data: 3, estimatedItemHeight: 25 },
      { data: 4, estimatedItemHeight: 25 },
      { data: 5, estimatedItemHeight: 25 },
      { data: 6, estimatedItemHeight: 25 },
      { data: 7, estimatedItemHeight: 25 },
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
];
