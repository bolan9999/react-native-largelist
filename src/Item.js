/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-10-26 17:34:11
 * @LastEditTime: 2021-10-27 17:06:22
 * @LastEditors: 石破天惊
 * @Description:
 */

import React from "react";
import Reanimated from "react-native-reanimated";

export class Item extends React.Component {
  _sectionIndex = 0;
  _itemIndex = 0;
  _offset;

  constructor(props) {
    super(props);
    this.updateIndex(props.sectionIndex, props.itemIndex, props.offset, false);
  }

  render() {
    const item = this.props.sections[this._sectionIndex].items[this._itemIndex].data;
    return (
      <Reanimated.View style={this.props.translate}>
        {this.props.renderItem(item, this._itemIndex, this.props.sections[this._sectionIndex])}
      </Reanimated.View>
    );
  }

  updateIndex(sectionIndex, itemIndex, offset, update = true) {
    this._sectionIndex = sectionIndex;
    this._itemIndex = itemIndex;
    this._offset = offset;
    this.props.translate.value = offset;
    update && this.forceUpdate();
  }

  shouldComponentUpdate(next) {
    return this._itemIndex !== next.itemIndex || this._sectionIndex !== next._sectionIndex;
  }
}
