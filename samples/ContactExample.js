/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/22
 *
 */

import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { LargeList } from "../src/LargeList";
import { contacts } from "./DataSource";

export class ContactExample extends React.Component {
  largeList;

  constructor(props) {
    super(props);
    this.state = { refreshing: false };
  }

  render() {
    return (
      <LargeList
        style={styles.container}
        heightForSection={() => 40}
        renderSection={this._renderSection}
        heightForIndexPath={() => 60}
        renderIndexPath={this._renderItem}
        data={contacts}
      />
    );
  }

  _renderSection = (section: number) => {
    const contact = contacts[section];
    return (
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionText}>
          {contact.header}
        </Text>
      </TouchableOpacity>
    );
  };

  _renderItem = ({ section: section, row: row }) => {
    const contact = contacts[section].items[row];
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
  container: {
    flex: 1
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
  row: { flex: 1, flexDirection: "row", alignItems: "center" },
  image: { marginLeft: 16, width: 44, height: 44 },
  rContainer: { marginLeft: 20 },
  title: { fontSize: 18 },
  subtitle: { fontSize: 14, marginTop: 8 }
});
