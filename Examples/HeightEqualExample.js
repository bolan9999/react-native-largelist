/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/19
 *
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LargeList } from "../src";

export class HeightEqualExample extends React.Component {
  _sectionCount = 10;
  _rowCount = 10;

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
        style={styles.container}
        data={data}
        heightForSection={() => 50}
        renderSection={this._renderSection}
        heightForIndexPath={() => 50}
        renderIndexPath={this._renderIndexPath}
        renderHeader={this._renderHeader}
        renderFooter={this._renderFooter}
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

  _renderHeader = () => {
    return (
      <View>
        <Text style={styles.header}>I am header</Text>
      </View>
    );
  };

  _renderFooter = () => {
    return (
      <View>
        <Text style={styles.header}>I am Footer</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    alignSelf:"center",
    marginVertical: 50
  },
  section: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
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

