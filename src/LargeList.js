/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/17
 *
 */

import React from "react";
import { Animated, StyleSheet, Dimensions } from "react-native";
import { styles } from "./styles";
import { VerticalScrollView } from "react-native-spring-scrollview";
import type { IndexPath, LargeListPropType, Offset } from "./Types";
import { Group } from "./Group";
import { SectionContainer } from "./SectionContainer";
import { idx } from "react-native-spring-scrollview/idx";

export class LargeList extends React.Component<LargeListPropType> {
  _groupRefs = [];
  _offset: Animated.Value;
  _sectionContainer = React.createRef();
  _scrollView = React.createRef();
  _shouldUpdateContent = true;

  static defaultProps = {
    heightForSection: () => 0,
    renderSection: () => null,
    groupCount: 4,
    groupMinHeight: Dimensions.get("window").height / 2,
    updateTimeInterval: 150
  };

  constructor(props) {
    super(props);
    for (let i=0;i<props.groupCount;++i){
      this._groupRefs.push(React.createRef());
    }
  }

  render() {
    const { style, data, heightForSection, heightForIndexPath,groupMinHeight,groupCount } = this.props;
    let sum = 0;
    let sumHeight = 0;
    const groupIndexes = [];
    for (let i=0;i<groupCount;++i){
      groupIndexes.push([]);
    }
    let indexes = [];
    let currentIndex = 0;
    const sectionTops = [];
    for (let section = 0; section < data.length; ++section) {
      for (let row = -1; row < data[section].items.length; ++row) {
        let height;
        if (row === -1) {
          height = heightForSection(section);
          sectionTops[section] = sumHeight;
        } else {
          height = heightForIndexPath({ section: section, row: row });
        }
        sumHeight += height;
        sum += height;
        indexes.push({ section: section, row: row });
        if (
          sum >= groupMinHeight ||
          (section === data.length - 1 &&
            row === data[section].items.length - 1)
        ) {
          sum = 0;
          groupIndexes[currentIndex].push(indexes);
          indexes = [];
          currentIndex++;
          currentIndex %= groupCount;
        }
      }
    }

    let currentGroupHeight = 0;
    let currentGroupIndex = 0;
    let inputs = [];
    let outputs = [];
    let lastOffset = [];
    for (let i=0;i<groupCount;++i){
      inputs.push(i===0?[Number.MIN_SAFE_INTEGER]:[]);
      outputs.push(i===0?[0]:[]);
      lastOffset.push(0);
    }
    sumHeight = 0;
    const wrapperHeight = idx(
      () => this._scrollView.current._wrapperLayout.height,
      700
    );
    for (let section = 0; section < data.length; ++section) {
      for (let row = -1; row < data[section].items.length; ++row) {
        const height =
          row === -1
            ? heightForSection(section)
            : heightForIndexPath({ section: section, row: row });
        currentGroupHeight += height;
        sumHeight += height;
        if (currentGroupHeight >= groupMinHeight) {
          currentGroupHeight = 0;
          currentGroupIndex++;
          currentGroupIndex %= groupCount;
          if (inputs[currentGroupIndex].length === 0) {
            inputs[currentGroupIndex].push(Number.MIN_SAFE_INTEGER);
          }
          inputs[currentGroupIndex].push(sumHeight - wrapperHeight);
          inputs[currentGroupIndex].push(sumHeight + 1 - wrapperHeight);
          if (outputs[currentGroupIndex].length === 0) {
            outputs[currentGroupIndex].push(sumHeight);
            outputs[currentGroupIndex].push(sumHeight);
          } else {
            outputs[currentGroupIndex].push(lastOffset[currentGroupIndex]);
          }
          outputs[currentGroupIndex].push(sumHeight);
          lastOffset[currentGroupIndex] = sumHeight;
        }
      }
    }
    inputs.forEach(range => range.push(Number.MAX_SAFE_INTEGER));
    outputs.forEach(range => range.push(range[range.length - 1]));
    // if (this._offset) {
    //   console.log("inputs=====>", JSON.stringify(inputs));
    //   console.log("outputs=====>", JSON.stringify(outputs));
    //   console.log("=====>", JSON.stringify(groupIndexes));
    // }
    const scrollStyle = StyleSheet.flatten([styles.container, style]);
    // console.log("render LargeList");
    return (
      <VerticalScrollView
        {...this.props}
        ref={this._scrollView}
        style={scrollStyle}
        contentStyle={{ height: sumHeight }}
        getNativeOffset={offset => {
          this._offset = offset.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [1, 0, -1]
          });
          // console.log("getNativeOffset");
          this.forceUpdate();
        }}
        onScroll={this._onScroll}
      >
        {this._offset &&
          groupIndexes.map((indexes, index) => {
            const style = StyleSheet.flatten([
              {
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                transform: [
                  {
                    translateY:
                      this._offset && outputs[index].length > 1
                        ? this._offset.interpolate({
                            inputRange: inputs[index],
                            outputRange: outputs[index]
                          })
                        : 0
                  }
                ]
              }
            ]);
            return (
              <Animated.View key={index} style={style}>
                <Group
                  {...this.props}
                  index={index}
                  ref={this._groupRefs[index]}
                  indexes={indexes}
                  input={inputs[index]}
                  output={outputs[index]}
                />
              </Animated.View>
            );
          })}
        {this._offset &&
          <SectionContainer
            {...this.props}
            tops={sectionTops}
            ref={this._sectionContainer}
            nativeOffset={this._offset}
          />}
      </VerticalScrollView>
    );
  }

  _onScroll = (offset: { x: number, y: number }) => {
    this._shouldUpdateContent &&
      this._groupRefs.forEach(group =>
        idx(() => group.current.contentConversion(offset.y))
      );
    this._shouldUpdateContent &&
      idx(() => this._sectionContainer.current.updateOffset(offset.y));
    this.props.onScroll && this.props.onScroll(offset);
  };

  scrollTo(offset: Offset, animated: boolean = true): Promise<void> {
    if (!this._scrollView.current)
      return Promise.reject("LargeList has not been initialized yet!");
    this._shouldUpdateContent = false;
    this._groupRefs.forEach(group =>
      idx(() => group.current.contentConversion(offset.y, true))
    );
    idx(() => this._sectionContainer.current.updateOffset(offset.y, true));
    return this._scrollView.current.scrollTo(offset, animated).then(() => {
      this._shouldUpdateContent = true;
      return Promise.resolve();
    });
  }

  scrollToIndexPath(
    indexPath: IndexPath,
    animated: boolean = true
  ): Promise<void> {
    const { data, heightForSection, heightForIndexPath } = this.props;
    let ht = 0;
    for (let s = 0; s < data.length && s <= indexPath.section; ++s) {
      if (indexPath.section === s && indexPath.row === -1) break;
      ht += heightForSection(s);
      for (let r = 0; r < data[s].items.length; ++r) {
        if (indexPath.section === s && indexPath.row === r) break;
        ht += heightForIndexPath({ section: s, row: r });
      }
    }
    return this.scrollTo({ x: 0, y: ht }, animated);
  }
}
