/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/23
 *
 */

import React from "react";
import { StickyFormPropType } from "./Types";
import type {IndexPath, LargeListPropType, Offset, Size} from "./Types";
import { Animated, StyleSheet } from "react-native";
import { LargeList } from "./LargeList";
import {idx} from "./idx";

export class StickyForm extends React.PureComponent<StickyFormPropType> {
  _size: Size;
  _contentOffsetY = 0;
  _nativeOffset;
  _offset: Animated.Value;
  _largeList=React.createRef();

  constructor(props) {
    super(props);
    this._nativeOffset = {
      x: new Animated.Value(0),
      ...this.props.onNativeContentOffsetExtract
    };
    this._offset = this._nativeOffset.x;
  }
  
  render() {
    return (
      <LargeList
        {...this.props}
        ref={this._largeList}
        renderHeader={this._renderHeader}
        renderSection={this._renderSection}
        renderIndexPath={this._renderIndexPath}
        renderFooter={this._renderFooter}
        onNativeContentOffsetExtract={this._nativeOffset}
      />
    );
  }

  _renderHeader = () => {
    const { renderHeader } = this.props;
    if (!renderHeader || !renderHeader()) return null;
    return this._stickyFirstView(this.props.renderHeader());
  };

  _renderFooter = () => {
    const { renderFooter } = this.props;
    if (!renderFooter || !renderFooter()) return null;
    return this._stickyFirstView(renderFooter());
  };

  _renderSection = (section: number) => {
    return this._stickyFirstView(this.props.renderSection(section));
  };

  _renderIndexPath = (path: IndexPath) => {
    return this._stickyFirstView(this.props.renderIndexPath(path));
  };

  _stickyFirstView(view: React.ReactElement<any>) {
    const childArray = React.Children.toArray(view.props.children);
    if (!childArray || childArray.length < 1) return null;
    const sticky: any = childArray[0];
    const style = StyleSheet.flatten([
      sticky.props.style,
      {
        zIndex: 9999,
        transform: [{ translateX: this._offset.interpolate({ inputRange: [-1, 0, 1], outputRange: [0, 0, 1] }) }]
      }
    ]);
    return React.cloneElement(
      view,
      null,
      childArray.map((v, index) => {
        if (index > 0) return React.cloneElement(v, { key: index });
        return <Animated.View {...v.props} style={style} key={index} />;
      })
    );
  }

  scrollTo(offset: Offset, animated: boolean = true): Promise<void> {
    if (!this._largeList.current) return Promise.reject("StickyForm has not been initialized yet!");
    return this._largeList.current.scrollTo(offset, animated).then(() => {
      return Promise.resolve();
    });
  }

  endRefresh() {
    idx(() => this._largeList.current.endRefresh());
  }

  endLoading() {
    idx(() => this._largeList.current.endLoading());
  }

  static defaultProps = {
    directionalLockEnabled: true,
    headerStickyEnabled: true
  };
}
