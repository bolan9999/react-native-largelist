/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/24
 *
 */

import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import type { SectionPropType } from "./Types";

export class Section extends React.Component<SectionPropType> {
  section;

  constructor(props: SectionPropType) {
    super(props);
    this.section = props.section;
  }

  componentWillReceiveProps(next: SectionPropType) {
    this.section = next.section;
  }

  updateSection(section) {
    this.section = section;
    this.forceUpdate();
  }

  render() {
    const { heightForSection, renderSection, nativeOffset, tops } = this.props;
    const index = this.section;
    const top = tops[index];
    const inputRange = [-1, top];
    const outputRange = [0, 0];
    if (tops[index + 1]) {
      const lastOffset = tops[index + 1] - heightForSection(index);
      inputRange.push(lastOffset);
      outputRange.push(lastOffset - top);
      inputRange.push(lastOffset + 1);
      outputRange.push(lastOffset - top);
    } else {
      inputRange.push(top + 1);
      outputRange.push(1);
    }
    const style = StyleSheet.flatten([
      styles.section,
      {
        top: top,
        height: heightForSection(index),
        transform: [
          {
            translateY: nativeOffset.interpolate({
              inputRange: inputRange,
              outputRange: outputRange
            })
          }
        ]
      }
    ]);
    return (
      <Animated.View style={style}>
        {renderSection(index)}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  section: {
    position: "absolute",
    left: 0,
    right: 0
  }
});
