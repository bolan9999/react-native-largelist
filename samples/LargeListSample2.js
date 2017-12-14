/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/14
 *
 */

import React from "react";
import { View, Image, Text } from "react-native";
import { LargeList } from "../react-native-largelist";
import { messages } from "./DataSource";

class LargeListSample2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {refreshing:false};
  }

  render() {
    return (
      <LargeList
        style={this.props.style}
        numberOfRowsInSection={() => messages.length}
        heightForCell={() => 88}
        onRefresh={()=>{
          this.setState({refreshing:true});
          setTimeout(()=>this.setState({refreshing:false}),2000);
        }}
        refreshing={this.state.refreshing}
        renderCell={this.renderItem.bind(this)}
      />
    );
  }

  renderItem(section: number, row: number) {
    let msg = messages[row];
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Image
            source={msg.icon}
            style={{ marginLeft: 16, width: 44, height: 44 }}
          />
          <View style={{marginLeft:4}}>
            <Text style={{ fontSize: 18 }}>
              {msg.title}
            </Text>
            <Text style={{ fontSize: 14, marginTop: 8 }}>
              {msg.subtitle}
            </Text>
          </View>
        </View>
        {row < messages.length - 1 &&
          <View style={{ backgroundColor: "#EEE", height: 1, marginLeft:16 }} />}
      </View>
    );
  }
}

export { LargeListSample2 };
