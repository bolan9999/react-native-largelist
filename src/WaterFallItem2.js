/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2022-03-13 16:34:24
 * @LastEditTime: 2022-03-14 16:39:35
 * @LastEditors: 石破天惊
 * @Description:
 */

import React from "react";
import { WaterFallItemPropsType } from "./Types";
import Reanimated, { useHandler } from "react-native-reanimated";

export class Item extends React.Component<WaterFallItemPropsType> {
  _itemIndex: number;
  _sectionIndex: number;
  _column: number;
  _width: number;
  _height: number;

  constructor(props) {
    super(props);
    this.updateItem(
      props.sectionIndex,
      props.itemIndex,
      props.column,
      props.width,
      props.height,
      false,
    );
  }

  render() {
    const section = this.props.data[this._sectionIndex];
    const item = section.items[this._itemIndex];
    return (
      <Reanimated.View style={[...this.props.style, { width: this._width, height: this._height }]}>
        {this.props.renderItem(item, this._itemIndex, section, this._column)}
      </Reanimated.View>
    );
  }

  updateItem(sectionIndex, itemIndex, column, width, height, update = true) {
    const shouldUpdate =
      update && (this._sectionIndex != sectionIndex || this._itemIndex != itemIndex);
    this._sectionIndex = sectionIndex;
    this._itemIndex = itemIndex;
    this._column = column;
    this._width = width;
    this._height = height;
    shouldUpdate && this.forceUpdate();
  }

  shouldComponentUpdate(next) {
    return this._itemIndex !== next.itemIndex || this._sectionIndex !== next._sectionIndex;
  }
}
