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
import { SpringScrollView } from "react-native-spring-scrollview";
import type { IndexPath, LargeListPropType, Offset } from "./Types";
import { Group } from "./Group";
import { idx } from "./idx";
import { Section } from "./Section";

const screenLayout = Dimensions.get("window");
const screenHeight = Math.max(screenLayout.width, screenLayout.height);

export class LargeList extends React.PureComponent<LargeListPropType> {
  _groupRefs = [];
  _offset: Animated.Value;
  _sectionContainer = React.createRef();
  _scrollView = React.createRef();
  _shouldUpdateContent = true;
  _lastTick = 0;
  _contentOffsetY = 0;
  _headerLayout;
  _footerLayout;
  _nativeOffset;
  _sectionRefs: [];
  _orgOnHeaderLayout: () => 0;
  _orgOnFooterLayout: () => 0;

  static defaultProps = {
    heightForSection: () => 0,
    renderSection: () => null,
    groupCount: 4,
    groupMinHeight: screenHeight / 3,
    updateTimeInterval: 150
  };

  constructor(props) {
    super(props);
    for (let i = 0; i < props.groupCount; ++i) {
      this._groupRefs.push(React.createRef());
    }
    this.obtainOffset();
  }

  componentWillReceiveProps(props: LargeListPropType) {
    if (
      props.onNativeContentOffsetExtract &&
      this.props.onNativeContentOffsetExtract !== props.onNativeContentOffsetExtract
    ) {
      this.obtainOffset();
    }
  }

  obtainOffset() {
    this._nativeOffset = {
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      ...this.props.onNativeContentOffsetExtract
    };
    this._offset = this._nativeOffset.y;
  }

