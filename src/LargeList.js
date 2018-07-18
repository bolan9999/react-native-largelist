/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/17
 *
 */

import React from "react";
import { Animated, StyleSheet, Text, View, Dimensions } from "react-native";
import { styles } from "./styles";
import { VerticalScrollView } from "react-native-spring-scrollview";
import type { LargeListPropType } from "./Types";
import { Group } from "./Group";

const groupMinHeight = Dimensions.get("window").height / 2;

export class LargeList extends React.Component<LargeListPropType> {
  _groupRefs = [];
  _offset: Animated.Value;

  constructor(props) {
    super(props);
    [0, 1, 2, 3].forEach(() => this._groupRefs.push(React.createRef()));
  }

  render() {
    const { style, data } = this.props;
    let sum = 0;
    let sumHeight = 0;
    const groupIndexes = [];
    let indexes = [];
    for (let section = 0; section < data.length; ++section) {
      for (let row = 0; row < data[section].items.length; ++row) {
        const height = this.props.heightForIndexPath(section, row);
        sumHeight += height;
        if (groupIndexes.length >= 4) continue;
        sum += height;
        indexes.push({ section: section, row: row });
        if (sum >= groupMinHeight) {
          sum = 0;
          groupIndexes.push(indexes);
          indexes = [];
        }
      }
    }
    let currentGroupHeight = 0;
    let currentGroupIndex = 0;
    let inputs = [[Number.MIN_SAFE_INTEGER], [], [], []];
    let outputs = [[0], [], [], []];
    let lastOffset = [0, 0, 0, 0];
    sumHeight = 0;
    for (let section = 0; section < data.length; ++section) {
      for (let row = 0; row < data[section].items.length; ++row) {
        const height = this.props.heightForIndexPath(section, row);
        currentGroupHeight += height;
        sumHeight += height;
        if (currentGroupHeight >= groupMinHeight) {
          currentGroupHeight = 0;
          currentGroupIndex++;
          currentGroupIndex %= 4;
          if (inputs[currentGroupIndex].length === 0) {
            inputs[currentGroupIndex].push(Number.MIN_SAFE_INTEGER);
          }
          inputs[currentGroupIndex].push(sumHeight - 667);
          inputs[currentGroupIndex].push(sumHeight + 1 - 667);
          if (outputs[currentGroupIndex].length === 0) {
            outputs[currentGroupIndex].push(sumHeight);
            outputs[currentGroupIndex].push(sumHeight);
          } else {
            outputs[currentGroupIndex].push(lastOffset[currentGroupIndex]);
          }
          outputs[currentGroupIndex].push(sumHeight);
          lastOffset[currentGroupIndex] = sumHeight;
        }
      }
    }
    inputs.forEach(range => range.push(Number.MAX_SAFE_INTEGER));
    outputs.forEach(range => range.push(range[range.length - 1]));
    const scrollStyle = StyleSheet.flatten([styles.container, style]);
    return (
      <VerticalScrollView
        {...this.props}
        style={scrollStyle}
        contentStyle={{ height: sumHeight }}
        getNativeOffset={offset => {
          this._offset = offset;
          this.forceUpdate();
        }}
        onScroll={this._onScroll}
      >
        {groupIndexes.map((indexes, index) => {
          const style = StyleSheet.flatten([
            StyleSheet.absoluteFill,
            {
              transform: [
                {
                  translateY: this._offset
                    ? this._offset
                        .interpolate({
                          inputRange: [
                            Number.MIN_SAFE_INTEGER,
                            Number.MAX_SAFE_INTEGER
                          ],
                          outputRange: [
                            Number.MAX_SAFE_INTEGER,
                            Number.MIN_SAFE_INTEGER
                          ]
                        })
                        .interpolate({
                          inputRange: inputs[index],
                          outputRange: outputs[index]
                        })
                    : 0
                }
              ]
            }
          ]);
          return (
            <Animated.View key={index} style={style}>
              <Group
                {...this.props}
                index={index}
                ref={this._groupRefs[index]}
                indexes={indexes}
              />
            </Animated.View>
          );
        })}
      </VerticalScrollView>
    );
  }

  _onScroll = (offset: { x: number, y: number }) => {

    this.props.onScroll&&this.props.onScroll(offset);
  };
}
