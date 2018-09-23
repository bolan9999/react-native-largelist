/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/19
 *
 */

import React from "react";
import { Dimensions } from "react-native";
import { SectionContainerPropType } from "./Types";
import { Section } from "./Section";
import type { SectionPropType } from "./Types";
import { idx } from "./idx";


export class SectionContainer extends React.Component<
  SectionContainerPropType
> {
  _indexes: number[];
  _offset;
  _sections = [];

  updateOffset(offset: number, force = false, props = undefined) {
    if (!force && Math.abs(this._offset - offset) < 200) return;
    if (!props) props = this.props;
    this._offset = offset;
    const indexes = [];
    let first = 0;
    const screenHeight = Dimensions.get("window").height;
    props.tops.every((top, index) => {
      if (top > offset + screenHeight + 300) return false;
      if (top < offset - 300) {
        first = index;
      }
      if (top > offset - 300 && top < offset + screenHeight + 300) {
        if (indexes.length === 0 && first !== index) indexes.push(first);
        indexes.push(index);
      }
      return true;
    });
    if (!this._indexes) {
      this._indexes = indexes;
      return;
    }
    if (indexes.length > this._indexes.length) {
      this._indexes = indexes;
      this.forceUpdate();
    } else {
      const recycle = [];
      this._indexes.forEach(old => {
        if (indexes.indexOf(old) < 0) {
          recycle.push(old);
        }
      });
      recycle.forEach(rec => {
        this._indexes.splice(this._indexes.indexOf(rec), 1);
      });
      indexes.forEach(n => {
        if (this._indexes.indexOf(n) < 0) {
          const old = recycle.pop();
          this._indexes.every((item, index) => {
            if (item > n) {
              this._indexes.splice(index, 0, n);
              return false;
            }
            return true;
          });
          this._sections.every(ref => {
            if (idx(() => ref.current.section === old)) {
              ref.current.updateSection(n);
              return false;
            }
            return true;
          });
        }
      });
    }
  }

  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps(next: SectionPropType) {
    const num = next.tops.length - this._sections.length;
    for (let i = 0; i < num; ++i) this._sections.push(React.createRef());
    this._indexes = undefined;
    this.updateOffset(this._offset ? this._offset : 0, true, next);
  }

  render() {
    return this._indexes.map(index =>
      <Section
        {...this.props}
        key={index}
        section={index}
        ref={this._sections[index]}
      />
    );
  }
}
