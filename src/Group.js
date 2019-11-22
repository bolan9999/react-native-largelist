/*
 *
 * Created by Stone
 * Email: shanshang130@gmail.com
 * Date: 2018/7/17
 *
 */

import React from "react";
import { StyleSheet } from "react-native";
import type { GroupPropType } from "./Types";

export class Group extends React.Component<GroupPropType> {
  _currentIndex = 0;
  _offset = 0;
  _margin = 0;
  _input = null;
  _output = null;
  _indexes = null;
  _elementGroupArray = [];

  constructor(props) {
    super(props);
    this._input = props.input;
    this._output = props.output;
    this._indexes = props.indexes;
    this.updateElementGroupArray();
    if (props.initialContentOffset) {
      this.contentConversion(props.initialContentOffset.y, true);
    }
  }

  updateElementGroupArray() {
      this._elementGroupArray.length = 0
      this._output.forEach(v => this._elementGroupArray.indexOf(v) < 0 && this._elementGroupArray.push(v));
  }

  contentConversion(offset: number, init: boolean = false) {
    this._offset = offset;
    for (let i = 0; i < this._input.length; ++i) {
      if (offset >= this._input[i] && offset <= this._input[i + 1]) {
        this.update(this._elementGroupArray.indexOf(this._output[i]), init);
        break;
      }
    }
  }

  update(index: number, init: boolean) {
    if (index < 0 || index >= this._indexes.length || this._currentIndex === index) return;
    this._currentIndex = index;
    !init && this.forceUpdate();
  }

  componentWillReceiveProps(next: GroupPropType) {
    this._input = next.input;
    this._output = next.output;
    this._indexes = next.indexes;
    this.updateElementGroupArray();
    if (next.offset) {
      this._offset = null;
      this.contentConversion(next.offset);
    }
  }

  render() {
    const { indexes, heightForSection, heightForIndexPath, renderIndexPath, inverted } = this.props;
    if (this._currentIndex >= indexes.length) return null;
    this._margin = 0;
    return indexes[this._currentIndex].map((indexPath, index) => {
      if (indexPath.row === -1) {
        this._margin = heightForSection(indexPath.section);
        return null;
      }
      const height = heightForIndexPath(indexPath);
      if (height === 0) return null;
      const cell = React.Children.only(renderIndexPath(indexPath));
      const marginTop = this._margin;
      this._margin = 0;
      const style = StyleSheet.flatten([
        cell.props.style,
        {
          height,
          marginTop,
          alignSelf: "stretch",
          flex: 0,
          transform: [{ scaleY: inverted ? -1 : 1 }]
        }
      ]);
      const key = cell.props.key ? cell.props.key : index;
      return React.cloneElement(cell, {
        key,
        style
      });
    });
  }
}