  render() {
    const { data, heightForSection, heightForIndexPath, groupMinHeight, groupCount } = this.props;
    const groupIndexes = [];
    let indexes = [];
    const sectionTops = [];
    const sectionHeights = [];
    let currentGroupIndex = 0;
    let inputs = [];
    let outputs = [];
    let lastOffset = [];
    const sectionInputs = [];
    const sectionOutputs = [];
    const sectionIndexes = [];
    const sections = [0];
    let sumHeight = this._headerLayout ? this._headerLayout.height : 0;
    if (this._shouldRenderContent()) {
      let currentGroupHeight = 0;

      for (let i = 0; i < groupCount; ++i) {
        inputs.push(i === 0 ? [Number.MIN_SAFE_INTEGER] : []);
        outputs.push(i === 0 ? [sumHeight] : []);
        lastOffset.push(sumHeight);
        groupIndexes.push([]);
      }

      const wrapperHeight = idx(() => this._scrollView.current._height, 700);
      for (let section = 0; section < data.length; ++section) {
        for (let row = -1; row < data[section].items.length; ++row) {
          let height;
          if (row === -1) {
            height = heightForSection(section);
            sectionHeights.push(height);
            sectionTops[section] = sumHeight;
          } else {
            height = heightForIndexPath({ section: section, row: row });
          }
          currentGroupHeight += height;
          sumHeight += height;
          indexes.push({ section: section, row: row });
          if (
            currentGroupHeight >= groupMinHeight ||
            (section === data.length - 1 && row === data[section].items.length - 1)
          ) {
            groupIndexes[currentGroupIndex].push(indexes);
            indexes = [];
            currentGroupHeight = 0;
            currentGroupIndex++;
            currentGroupIndex %= groupCount;
            if (section === data.length - 1 && row === data[section].items.length - 1) break;
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
      let viewport = [];

      sectionTops.forEach(top => {
        const first = viewport[0];
        if (first !== undefined && top - first > screenHeight) {
          viewport.splice(0, 1);
        }
        viewport.push(top);
        if (sections.length < viewport.length + 1) sections.push(sections.length);
      });

      this._sectionRefs = [];
      sections.forEach(() => {
        sectionInputs.push([]);
        sectionOutputs.push([]);
        sectionIndexes.push([]);
        this._sectionRefs.push(React.createRef());
      });
      for (let section = 0; section < data.length; section++) {
        const index = section % sections.length;
        const headerHeight = this._headerLayout ? this._headerLayout.height : 0;
        const first = sectionInputs[index].length <= 0;
        sectionInputs[index].push(
          first ? sectionTops[section] - 1 - headerHeight : sectionInputs[index][sectionInputs[index].length - 1] + 1,
          sectionTops[section] - headerHeight,
          sectionTops[section]
        );
        sectionIndexes[index].push(section, section, section);
        sectionOutputs[index].push(sectionTops[section], sectionTops[section], sectionTops[section]);
        if (section + 1 < data.length) {
          sectionInputs[index].push(sectionTops[section + 1] - sectionHeights[section], sectionTops[section + 1]);
          sectionIndexes[index].push(section, section);
          sectionOutputs[index].push(
            sectionTops[section + 1] - sectionHeights[section],
            sectionTops[section + 1] - sectionHeights[section]
          );
        } else {
          const last = sectionTops[section] + sectionHeights[section];
          sectionInputs[index].push(last);
          sectionIndexes[index].push(section);
          sectionOutputs[index].push(last);
        }
      }
    }
    if (this._footerLayout) sumHeight += this._footerLayout.height;
    const contentStyle = sumHeight > 0 ? { height: sumHeight } : null;

    return (
      <SpringScrollView
        {...this.props}
        ref={this._scrollView}
        contentStyle={contentStyle}
        onNativeContentOffsetExtract={this._nativeOffset}
        onScroll={this._onScroll}
        onMomentumScrollEnd={this._onScrollEnd}
      >
        {this._renderHeader()}
        {this._shouldRenderContent() &&
          groupIndexes.map((indexes, index) => {
            let transform;
            if (inputs[index].length > 1) {
              transform = [
                {
                  translateY: this._offset.interpolate({
                    inputRange: inputs[index],
                    outputRange: outputs[index]
                  })
                }
              ];
            }
            const style = StyleSheet.flatten([styles.abs, { transform }]);
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
        {this._shouldRenderContent() &&
          sections.map((value, index) => {
            let transform;
            if (sectionInputs[index].length > 1)
              transform = [
                {
                  translateY: this._offset.interpolate({
                    inputRange: sectionInputs[index],
                    outputRange: sectionOutputs[index]
                  })
                }
              ];
            const style = StyleSheet.flatten([styles.abs, { transform }]);
            return (
              <Section
                {...this.props}
                key={index}
                ref={this._sectionRefs[index]}
                style={style}
                input={sectionInputs[index]}
                output={sectionOutputs[index]}
                sectionIndexes={sectionIndexes[index]}
                offset={this._contentOffsetY}
              />
            );
          })}
        {this._renderFooter()}
      </SpringScrollView>
    );
  }

  _renderHeader() {
    const { renderHeader } = this.props;
    if (!renderHeader) return null;
    const transform = {
      transform: [{ translateY: this._shouldRenderContent() ? 0 : 10000 }]
    };
    const header = React.Children.only(renderHeader());
    this._orgOnHeaderLayout = header.onLayout;
    return React.cloneElement(header, {
      style: StyleSheet.flatten([header.props.style, transform]),
      onLayout: this._onHeaderLayout
    });
  }

  _renderFooter() {
    const { renderFooter } = this.props;
    if (!renderFooter) return null;
    const transform = {
      transform: [{ translateY: this._shouldRenderContent() ? 0 : 10000 }]
    };
    const footer = React.Children.only(renderFooter());
    this._orgOnFooterLayout = footer.onLayout;
    return React.cloneElement(footer, {
      style: StyleSheet.flatten([styles.footer, footer.props.style, transform]),
      onLayout: this._onFooterLayout
    });
  }

  _shouldRenderContent() {
    return !this.props.renderHeader || this._headerLayout;
  }

  _onHeaderLayout = e => {
    if (this._headerLayout && this._headerLayout.height === e.nativeEvent.layout.height) return;
    this._headerLayout = e.nativeEvent.layout;
    const { renderFooter } = this.props;
    this._orgOnHeaderLayout && this._orgOnHeaderLayout(e);
    if (!renderFooter || this._footerLayout) {
      this.forceUpdate();
    }
  };

  _onFooterLayout = e => {
    if (this._footerLayout && this._footerLayout.height === e.nativeEvent.layout.height) return;
    this._footerLayout = e.nativeEvent.layout;
    this._orgOnFooterLayout && this._orgOnFooterLayout(e);
    if (this._shouldRenderContent()) {
      this.forceUpdate();
    }
  };

  _onScrollEnd = () => {
    this._groupRefs.forEach(group => idx(() => group.current.contentConversion(this._contentOffsetY)));
    idx(() =>
      this._sectionRefs.forEach(sectionRef => {
        sectionRef.current.updateOffset(this._contentOffsetY);
      })
    );
  };

  _onScroll = e => {
    const offsetY = e.nativeEvent.contentOffset.y;
    this._contentOffsetY = offsetY;
    this._shouldUpdateContent &&
      idx(() =>
        this._sectionRefs.forEach(sectionRef => {
          sectionRef.current.updateOffset(this._contentOffsetY);
        })
      );
    const now = new Date().getTime();
    if (this._lastTick - now > 30) {
      this._lastTick = now;
      return;
    }
    this._lastTick = now;
    this._shouldUpdateContent && this._groupRefs.forEach(group => idx(() => group.current.contentConversion(offsetY)));
    this.props.onScroll && this.props.onScroll(offset);
  };

  scrollTo(offset: Offset, animated: boolean = true): Promise<void> {
    if (!this._scrollView.current) return Promise.reject("LargeList has not been initialized yet!");
    this._shouldUpdateContent = false;
    this._groupRefs.forEach(group => idx(() => group.current.contentConversion(offset.y)));
    idx(() => this._sectionContainer.current.updateOffset(offset.y, true));
    return this._scrollView.current.scrollTo(offset, animated).then(() => {
      this._shouldUpdateContent = true;
      return Promise.resolve();
    });
  }

  scrollToIndexPath(indexPath: IndexPath, animated: boolean = true): Promise<void> {
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

  endRefresh() {
    idx(() => this._scrollView.current.endRefresh());
  }

  endLoading() {
    idx(() => this._scrollView.current.endLoading());
  }
}
