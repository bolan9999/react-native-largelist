import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch
} from "react-native";
import {
  HeightUnequalExample,
  HeightEqualExample,
  MessageExample,
  ContactExample,
  MenuListExample,
  RefreshAndLoadingExample,
  IntensiveSectionExample,
  NativeLargeListExample
} from "./Examples";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      native: false,
      type: -1
    };
  }

  render() {
    switch (this.state.type) {
      case 0:
        return <HeightEqualExample native={this.state.native} />;
      case 1:
        return <HeightUnequalExample native={this.state.native} />;
      case 2:
        return <MessageExample native={this.state.native} />;
      case 3:
        return <ContactExample native={this.state.native} />;
      case 4:
        return <MenuListExample native={this.state.native} />;
      case 5:
        return <RefreshAndLoadingExample native={this.state.native} />;
      case 6:
        return <IntensiveSectionExample native={this.state.native} />;
    }
    return this.renderChoose();
  }

  renderChoose() {
    const examples = [
      "HeightEqualExample",
      "HeightUnequalExample",
      "MessageExample",
      "ContactExample",
      "MenuListExample",
      "RefreshAndLoadingExample",
      "IntensiveSectionExample"
    ];
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        <View style={styles.choseContainer}>
          <Text>Use Native ScrollView</Text>
          <Switch
            value={this.state.native}
            onValueChange={value => this.setState({ native: value })}
          />
        </View>
        {examples.map((str, index) =>
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => this.setState({ type: index })}
          >
            <Text style={styles.text}>
              {str}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // alignItems: "stretch"
  },
  choseContainer: {
    marginVertical: 40,
    flexDirection: "row",
    justifyContent: "center"
  },
  input: {
    fontSize: 16,
    width: 150,
    borderWidth: StyleSheet.hairlineWidth
  },

  text: {
    fontSize: 16,
    marginTop: 20
  },
  button: { alignItems: "center" }
});
