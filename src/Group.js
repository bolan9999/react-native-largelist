/*
 *
 * Created by Stone
 * Email: shanshang130@gmail.com
 * Date: 2018/7/17
 *
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { GroupPropType, IndexPath } from "./Types";

let lastUpdate = 0;

export class Group extends React.Component<GroupPropType> {
  _currentIndex = 0;
  _dirty = false;

  contentConversion(offset: number) {
    const { input, output } = this.props;
    const cc = [];
    output.forEach(v => cc.indexOf(v) < 0 && cc.push(v));
    for (let i = 0; i < input.length; ++i) {
      if (offset >= input[i] && offset <= input[i + 1]) {
        this.update(cc.indexOf(output[i]));
      }
    }
  }

  update(index: number) {
    if (
      index < 0 ||
      index >= this.props.indexes.length ||
      (!this._dirty && this._currentIndex === index)
    )
      return;
    this._currentIndex = index;
    const now = new Date().getTime();
    if (now - lastUpdate > 100) {
      lastUpdate = now;
      this._dirty = false;
      this.forceUpdate();
    } else {
      this._dirty = true;
    }
  }

  render2() {
    return (
      <View style={styles.container}>
        {this._renderCells()}
      </View>
    );
  }

  render() {
    const {
      indexes,
      heightForSection,
      heightForIndexPath,
      renderIndexPath
    } = this.props;
    return indexes[this._currentIndex].map((indexPath, index) => {
      const height =
        indexPath.row === -1
          ? heightForSection(indexPath.section)
          : heightForIndexPath(indexPath);
      return (
        <View key={index} style={{ height: height }}>
          {indexPath.row === -1 ? null : renderIndexPath(indexPath)}
        </View>
      );
    });
    //.concat(<Text key={1000} style={styles.showIndex}>{this.props.index}</Text>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  showIndex: {
    position: "absolute",
    left: 0,
    top: 0
  }
});
