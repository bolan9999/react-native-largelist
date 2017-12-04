/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/2
 *
 */

import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SectionList,
  FlatList
} from "react-native";

class SectionListSample extends React.Component {
  sections: [];
  minCellHeight= 24;
  maxCellHeight= 48;
  minSectionHeight = 48;
  maxSectionHeight = 96;
  constructor(props) {
    super(props);
    this.sections = [];
    let datas = [];
    for (let i = 0; i < this.props.numberOfSections*this.props.numberOfEachSection; ++i) {
      datas.push({ row: i });
    }
    this.sections.push({ data: datas });
  }

  render() {
    return (
      <SectionList
        style={{ flex: 1, backgroundColor: "rgb(245,245,245)" }}
        // renderSectionHeader={info => this.renderSection(0, info.row)}
        renderItem={cell => this.renderItem(0, cell.item.row)}
        sections={this.sections}
        ListHeaderComponent={this.renderHeader.bind(this)}
        ListFooterComponent={this.renderFooter.bind(this)}
        keyExtractor={(item, index) => index}
        // getItemLayout={(data, index) => ({
        //   length:this.maxCellHeight,
        //   offset:this.maxCellHeight*index,
        //   index:index
          // length: index % 2 ? this.minCellHeight : this.maxCellHeight,
          // offset:
          //   this.maxCellHeight * Math.floor((index + 1) / 2) +
          //   this.minCellHeight *
          //     Math.floor((index > 0 ? index - 1 : 0) / 2),
          // index
        // })}
      />
    );
  }

  renderSection(section) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "gray",
          justifyContent: "center",
          alignItems: "center",
          height: section % 2 ? this.minSectionHeight : this.maxSectionHeight
        }}
      >
        <Text>
          I am section {section}
        </Text>
      </View>
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
      <PureView
        section={section}
        row={row}
        color={color}
        height={row % 2 ? this.minCellHeight : this.maxCellHeight}
      />
    );
  }

  renderFooter() {
    return (
      <View
        style={{
          height: 100,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ backgroundColor: "transparent" }}>I am footer</Text>
      </View>
    );
  }

  renderHeader() {
    return (
      <View
        style={{
          height: 100,
          backgroundColor: "rgb(245,245,245)",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>I am header</Text>
      </View>
    );
  }
}

class PureView extends React.PureComponent {
  render() {
    return (
      <View
        key={this.props.row}
        style={{
          flex: 1,
          backgroundColor: this.props.color,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: this.props.height
        }}
      >
        <Text style={{ marginLeft: this.props.row % 3 * 50 }}>
          {"Section " + this.props.section + "  Row " + this.props.row}
        </Text>
      </View>
    );
  }
}

export { SectionListSample };
