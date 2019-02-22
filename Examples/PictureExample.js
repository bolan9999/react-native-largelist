/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/20
 *
 */

import React from "react";
import { Image, SafeAreaView, Dimensions } from "react-native";
import { WaterfallList } from "../src";

const cookData = require("./data.json").data.list;

export class PictureExample extends React.Component {
  state = { data: [...cookData, ...cookData, ...cookData, ...cookData, ...cookData] };

  render() {
    const screenWidth = Dimensions.get("window").width;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WaterfallList
          data={this.state.data}
          heightForItem={item => screenWidth/Math.floor(screenWidth / 150) * +item.showimg_height / +item.showimg_width}
          preferColumnWidth={150}
          renderItem={this._renderItem}
        />
      </SafeAreaView>
    );
  }

  _renderItem = item => {
    return <Image source={{ uri: item.showimg }} style={{ flex: 1,margin:5 }} />;
  };
}
