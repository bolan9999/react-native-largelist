/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/20
 *
 */

import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { messages } from "./DataSource";

export class FlatListExample extends React.Component {
  static navigationOptions = {
    title: "FlatListExample"
  };

  render() {
    return (
      <FlatList
        data={messages[0].items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
        getItemLayout={(data, index) => ({ length: 88, offset: 88 * index, index })}
      />
    );
  }

  _renderItem = ({ item }) => {
    return <Item msg={item} />;
  };
}

class Item extends React.PureComponent<{ msg: { icon: number, title: string, subtitle: string } }> {
  render() {
    const { msg } = this.props;
    return (
      <TouchableOpacity style={{ height: 88, backgroundColor: "#FFF" }} onPress={() => console.log("=====>")}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Image source={msg.icon} style={{ marginLeft: 16, width: 44, height: 44 }} />
          <View style={{ marginLeft: 4 }}>
            <Text style={{ fontSize: 18 }}>
              {msg.title}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 8 }}>
              {msg.subtitle}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
