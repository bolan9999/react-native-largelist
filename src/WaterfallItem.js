/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/22
 *
 */

import React from "react";
import { StyleSheet,Animated } from "react-native";
import type { WaterfallItemType } from "./Types";

export class WaterfallItem extends React.Component<WaterfallItemType> {
  state = {
    itemIndex: 0
  };

  constructor(props) {
    super(props);
    this.updateOffset(props.offset, true);
  }

  componentWillReceiveProps(next: WaterfallItemType) {
    this.updateOffset(next.offset, false, next);
  }

  updateOffset(offset: number, init: boolean = false, next?: WaterfallItemType) {
    let index = 0;
    if (!next) next = this.props;
    for (let i = 0; i < next.input.length; ++i) {
      if (offset > next.input[i]) {
        index = i;
      }
    }
    const itemIndex = next.itemIndexes[index];
    if (itemIndex !== this.state.itemIndex) {
      if (init) this.state = { itemIndex };
      else this.setState({ itemIndex });
    }
  }

  render() {
    const { data, style, heightForItem, renderItem } = this.props;
    const { itemIndex } = this.state;
    if (itemIndex === undefined || itemIndex < 0 || itemIndex >= data.length) return null;
    const wStyle = StyleSheet.flatten([style, { height: heightForItem(data[itemIndex], itemIndex) }]);
    return (
      <Animated.View {...this.props} style={wStyle}>
        {renderItem(data[itemIndex], itemIndex)}
      </Animated.View>
    );
  }
}
