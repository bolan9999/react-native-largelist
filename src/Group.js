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

  render() {
    return (
      <View style={styles.container}>
        {this._renderCells()}
        {/*<Text style={styles.text}>{this.props.index}</Text>*/}
      </View>
    );
  }

  _renderCells() {
    return this.props.indexes[this._currentIndex].map((indexPath, index) => {
      return (
        <View
          key={index}
          style={{ height: this.props.heightForIndexPath(indexPath) }}
        >
          {this.props.renderIndexPath(indexPath)}
        </View>
      );
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  text:{
    position:"absolute",
    left:0,
    top:0
  }
});
