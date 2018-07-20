/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/19
 *
 */

import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import { SectionContainerPropType } from "./Types";

const largelistHeight = 667;

export class SectionContainer extends React.Component<
  SectionContainerPropType
> {
  updateOffset(offset: number) {
    if (Math.abs(offset - this.state.offset) > largelistHeight / 3)
      this.setState({ offset: offset });
  }

  constructor(props) {
    super(props);
    this.state = { offset: 0 };
  }

  render() {
    const { heightForSection, tops, renderSection, nativeOffset } = this.props;
    const { offset } = this.state;
    return (
      <View style={StyleSheet.absoluteFill}>
        {tops.map((top, index) => {
          if (
            top > offset - largelistHeight*3 &&
            top < offset + largelistHeight * 3
          ) {
            const inputRange = [-1,top];
            const outputRange = [0,0];
            if (tops[index + 1]) {
              const lastOffset = tops[index + 1]-heightForSection(index);
              inputRange.push(lastOffset);
              outputRange.push(lastOffset-top);
              inputRange.push(lastOffset+1);
              outputRange.push(lastOffset-top);
            } else {
              inputRange.push(top+1);
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
              <Animated.View key={top} style={style}>
                {renderSection(index)}
              </Animated.View>
            );
          }
        })}
      </View>
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
