/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/14
 *
 */

import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { LargeList } from "../react-native-largelist";
// import {LargeList} from "react-native-largelist";
import { contacts as orgContracts } from "./DataSource";
import { iconObject } from "./icons";

class LargeListSample3 extends React.Component {
  contracts;
  loadComplete = false;

  constructor(props) {
    super(props);
    this.contacts = [];
    this.state = { refreshing: false, loadingMore: false };
  }

  render() {
    return (
      <LargeList
        ref={ref => (this.root = ref)}
        style={this.props.style}
        numberOfSections={() => this.contacts.length}
        numberOfRowsInSection={section => this.contacts[section].info.length}
        renderSection={this.renderSection.bind(this)}
        renderCell={this.renderItem.bind(this)}
        heightForSection={() => 40}
        heightForCell={() => 60}
        keyboardShouldPersistTaps={'handled'}
        renderHeader={this.renderHeader.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        onRefresh={() => {
          this.setState({ refreshing: true });
          setTimeout(() => {
            this.contacts = [...orgContracts];
            // this.contacts = this.contacts.concat(orgContracts);
            this.setState({ refreshing: false });
            this.root.reloadData();
          }, 2000);
        }}
        refreshing={this.state.refreshing}
        onLoadMore={() => {
          setTimeout(() => {
            this.contacts = this.contacts.concat(orgContracts);
            if (!this.loadComplete) this.loadComplete = true;
            this.forceUpdate();
            this.root.reloadData();
          }, 2000);
        }}
        allLoadCompleted={this.loadComplete}
        renderEmpty={() =>
          <Text style={{ fontSize: 20, alignSelf: "center" }}>Empty</Text>}
      />
    );
  }

  renderSection(section: number) {
    if (!this.contacts[section]) {
      console.log("section is error", section);
    }
    return (
      <View
        style={{ flex: 1, backgroundColor: "#EEE", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 18, marginLeft: 16 }} fontWeight={1800}>
          {this.contacts[section].header}
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
              source={this.contacts[section].info[row].icon}
            />
            <TouchableOpacity onPress={()=>{}}>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>
              {this.contacts[section].info[row].name}
            </Text>
            </TouchableOpacity>
          </View>
          <TextInput style={{ fontSize: 16, marginRight: 16,width:100 }} defaultValue={this.contacts[section].info[row].phone}>

          </TextInput>
        </View>
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
        <Text style={{ fontSize: 16, marginRight: 16 }}>15555555555</Text>
      </View>
    );
  }

  renderFooter() {
    let count = 0;
    this.contacts.forEach(item => {
      item.info.forEach(() => {
        count++;
      });
    });
    return (
      <View
        style={{ height: 48, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 16 }}>
          共{count}位联系人
        </Text>
      </View>
    );
  }
}

export { LargeListSample3 };
