/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/18
 *
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LargeList } from "../../src";
import { CommonLottieHeader } from "react-native-spring-scrollview/Customize/CommonLottieHeader";
import { CommonLottieFooter } from "react-native-spring-scrollview/Customize/CommonLottieFooter";
export class HeightUnequalExample extends React.Component {
  static navigationOptions = {
    title: "HeightUnequalExample",
  };

  _sectionCount = 1;
  _rowCount = 5;
  _list: LargeList;

  constructor(props) {
    super(props);
    this.state = { select: 0 };
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
        ref={(ref) => (this._list = ref)}
        heightForSection={() => 50}
        renderSection={this._renderSection}
        heightForIndexPath={({ section: section, row: row }) =>
          row % 2 ? 50 : 100
        }
        renderIndexPath={this._renderIndexPath}
        refreshHeader={CommonLottieHeader}
        loadingFooter={CommonLottieFooter}
        onRefresh={this._onRefresh}
        onLoading={this._onLoading}
      />
    );
  }

  _onRefresh = () => {
    setTimeout(() => this._list.endRefresh(), 2000);
  };
  _onLoading = () => {
    setTimeout(() => this._list.endLoading(true), 2000);
  };

  _renderSection = (section: number) => {
    return (
      <View style={styles.section}>
        <Text>Section {section}</Text>
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
    alignItems: "center",
  },
  row: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "#EEE",
  },
});
