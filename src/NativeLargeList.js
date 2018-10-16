/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/9/23
 *
 */

import React from "react";
import { Animated, StyleSheet, Dimensions } from "react-native";
import { styles } from "./styles";
import type { IndexPath, LargeListPropType, Offset } from "./Types";
import { Group } from "./Group";
import { SectionContainer } from "./SectionContainer";
import { idx } from "./idx";

export class NativeLargeList extends React.PureComponent<LargeListPropType> {
  _groupRefs = [];
  _offset: Animated.Value = new Animated.Value(0);
  _sectionContainer = React.createRef();
  _scrollView = React.createRef();
  _shouldUpdateContent = true;
  _lastTick = 0;
  _contentOffsetY = 0;
  _headerLayout;
  _footerLayout;

  static defaultProps = {
    heightForSection: () => 0,
    renderSection: () => null,
    groupCount: 4,
    groupMinHeight: Dimensions.get("window").height / 2,
    updateTimeInterval: 150
  };

  constructor(props) {
    super(props);
    for (let i = 0; i < props.groupCount; ++i) {
      this._groupRefs.push(React.createRef());
    }
  }

  render() {
    const {
      style,
      data,
      heightForSection,
      heightForIndexPath,
      groupMinHeight,
      groupCount,
      renderHeader,
      renderFooter
    } = this.props;
    const groupIndexes = [];
    let indexes = [];
    const sectionTops = [];
    let currentGroupIndex = 0;
    let inputs = [];
    let outputs = [];
    let lastOffset = [];
    let sumHeight = this._headerLayout ? this._headerLayout.height : 0;
    let currentGroupHeight = 0;
    for (let i = 0; i < groupCount; ++i) {
      inputs.push(i === 0 ? [Number.MIN_SAFE_INTEGER] : []);
      outputs.push(i === 0 ? [sumHeight] : []);
      lastOffset.push(sumHeight);
      groupIndexes.push([]);
    }

    const wrapperHeight = idx(
      () => this._scrollView.current._wrapperLayout.height,
      700
    );
    for (let section = 0; section < data.length; ++section) {
      for (let row = -1; row < data[section].items.length; ++row) {
        let height;
        if (row === -1) {
          height = heightForSection(section);
          sectionTops[section] = sumHeight;
        } else {
          height = heightForIndexPath({ section: section, row: row });
        }
        currentGroupHeight += height;
        sumHeight += height;
        indexes.push({ section: section, row: row });
        if (
          currentGroupHeight >= groupMinHeight ||
          (section === data.length - 1 &&
            row === data[section].items.length - 1)
        ) {
          groupIndexes[currentGroupIndex].push(indexes);
          indexes = [];
          currentGroupHeight = 0;
          currentGroupIndex++;
          currentGroupIndex %= groupCount;
          if (
            section === data.length - 1 &&
            row === data[section].items.length - 1
          )
            break;
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
    const scrollStyle = StyleSheet.flatten([styles.container, style]);
    if (this._footerLayout) sumHeight += this._footerLayout.height;
    return (
      <Animated.ScrollView
        scrollEventThrottle={1}
        {...this.props}
        ref={this._scrollView}
        style={scrollStyle}
        contentContainerStyle={{ height: sumHeight }}
        onScroll={this._scrollEvent}
        onMomentumScrollEnd={this._onScrollEnd}
      >
        {renderHeader &&
          <Animated.View onLayout={this._onHeaderLayout}>
            {this.props.renderHeader()}
          </Animated.View>}
        {groupIndexes.map((indexes, index) => {
          const style = StyleSheet.flatten([
            {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              transform: [
                {
                  translateY:
                    outputs[index].length > 1
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
                offset={this._contentOffsetY}
              />
            </Animated.View>
          );
        })}
        {
          <SectionContainer
            {...this.props}
            tops={sectionTops}
            ref={this._sectionContainer}
            nativeOffset={this._offset}
          />
        }
        {renderFooter &&
          <Animated.View style={styles.footer} onLayout={this._onFooterLayout}>
            {renderFooter()}
          </Animated.View>}
      </Animated.ScrollView>
    );
  }

  _onHeaderLayout = ({ nativeEvent: { layout: layout } }) => {
    this._headerLayout = layout;
    if (this._footerLayout) this.forceUpdate();
  };

  _onFooterLayout = ({ nativeEvent: { layout: layout } }) => {
    this._footerLayout = layout;
    if (this._headerLayout) this.forceUpdate();
  };

  _onScrollEnd = () => {
    this._groupRefs.forEach(group =>
      idx(() => group.current.contentConversion(this._contentOffsetY))
    );
    idx(() =>
      this._sectionContainer.current.updateOffset(this._contentOffsetY)
    );
  };

  _onScroll = e => {
    this._contentOffsetY = e.nativeEvent.contentOffset.y;
    const now = new Date().getTime();
    if (this._lastTick - now > 30) {
      this._lastTick = now;
      return;
    }
    this._lastTick = now;
    this._shouldUpdateContent &&
      this._groupRefs.forEach(group =>
        idx(() => group.current.contentConversion(this._contentOffsetY))
      );
    this._shouldUpdateContent &&
      idx(() =>
        this._sectionContainer.current.updateOffset(this._contentOffsetY)
      );
    this.props.onScroll && this.props.onScroll(offset);
  };

  _scrollEvent = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: this._offset
          }
        }
      }
    ],
    { useNativeDriver: true, listener: this._onScroll }
  );

  scrollTo(offset: Offset, animated: boolean = true): Promise<void> {
    if (!this._scrollView.current)
      return Promise.reject("LargeList has not been initialized yet!");
    this._shouldUpdateContent = false;
    this._groupRefs.forEach(group =>
      idx(() => group.current.contentConversion(offset.y))
    );
    idx(() => this._sectionContainer.current.updateOffset(offset.y));
    return new Promise((r, j) => {
      this._scrollView.current.getNode().scrollTo(offset, animated);

      setTimeout(() => {
        r();
        this._shouldUpdateContent = true;
      }, animated ? 250 : 0);
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
