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
  LargeListSample4
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
        <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 50 }}>
          <Text style={{ width: 80 }}>nativeOptimize</Text>
          <TextInput
            style={styles.input}
            keyboardType={"numeric"}
            defaultValue={this.state.nativeOptimize.toString()}
            onChangeText={text =>
              text.length > 0 &&
              this.setState({ nativeOptimize: parseInt(text) })}
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
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => this.setState({ type: 3 })}
        >
          <Text style={styles.text}>LargeListSample2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => this.setState({ type: 4 })}
        >
          <Text style={styles.text}>LargeListSample3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => this.setState({ type: 5 })}
        >
          <Text style={styles.text}>LargeListSample3</Text>
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
