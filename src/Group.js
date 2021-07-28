/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:11:34
 * @LastEditTime: 2021-07-28 11:30:12
 * @LastEditors: 石破天惊
 * @Description:
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import type { GroupPropType } from "./Types";

export class Group extends React.Component<GroupPropType> {
  _currentIndex = 0;
  _offset = 0;
  _margin = 0;

  constructor(props) {
    super(props);
    this.contentConversion(props.offset, true);
  }

  contentConversion = (offset: number, init: boolean = false) => {
    this._offset = offset;
    const { input, output } = this.props;
    const cc = [];
    output.forEach((v) => cc.indexOf(v) < 0 && cc.push(v));
    for (let i = 0; i < input.length; ++i) {
      if (offset >= input[i] && offset <= input[i + 1]) {
        this.update(cc.indexOf(output[i]), init);
        break;
      }
    }
  };

  update(index: number, init: boolean) {
    if (
      index < 0 ||
      index >= this.props.indexes.length ||
      this._currentIndex === index
    )
      return;
    this._currentIndex = index;
    !init && this.forceUpdate();
  }

  shouldComponentUpdate(nextProps, nextState) {
    this._offset = nextProps.offset;
    return true;
  }

  render() {
    const {
      indexes,
      heightForSection,
      heightForIndexPath,
      renderIndexPath,
      inverted,
      offset,
      nativeOffset
    } = this.props;
    this.contentConversion(this._offset, true);
    if (this._currentIndex >= indexes.length) return null;
    this._margin = 0;
    return indexes[this._currentIndex].map((indexPath, index) => {
      if (indexPath.row === -1) {
        this._margin = heightForSection(indexPath.section);
        return null;
      }
      const height = heightForIndexPath(indexPath);
      if (height === 0) return null;
      const marginTop = this._margin;
      this._margin = 0;
      const style = StyleSheet.flatten({
        height,
        marginTop,
        alignSelf: "stretch",
        transform: [{ scaleY: inverted ? -1 : 1 }],
      });

      return (
        <View style={style} key={index}>
          {renderIndexPath(indexPath,{nativeOffset})}
        </View>
      );
    });
  }
}
