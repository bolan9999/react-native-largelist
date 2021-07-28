/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:11:34
 * @LastEditTime: 2021-07-28 16:00:11
 * @LastEditors: 石破天惊
 * @Description:
 */
/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/20
 *
 */

import React from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { messages } from "./DataSource";
import { LargeList } from "../../src";

export class MessageExample extends React.Component {
  static navigationOptions = {
    title: "MessageExample",
  };

  messages;
  largeList;

  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this.messages = [...messages];
  }

  render() {
    return (
      <LargeList
        pagingEnabled
        ref={(ref) => (this.largeList = ref)}
        heightForSection={() => 0}
        renderSection={() => null}
        heightForIndexPath={() => 88}
        renderIndexPath={this._renderItem}
        data={this.messages}
      />
    );
  }

  _renderItem = ({ section: section, row: row }) => {
    let msg = this.messages[section].items[row];
    return (
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: "#FFF" }}
        onPress={() => console.log("=====>")}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Image
            source={msg.icon}
            style={{ marginLeft: 16, width: 44, height: 44 }}
          />
          <View style={{ marginLeft: 4 }}>
            <Text style={{ fontSize: 18 }}>{msg.title}</Text>
            <Text style={{ fontSize: 14, marginTop: 8 }}>{msg.subtitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}
