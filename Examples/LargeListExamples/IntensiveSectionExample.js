/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:11:34
 * @LastEditTime: 2021-07-28 09:38:05
 * @LastEditors: 石破天惊
 * @Description: 
 */
/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/25
 *
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LargeList } from "../../src";

export class IntensiveSectionExample extends React.Component {
  static navigationOptions = {
    title: "IntensiveSectionExample"
  };

  _sectionCount = 100;
  _rowCount = 1;

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [];
    for (let section = 0; section < this._sectionCount; ++section) {
      const sContent = { items: [] };
      for (let row = 0; row < this._rowCount; ++row) {
        sContent.items.push(row);
      }
      data.push(sContent);
    }
    return (
      <LargeList
        data={data}
        heightForSection={() => 50}
        renderSection={this._renderSection}
        heightForIndexPath={() => 50}
        renderIndexPath={this._renderIndexPath}
      />
    );
  }

  _renderSection = (section: number) => {
    return (
      <View style={styles.section}>
        <Text>
          Section {section}
        </Text>
      </View>
    );
  };

  _renderIndexPath = ({ section: section, row: row }) => {
    return (
      <View style={styles.row}>
        <Text>
          Section {section} Row {row}
        </Text>
        <View style={styles.line} />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "#EEE"
  }
});
