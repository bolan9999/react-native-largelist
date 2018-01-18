/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/18
 *
 */

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import { LargeList } from "../react-native-largelist";
import { foods } from "./DataSource";

foods[0].selected = true;

class LargeListSample4 extends React.Component {
  selectedIndex: number = 0;
  listRef: LargeList;
  indexes: LargeList;

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: Platform.OS === "ios" ? 20 : 0
        }}
      >
        <LargeList
          style={{ flex: 1 }}
          ref={ref => (this.indexes = ref)}
          numberOfRowsInSection={() => foods.length}
          heightForCell={() => 80}
          renderCell={this.renderIndexes.bind(this)}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
        <LargeList
          ref={ref => (this.listRef = ref)}
          style={{ flex: 4 }}
          numberOfSections={()=>foods.length}
          numberOfRowsInSection={section => foods[section].list.length}
          heightForSection={() => 36}
          renderSection={this.renderSection.bind(this)}
          heightForCell={() => 96}
          renderCell={this.renderItem.bind(this)}
          onSectionDidHangOnTop={this.onSectionChange.bind(this)}
        />
      </View>
    );
  }

  renderIndexes(section: number, row: number) {
    let selected = foods[row].selected;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: selected ? "#FFF" : "#EEE",
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => {
          // this.listRef.scrollToIndexPath({ section: row, row: 0 });
          foods[row].selected = true;
          foods[this.selectedIndex].selected = false;
          this.selectedIndex = row;
          this.indexes.reloadData();
        }}
      >
        <Text style={{ fontSize: 18 }} fontWeight={300}>
          {foods[row].header}
        </Text>
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: StyleSheet.hairlineWidth,
            backgroundColor: "#999"
          }}
        />
      </TouchableOpacity>
    );
  }

  renderSection(section: number) {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#AAA", justifyContent: "center" }}
      >
        <Text style={{ marginLeft: 10, fontSize: 18 }} fontWeight={300}>
          {foods[section].header}
        </Text>
      </View>
    );
  }

  renderItem(section: number, row: number) {
    let food = foods[section].list[row];
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            style={{
              marginLeft: 5,
              width: 80,
              height: 80,
              alignSelf: "center"
            }}
            source={food.icon}
          />
          <View style={{ flex: 1, marginLeft: 5, marginTop: 10 }}>
            <Text style={{ fontSize: 18 }} fontWeight={300}>
              {food.title}
            </Text>
            <Text style={{ fontSize: 14, color: "#666" }}>
              {food.subtitle}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, color: "#666" }}>
                {food.sales}
              </Text>
              <Text style={{ fontSize: 14, color: "#666",marginLeft:10 }}>
                {food.praise}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 16, color: "red" }}>
                {food.prise}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "rgb(232,191,106)",
                  borderRadius: 5,
                  marginRight: 16
                }}
                onPress={() => this.onBuy(food)}
              >
                <Text style={{ fontSize: 16, marginHorizontal: 5 }}>购买</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {row < foods[section].list.length - 1 &&
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: "#999",
              marginLeft: 16
            }}
          />}
      </View>
    );
  }

  onSectionChange(section:number){
    foods[this.selectedIndex].selected = false;
    foods[section].selected = true;
    // 使用局部更新
    // this.indexes.reloadIndexPaths([
    //   { section: 0, row: this.selectedIndex },
    //   { section: 0, row: section }
    // ]);
    this.selectedIndex = section;
    // 使用更新所有数据源
    this.indexes.reloadData();

    let bFind = false;
    this.indexes.visibleIndexPaths().forEach(indexPath=>{
      if (indexPath.row===section) {
        bFind = true;
      }
    });
    if (!bFind) {
      this.indexes.scrollToIndexPath({section:0,row:section});
    }

  }

  onBuy(food) {
    console.log("buy");
  }
}

export { LargeListSample4 };
