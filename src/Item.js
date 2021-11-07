/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-10-26 17:34:11
 * @LastEditTime: 2021-11-07 17:10:21
 * @LastEditors: 石破天惊
 * @Description:
 */

import React from "react";
import Reanimated, { useHandler } from "react-native-reanimated";

export class Item extends React.Component {
  _sectionIndex = 0;
  _itemIndex = 0;
  _measurDirection;

  constructor(props) {
    super(props);
    this.updateIndex(props.sectionIndex, props.itemIndex, props.measurDirection, false);
  }

  render() {
    const item = this.props.sections[this._sectionIndex].items[this._itemIndex];
    return (
      <Reanimated.View
        style={this.props.style}
        onLayout={() => this.props.onLayout(this._measurDirection)}
      >
        {this.props.renderItem(item, {
          sectionIndex: this._sectionIndex,
          itemIndex: this._itemIndex,
        })}
      </Reanimated.View>
    );
  }

  updateIndex(sectionIndex, itemIndex, measurDirection, update = true) {
    this._sectionIndex = sectionIndex;
    this._itemIndex = itemIndex;
    this._measurDirection = measurDirection;
    update && this.forceUpdate();
  }

  shouldComponentUpdate(next) {
    return this._itemIndex !== next.itemIndex || this._sectionIndex !== next._sectionIndex;
  }
}
