/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2022-03-13 20:30:26
 * @LastEditTime: 2022-03-14 17:08:38
 * @LastEditors: 石破天惊
 * @Description:
 */

import React from "react";
import { WaterFall } from "../../src/WaterFall";
import { Text, View, Image } from "react-native";

const activityData = require("./vmall.json");
export class WaterfallExample extends React.Component {
  static navigationOptions = {
    title: "WaterfallExample",
  };

  render() {
    return (
      <WaterFall
        data={activityData.concat(activityData)}
        renderItem={this._renderItem}
        renderSectionHeader={() => null}
      />
    );
  }

  _renderItem = (item, index) => {
    return (
      <View style={{ flex: 1, margin: 5 }}>
        <Image style={{ width: item.width, height: item.height }} source={{ uri: item.src }} />
      </View>
    );
  };

  _renderHeader = () => {
    return (
      <View style={{ padding: 20, alignItems: "center", backgroundColor: "red" }}>
        <Text>I am header</Text>
      </View>
    );
  };

  _renderFooter = () => {
    return (
      <View style={{ padding: 20, alignItems: "center", backgroundColor: "red" }}>
        <Text>I am footer</Text>
      </View>
    );
  };
}
