/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { TableView } from "sttv-tableview";
// import { TableView } from "./module";

export default class App extends React.Component {
  ref: TableView;
  color;
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
        key={row}
        tag={row}
        style={{
          flex: 1,
          backgroundColor:
            this.color && section == 0 && row == 0 ? this.color : color,
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        {false &&
          <TouchableOpacity
            onPress={() => {
              this.color = "blue";
              // this.ref.reloadCells([{"section":0, "row":0},{"section":0,"row":1}], 100);
              // this.ref.reloadAll();
              this.ref.scrollTo({section:0, row:5});
            }}
          >
            <Text style={{ fontSize: 40, textAlign: "center" }}>Press</Text>
          </TouchableOpacity>}
        <TableView
          ref={ref => (this.ref = ref)}
          style={{ flex: 1, backgroundColor: "red" }}
          bounces={true}
          refreshable={true}
          onTopRefresh={() => console.log("refreshing")}
          numberOfRowsInSection={section => 3000}
          numberOfSections={1}
          heightForCell={(section, row) => (row % 2 ? 48 : 96)}
          renderCell={this.renderItem.bind(this)}
          renderSection={section =>
            <View
              style={{
                flex: 1,
                backgroundColor: "gray",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>
                I am section {section}
              </Text>
            </View>}
          heightForSection={section => (section % 2 ? 40 : 80)}
          renderHeader={() =>
            <View
              style={{
                height: 100,
                backgroundColor: "rgb(245,245,245)",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>I am header</Text>
            </View>}
          renderFooter={() =>
            <View
              style={{
                height: 100,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>I am footer</Text>
            </View>}
        />
      </View>
    );
  }
}
