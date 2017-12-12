import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TextInput
} from "react-native";
import { LargeListSample, SectionListSample } from "./samples";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: 0, numberOfSections: 10, numberOfEachSection: 100 };
  }

  render() {
    switch (this.state.type) {
      case 1:
        return (
          <SectionListSample
            numberOfSections={this.state.numberOfSections}
            numberOfEachSection={this.state.numberOfEachSection}
          />
        );
      case 2:
        return (
          <LargeListSample
            numberOfSections={this.state.numberOfSections}
            numberOfEachSection={this.state.numberOfEachSection}
          />
        );
    }
    return this.renderChoose();
  }

  renderChoose() {
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        <View style={{ flexDirection: "row", marginTop: 50, marginLeft: 50 }}>
          <Text style={{ width: 80 }}>sections</Text>
          <TextInput
            style={styles.input}
            keyboardType={"numeric"}
            defaultValue={this.state.numberOfSections.toString()}
            onChangeText={text =>
              this.setState({ numberOfSections: parseInt(text) })}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 50 }}>
          <Text style={{ width: 80 }}>rows</Text>
          <TextInput
            style={styles.input}
            keyboardType={"numeric"}
            defaultValue={this.state.numberOfEachSection.toString()}
            onChangeText={text =>
              this.setState({ numberOfEachSection: parseInt(text) })}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
            justifyContent: "space-around"
          }}
        >
          <TouchableOpacity onPress={() => this.setState({ type: 1 })}>
            <Text style={styles.text}>SectionList</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ type: 2 })}>
            <Text style={styles.text}>LargeList</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch"
  },
  input: {
    fontSize: 16,
    width: 150,
    borderWidth: StyleSheet.hairlineWidth
  },

  text: {
    fontSize: 16,
    marginTop: 20
  }
});
