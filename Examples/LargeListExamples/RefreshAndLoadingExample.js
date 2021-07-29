/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/24
 *
 */

import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NormalHeader } from "react-native-spring-scrollview/NormalHeader";
import { NormalFooter } from "react-native-spring-scrollview/NormalFooter";
import { LargeList } from "../../src";
import { contacts } from "./DataSource";

export class RefreshAndLoadingExample extends React.Component {

  static navigationOptions = {
    title: "RefreshAndLoadingExample"
  };

  _largeList;
  _index = 0;

  state = { data: [contacts[0]], allLoaded: false };

  render() {
    return (
      <LargeList
        ref={ref => (this._largeList = ref)}
        data={this.state.data}
        heightForSection={() => 40}
        renderSection={this._renderSection}
        heightForIndexPath={() => 60}
        renderIndexPath={this._renderItem}
        refreshHeader={NormalHeader}
        onRefresh={this._onRefresh}
        loadingFooter={NormalFooter}
        onLoading={this._onLoading}
        allLoaded={this.state.allLoaded}
        renderHeader={this._renderHeader}
        renderFooter={this._renderFooter}
      />
    );
  }
  _renderHeader = () => {
    return (
      <View>
      <TouchableOpacity onPress={()=>this._largeList.beginRefresh()}>
        <Text style={styles.header}>I am header. Click to begin refresh</Text>
      </TouchableOpacity>
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

  _onRefresh = () => {
    setTimeout(() => {
      this._largeList.endRefresh();
      this._index = 0;
      this.setState({
        data: [contacts[this._index]],
        allLoaded: this._index > 2
      });
    }, 2000);
  };

  _onLoading = () => {
    setTimeout(() => {
      this._largeList.endLoading();
      this.setState(p => ({
        data: p.data.concat(contacts[++this._index]),
        allLoaded: this._index > 2
      }));
    }, 2000);
  };

  _renderSection = (section: number) => {
    const contact = this.state.data[section];
    return (
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionText}>
          {contact.header}
        </Text>
      </TouchableOpacity>
    );
  };

  _renderItem = ({ section: section, row: row }) => {
    const contact = this.state.data[section].items[row];
    return (
      <TouchableOpacity style={styles.row}>
        <Image source={contact.icon} style={styles.image} />
        <View style={styles.rContainer}>
          <Text style={styles.title}>
            {contact.name}
          </Text>
          <Text style={styles.subtitle}>
            {contact.phone}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  search: {
    marginTop: 20,
    fontSize: 18
  },
  section: {
    flex: 1,
    backgroundColor: "#EEE",
    justifyContent: "center"
  },
  sectionText: {
    fontSize: 20,
    marginLeft: 10
  },
  header: {
    alignSelf: "center",
    marginVertical: 30
  },
  row: { flex:1, flexDirection: "row", alignItems: "center" },
  image: { marginLeft: 16, width: 44, height: 44 },
  rContainer: { marginLeft: 20 },
  title: { fontSize: 18 },
  subtitle: { fontSize: 14, marginTop: 8 }
});
