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

export class Group extends React.Component<GroupPropType> {
  update() {}

  render() {
    return (
      <View style={styles.container}>
        {this._renderCells()}
      </View>
    );
  }

  _renderCells() {
    return this.props.indexes.map((indexPath, index) => {
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
  }
});
