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
import { LargeList } from "../src/LargeList";

export class ComplexExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { select: 0 };
  }

  render() {
    const data = [];
    for (let section = 0; section < 3; ++section) {
      const sContent = { items: [] };
      for (let row = 0; row < 10; ++row) {
        sContent.items.push(row);
      }
      data.push(sContent);
    }
    return (
      <LargeList
        style={styles.container}
        data={data}
        heightForSection={()=>50}
        renderSection={this._renderIndexPath}
        heightForIndexPath={() => 50}
        renderIndexPath={this._renderIndexPath}
      />
    );
  }

  _renderIndexPath({ section: section, row: row }) {
    return (
      <View style={styles.container}>
        <Text>
          Section {section} Row {row}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
