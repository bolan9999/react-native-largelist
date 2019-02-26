/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/20
 *
 */

import React from "react";
import { WaterfallList } from "../../src";
import { Text, View } from "react-native";

export class WaterfallListExample extends React.Component {
  static navigationOptions = {
    title: "WaterfallListExample"
  };

  state = { data: [...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data] };
  _list: WaterfallList;

  render() {
    return (
      <WaterfallList
        data={this.state.data}
        ref={ref => (this._list = ref)}
        heightForItem={item => item.height}
        preferColumnWidth={120}
        renderItem={this._renderItem}
        renderHeader={this._renderHeader}
        renderFooter={this._renderFooter}
        onRefresh={() => {
          setTimeout(() => this._list.endRefresh(), 2000);
        }}
        onLoading={() => {
          setTimeout(() => this._list.endLoading(), 2000);
        }}
      />
    );
  }

  _renderItem = (item, index) => {
    return (
      <View style={{ flex: 1, margin: 5, justifyContent: "center", alignItems: "center", backgroundColor: item.color }}>
        <Text>
          index:{index}, height:{item.height}
        </Text>
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

const data = [
  { height: 40, color: "aliceblue" },
  { height: 60, color: "antiquewhite" },
  { height: 80, color: "aqua" },
  { height: 100, color: "aquamarine" },
  { height: 120, color: "azure" },
  { height: 140, color: "beige" },
  { height: 160, color: "bisque" },
  { height: 40, color: "blue" },
  { height: 60, color: "blueviolet" },
  { height: 80, color: "brown" },
  { height: 100, color: "burlywood" },
  { height: 120, color: "cadetblue" },
  { height: 140, color: "chartreuse" },
  { height: 160, color: "chocolate" },
  { height: 40, color: "coral" },
  { height: 60, color: "cornflowerblue" },
  { height: 80, color: "cornsilk" },
  { height: 100, color: "crimson" },
  { height: 120, color: "cyan" },
  { height: 140, color: "darkblue" },
  { height: 160, color: "darkcyan" },
  { height: 40, color: "aliceblue" },
  { height: 60, color: "antiquewhite" },
  { height: 80, color: "aqua" },
  { height: 100, color: "aquamarine" },
  { height: 120, color: "azure" },
  { height: 140, color: "beige" },
  { height: 160, color: "bisque" },
  { height: 40, color: "blue" },
  { height: 60, color: "blueviolet" },
  { height: 80, color: "brown" },
  { height: 100, color: "burlywood" },
  { height: 120, color: "cadetblue" },
  { height: 140, color: "chartreuse" },
  { height: 160, color: "chocolate" },
  { height: 40, color: "coral" },
  { height: 60, color: "cornflowerblue" },
  { height: 80, color: "cornsilk" },
  { height: 100, color: "crimson" },
  { height: 120, color: "cyan" },
  { height: 140, color: "darkblue" },
  { height: 160, color: "darkcyan" }
];
