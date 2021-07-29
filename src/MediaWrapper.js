/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-28 10:53:28
 * @LastEditTime: 2021-07-29 15:56:29
 * @LastEditors: 石破天惊
 * @Description: The big Media wrapper.
 */

import React from "react";
import { MediaWrapperType } from "./Types";
import { Animated, View, StyleSheet, Image } from "react-native";

export class MediaWrapper extends React.Component<MediaWrapperType> {
  _visible = new Animated.Value(1);
  render() {
    const child = React.Children.only(this.props.children);
    this._visible.setValue(1);
    return (
      <View {...this.props}>
        {React.cloneElement(child, {
          [this.props.loadEndFunc]: () => this._visible.setValue(0),
        })}
        <Animated.View
          style={styles.cover}
          opacity={Animated.multiply(
            this._visible,
            this.props.mediaWrapperParam.value
          )}
        >
          {this.props.renderLoading()}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cover: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
