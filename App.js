import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TextInput
} from "react-native";
import {
  LargeListSample,
  SectionListSample,
  LargeListSample2,
  LargeListSample3,
  LargeListSample4, ComplexExample
} from "./samples";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      numberOfSections: 10,
      numberOfEachSection: 100,
      nativeOptimize: 0
    };
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
            nativeOptimize={this.state.nativeOptimize == 1}
          />
        );
      case 3:
        return <LargeListSample2 style={{ flex: 1, marginTop:40 }} />;
      case 4:
        return <LargeListSample3 style={{ flex: 1, marginTop:40 }} />;
      case 5:
        return <LargeListSample4/>
      case 6:
        return <ComplexExample/>
    }
    return this.renderChoose();
  }

  renderChoose() {
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => this.setState({ type: 6 })}
        >
          <Text style={styles.text}>ComplexExample</Text>
        </TouchableOpacity>
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
