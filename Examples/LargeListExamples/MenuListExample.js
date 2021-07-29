/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/22
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
import { foods } from "./DataSource";
import { LargeList } from "../../src";

const leftData = [{ items: foods }];

export class MenuListExample extends React.Component {
  static navigationOptions = {
    title: "MenuListExample"
  };

  selectedIndex: number = 0;
  _listRef: LargeList;
  indexes: LargeList;
  _buttonRefs: [] = [];

  constructor(props) {
    super(props);
    for (let s = 0; s < foods.length; ++s) {
      const refs = [];
      for (let r = 0; r < foods[s].items.length; ++r) {
        refs.push(React.createRef());
      }
      this._buttonRefs.push(refs);
    }
  }

  render() {
    const buttons = [];
    this._buttonRefs.forEach(btn => buttons.concat(btn));
    return (
      <View style={styles.container}>
        <LargeList
          style={styles.lc}
          ref={ref => (this.indexes = ref)}
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={leftData}
          heightForIndexPath={() => 80}
          renderIndexPath={this.renderIndexes}
        />
        <LargeList
          ref={ref => (this._listRef = ref)}
          style={styles.rc}
          data={foods}
          heightForSection={() => 36}
          renderSection={this.renderSection}
          heightForIndexPath={() => 96}
          renderIndexPath={this.renderItem}
        />
      </View>
    );
  }

  renderIndexes = ({ section: section, row: row }) => {
    const food = leftData[section].items[row];
    return (
      <TouchableOpacity
        ref={this._buttonRefs[section][row]}
        style={styles.indexes}
        onPress={() => {
          this._listRef
            .scrollToIndexPath({ section: row, row: -1 }, true)
            .then();
        }}
      >
        <Text style={{ fontSize: 18 }} fontWeight={300}>
          {food.header}
        </Text>
        <View style={styles.line} />
      </TouchableOpacity>
    );
  };

  renderSection = (section: number) => {
    const sectionData = foods[section];
    return (
      <View style={styles.section}>
        <Text style={styles.sectionText} fontWeight={300}>
          {sectionData.header}
        </Text>
      </View>
    );
  };

  renderItem = ({ section: section, row: row }) => {
    let food = foods[section].items[row];
    return (
      <View style={{ flex: 1}}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            style={{
              marginLeft: 5,
              width: 80,
              height: 80,
              alignSelf: "center"
            }}
            source={food.icon}
            fadeDuration={0}
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
              <Text style={{ fontSize: 14, color: "#666", marginLeft: 10 }}>
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
        {row < foods[section].items.length - 1 &&
          <View style={styles.rowLine} />}
      </View>
    );
  };

  onBuy = () => {
    console.log("buy");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  lc: {
    flex: 1
  },
  rc: {
    flex: 4,
    flexGrow: 4
  },
  indexes: {
    flex:1,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center"
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "#999"
  },
  section: { flex: 1, backgroundColor: "#AAA", justifyContent: "center" },
  sectionText: { marginLeft: 10, fontSize: 18 },
  rowLine: {
    height: 1,
    backgroundColor: "#999",
    marginLeft: 16
  }
});

