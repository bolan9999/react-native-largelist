/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:11:34
 * @LastEditTime: 2021-07-27 19:59:36
 * @LastEditors: 石破天惊
 * @Description: 
 */

import React from "react";
import { StyleSheet,Animated } from "react-native";
import type { WaterfallItemType } from "./Types";

export class WaterfallItem extends React.Component<WaterfallItemType> {
  _itemIndex=0;

  constructor(props) {
    super(props);
    this._offset = props.offset;
  }

  shouldComponentUpdate(nextProps) {
    this._offset = nextProps.offset;
    return true;
  }

  updateOffset(offset: number, init: boolean = false, next?: WaterfallItemType) {
    let index = 0;
    this._offset = offset;
    if (!next) next = this.props;
    for (let i = 0; i < next.input.length; ++i) {
      if (offset > next.input[i]) {
        index = i;
      }
    }
    const itemIndex = next.itemIndexes[index];
    if (itemIndex !== this._itemIndex) {
      this._itemIndex = itemIndex;
      if(!init) this.forceUpdate();
    }
  }

  render() {
    const { data, style, heightForItem, renderItem,columnIdx } = this.props;
    this.updateOffset(this._offset,true);
    if (this._itemIndex === undefined || this._itemIndex < 0 || this._itemIndex >= data.length) return null;
    const wStyle = StyleSheet.flatten([style, { height: heightForItem(data[this._itemIndex], this._itemIndex) }]);
    return (
      <Animated.View {...this.props} style={wStyle}>
        {renderItem(data[this._itemIndex], this._itemIndex, columnIdx)}
      </Animated.View>
    );
  }
}
