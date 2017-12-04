/*
 *
 * Created by Stone
 * Email: bolan999999@gmail.com
 * Date: 2017/12/2
 *
 */

import React from "react";
import { LargeList } from "../react-native-largelist";
// import { LargeList } from "react-native-largelist";
import { View, Text, StyleSheet, RefreshControl } from "react-native";

class LargeListSample extends React.Component {
  color;
  minCellHeight = 24;
  maxCellHeight = 48;
  minSectionHeight = 48;
  maxSectionHeight = 96;
  refreshing = false;

  constructor(props) {
    super(props);
    this.state = { refreshing: false };
  }

  render() {
    return (
      <LargeList
        style={{ flex: 1 }}
        bounces={true}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true });
          setTimeout(() => this.setState({ refreshing: false }), 2000);
        }}
        safeMargin={600}
        numberOfRowsInSection={section => this.props.numberOfEachSection}
        numberOfSections={this.props.numberOfSections}
        heightForCell={(section, row) =>
          row % 2 ? this.minCellHeight : this.maxCellHeight}
        renderCell={this.renderItem.bind(this)}
        heightForSection={section =>
          section % 2 ? this.minSectionHeight : this.maxSectionHeight}
        renderHeader={this.renderHeader.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        renderSection={section => {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: section % 2 ? "grey" : "yellow",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>
                I am section {section}
              </Text>
            </View>
          );
        }}
      />
    );
  }

  renderItem(section, row) {
    let color;
    switch (row % 3) {
      case 0:
        color = "red";
        break;
      case 1:
        color = "green";
        break;
      case 2:
        color = "blue";
        break;
    }
    return (
      <View
        tag={row}
        style={{
          flex: 1,
          backgroundColor: color,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ marginLeft: row % 3 * 50 }}>
          {"Section " + section + "  Row " + row}
        </Text>
      </View>
    );
  }

  renderFooter() {
    return (
      <View
        style={{
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(99,99,99)"
        }}
      >
        <Text>I am footer</Text>
      </View>
    );
  }

  renderHeader() {
    return (
      <View
        style={{
          height: 100,
          backgroundColor: "rgb(99,99,99)",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>I am header</Text>
      </View>
    );
  }
}

export { LargeListSample };
