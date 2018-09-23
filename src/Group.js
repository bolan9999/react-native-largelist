/*
 *
 * Created by Stone
 * Email: shanshang130@gmail.com
 * Date: 2018/7/17
 *
 */

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import type { GroupPropType } from "./Types";

export class Group extends React.Component<GroupPropType> {
  _currentIndex = 0;
  _offset = 0;

  contentConversion(offset: number) {
    // if (Math.abs(this._offset - offset) < 300) return;
    this._offset = offset;
    const { input, output } = this.props;
    const cc = [];
    output.forEach(v => cc.indexOf(v) < 0 && cc.push(v));
    for (let i = 0; i < input.length; ++i) {
      if (offset >= input[i] && offset <= input[i + 1]) {
        this.update(cc.indexOf(output[i]));
        break;
      }
    }
  }

  update(index: number) {
    if (
      index < 0 ||
      index >= this.props.indexes.length ||
      this._currentIndex === index
    )
      return;
    this._currentIndex = index;
    this.forceUpdate();
  }

  componentWillReceiveProps(next: GroupPropType) {
    if (next.offset) {
      this._offset = null;
      this.contentConversion(next.offset);
    }
  }

  render() {
    const {
      indexes,
      heightForSection,
      heightForIndexPath,
      renderIndexPath
    } = this.props;
    if (this._currentIndex >= indexes.length) return null;
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
    // .concat(<Text key={1000} style={styles.showIndex}>{this.props.index}</Text>);
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
