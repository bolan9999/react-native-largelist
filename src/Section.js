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
  _section = 0;
  _offset = 0;

  constructor(props) {
    super(props);
    this._offset = props.offset;
  }

  updateOffset=(offset: number, preventUpdate: boolean = false) =>{
    let index = 0;
    this._offset = offset;
    for (let i = 0; i < this.props.input.length; ++i) {
      if (offset > this.props.input[i]) {
        index = i;
      }
    }
    const section = this.props.sectionIndexes[index];
    if (section !== this._section) {
      this._section = section;
      if (!preventUpdate) this.forceUpdate();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    this._offset = nextProps.offset;
    return true;
  }

  render() {
    const { data, style, heightForSection, renderSection, inverted, offset } =
      this.props;
    this.updateOffset(this._offset, true);
    if (
      this._section === undefined ||
      this._section < 0 ||
      this._section >= data.length
    )
      return null;
    const wStyle = StyleSheet.flatten([
      style,
      {
        height: heightForSection(this._section),
        transform: [...style.transform, { scaleY: inverted ? -1 : 1 }],
      },
    ]);
    return (
      <Animated.View {...this.props} style={wStyle}>
        {renderSection(this._section)}
      </Animated.View>
    );
  }
}
