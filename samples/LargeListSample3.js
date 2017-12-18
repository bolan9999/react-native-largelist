/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/14
 *
 */

import React from "react";
import { View, Text, Image } from "react-native";
import { LargeList } from "../react-native-largelist";
import { contacts } from "./DataSource";
import { iconObject } from "./icons";

class LargeListSample3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {refreshing:false};
  }

  render() {
    return (
      <LargeList
        style={this.props.style}
        // safeMargin={0}
        // dynamicMargin={0}
        numberOfSections={contacts.length}
        numberOfRowsInSection={section => {
          if (section<0) {
            console.log("section<0,",section);
          }
          return contacts[section].info.length;
        }}
        renderSection={this.renderSection.bind(this)}
        renderCell={this.renderItem.bind(this)}
        heightForSection={() => 40}
        heightForCell={() => 60}
        renderHeader={this.renderHeader.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        onRefresh={()=>{
          this.setState({refreshing:true});
          setTimeout(()=>this.setState({refreshing:false}),2000);
        }}
        refreshing={this.state.refreshing}
      />
    );
  }

  renderSection(section: number) {
    if (!contacts[section]){
      console.log("section is error",section);
    }
    return (
      <View
        style={{ flex: 1, backgroundColor: "#EEE", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 18, marginLeft: 16 }} fontWeight={1800}>
          {contacts[section].header}
        </Text>
      </View>
    );
  }

  renderItem(section, row) {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ marginLeft: 16, width: 40, height: 40 }}
              source={contacts[section].info[row].icon}
            />
            <Text style={{ fontSize: 16, marginLeft: 10 }}>
              {contacts[section].info[row].name}
            </Text>
          </View>
          <Text style={{ fontSize: 16, marginRight: 16 }}>
            {contacts[section].info[row].phone}
          </Text>
        </View>
        {(row < contacts[section].info.length - 1 || section===contacts.length-1) &&
          <View style={{ backgroundColor: "#CCC", height: 1,marginLeft:16 }} />}
      </View>
    );
  }

  renderHeader() {
    return (
      <View
        style={{
          height: 80,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ marginLeft: 16, width: 60, height: 60 }}
            source={iconObject.icon2}
          />
          <Text style={{ marginLeft: 16, fontSize: 16 }} fontWeight={900}>
            本机号码
          </Text>
        </View>
        <Text style={{ fontSize: 16,marginRight:16 }}>15555555555</Text>
      </View>
    );
  }

  renderFooter(){
    let count = 0;
    contacts.forEach(item=>{
      item.info.forEach(()=>{
        count++;
      });
    });
    return <View style={{height:48,alignItems:"center",justifyContent:"center"}}>
      <Text style={{fontSize:16}}>共{count}位联系人</Text>
    </View>
  }
}

export { LargeListSample3 };
