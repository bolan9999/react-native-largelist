/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/25
 *
 */

import React from "react";
import { SpringScrollView } from "react-native-spring-scrollview";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { WaterfallListExample } from "./WaterfallListExample";
import { PictureExample } from "./PictureExample";

export class WaterfallListExamples extends React.Component {
  static navigationOptions = {
    title: "WaterfallListExamples"
  };

  render() {
    return (
      <SpringScrollView>
        {this.state.examples.map((example, index) =>
          <TouchableOpacity key={index} style={styles.button} onPress={() => this.props.navigation.navigate(example)}>
            <Text style={styles.text}>
              {example}
            </Text>
          </TouchableOpacity>
        )}
      </SpringScrollView>
    );
  }

  state = {
    examples: ["WaterfallListExample", "PictureExample"]
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center"
  },
  button: { alignItems: "center" }
});
