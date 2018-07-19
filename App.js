import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TextInput
} from "react-native";
import { HeightUnequalExample, HeightEqualExample } from "./samples";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: -1
    };
  }

  render() {
    switch (this.state.type) {
      case 0:
        return <HeightEqualExample />;
      case 1:
        return <HeightUnequalExample />;
    }
    return this.renderChoose();
  }

  renderChoose() {
    const examples = ["HeightEqualExample", "HeightUnequalExample"];
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
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
  },
  button: { alignItems: "center" }
});
