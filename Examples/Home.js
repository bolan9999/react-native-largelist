/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/25
 *
 */

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SpringScrollView } from "react-native-spring-scrollview";

export class Home extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  render() {
    const examples = ["LargeListExamples", "WaterfallListExamples", "StickyFormExample"];
    return (
      <SpringScrollView>
        {examples.map((str, index) =>
          <TouchableOpacity key={index} style={styles.button} onPress={() => this.props.navigation.navigate(str)}>
            <Text style={styles.text}>
              {str}
            </Text>
          </TouchableOpacity>
        )}
      </SpringScrollView>
    );
  }
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
