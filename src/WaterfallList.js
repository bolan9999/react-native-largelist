/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/20
 *
 */

import React from "react";
import type {LargeListPropType, Offset, Size, WaterfallListType} from "./Types";
import {SpringScrollView} from "react-native-spring-scrollview";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  LayoutAnimation,
  Platform,
} from "react-native";
import {styles} from "./styles";
import {idx} from "./idx";
import {WaterfallItem} from "./WaterfallItem";

const screenLayout = Dimensions.get("window");
const screenHeight = Math.max(screenLayout.width, screenLayout.height);

export class WaterfallList extends React.PureComponent<WaterfallListType> {
  _size: Size;
  _headerLayout;
  _footerLayout;
  _orgOnHeaderLayout;
  _orgOnFooterLayout;
  _contentOffsetY = 0;
  _nativeOffset;
  _offset: Animated.Value;
  _itemRefs: [];
  _shouldUpdateContent = true;
  _scrollView = React.createRef();

  constructor(props) {
    super(props);
    this._nativeOffset = {
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      ...this.props.onNativeContentOffsetExtract,
    };
    this._offset = this._nativeOffset.y;
  }

  _renderEmpty() {
    return (
      <SpringScrollView
        contentStyle={{flex: 1}}
        {...this.props}
        ref={this._scrollView}
        onSizeChange={this._onSizeChange}
        onNativeContentOffsetExtract={this._nativeOffset}
        onScroll={this._onScroll}
      >
        {this._renderHeader && this._renderHeader()}
        {this.props.renderEmpty && this.props.renderEmpty()}
        {this.props.renderFooter && this.props.renderFooter()}
      </SpringScrollView>
    );
  }

  render() {
    let {numColumns, heightForItem, data, preferColumnWidth} = this.props;
    const columnSummaries = [];
    let sumHeight = null;
    if (this.props.renderEmpty && data.length === 0) {
      return this._renderEmpty();
    }
    if (this._shouldRenderContent()) {
      this._itemRefs = [];
      sumHeight = idx(() => this._headerLayout.height, 0);
      if (!numColumns)
        numColumns = Math.floor(this._size.width / preferColumnWidth);
      for (let i = 0; i < numColumns; ++i) {
        columnSummaries.push({
          sumHeight: 0,
          indexes: [],
          tops: [],
          heights: [],
          cells: [],
          inputs: [],
          outputs: [],
          itemIndexes: [],
          inputItemIndexes: [],
        });
      }
      data.forEach((item, index) => {
        const height = heightForItem(item, index);
        let minHeight = Number.MAX_SAFE_INTEGER;
        let minHeightIndex = 0;
        columnSummaries.forEach((summary, idx) => {
          if (minHeight > summary.sumHeight) {
            minHeight = summary.sumHeight;
            minHeightIndex = idx;
          }
        });
        const lastHeight = idx(
          () =>
            columnSummaries[minHeightIndex].heights[
              columnSummaries[minHeightIndex].heights.length - 1
            ],
          0,
        );
        columnSummaries[minHeightIndex].sumHeight += height;
        columnSummaries[minHeightIndex].heights.push(height);
        columnSummaries[minHeightIndex].indexes.push(index);
        const lastTop = idx(
          () =>
            columnSummaries[minHeightIndex].tops[
              columnSummaries[minHeightIndex].tops.length - 1
            ],
          idx(() => this._headerLayout.height, 0),
        );
        columnSummaries[minHeightIndex].tops.push(lastTop + lastHeight);
      });
      let maxHeight = Number.MIN_SAFE_INTEGER;
      columnSummaries.forEach(summary => {
        if (maxHeight < summary.sumHeight) {
          maxHeight = summary.sumHeight;
        }
        const viewport = [];
        summary.tops.forEach((top, index) => {
          const first = viewport[0];
          if (
            first !== undefined &&
            top + summary.heights[index] - first > screenHeight
          ) {
            viewport.splice(0, 1);
          }
          viewport.push(top);
          while (summary.cells.length < viewport.length + 2)
            summary.cells.push(summary.cells.length);
        });
      });
      sumHeight += maxHeight;
      sumHeight += idx(() => this._footerLayout.height, 0);
      if (sumHeight <= this._size.height)
        sumHeight = this._size.height + StyleSheet.hairlineWidth;
      columnSummaries.forEach(summary => {
        summary.indexes.forEach((itemIndex, index) => {
          const cellIndex = index % summary.cells.length;
          if (!summary.inputs[cellIndex]) {
            summary.inputs[cellIndex] = [Number.MIN_SAFE_INTEGER];
            summary.inputItemIndexes[cellIndex] = [itemIndex];
          }
          if (!summary.outputs[cellIndex])
            summary.outputs[cellIndex] = [idx(() => summary.tops[index], 0)];
          if (!summary.itemIndexes[cellIndex])
            summary.itemIndexes[cellIndex] = [];
          summary.inputs[cellIndex].push(
            summary.tops[index] - this._size.height,
            summary.tops[index] - this._size.height + 0.1,
          );
          summary.inputItemIndexes[cellIndex].push(itemIndex, itemIndex);
          summary.outputs[cellIndex].push(
            summary.outputs[cellIndex][summary.outputs[cellIndex].length - 1],
          );
          summary.outputs[cellIndex].push(
            idx(
              () => summary.tops[index],
              summary.outputs[cellIndex][summary.outputs[cellIndex].length - 1],
            ),
          );
          summary.itemIndexes[cellIndex].push(itemIndex);
        });
        summary.inputs.forEach((inputs, index) => {
          inputs.push(Number.MAX_SAFE_INTEGER);
          summary.inputItemIndexes[index].push(
            summary.inputItemIndexes[index][
              summary.inputItemIndexes[index].length - 1
            ],
          );
        });
        summary.outputs.forEach(outputs =>
          outputs.push(outputs[outputs.length - 1]),
        );
      });
      columnSummaries.forEach(summary => {
        const itemRefs = [];
        summary.itemIndexes.forEach(() => {
          itemRefs.push(React.createRef());
        });
        this._itemRefs.push(itemRefs);
      });
    }
    return (
      <SpringScrollView
        {...this.props}
        contentStyle={{height: sumHeight}}
        ref={this._scrollView}
        onScroll={this._onScroll}
        onNativeContentOffsetExtract={this._nativeOffset}
        onSizeChange={this._onSizeChange}
      >
        {this._renderHeader()}
        {columnSummaries.map((summary, index) =>
          summary.itemIndexes.map((itemIndex, cellIndex) => (
            <WaterfallItem
              {...this.props}
              columnIdx={index}
              key={summary.inputItemIndexes[cellIndex][0]}
              ref={this._itemRefs[index][cellIndex]}
              offset={this._contentOffsetY}
              itemIndexes={summary.inputItemIndexes[cellIndex]}
              input={summary.inputs[cellIndex]}
              output={summary.outputs[cellIndex]}
              style={StyleSheet.flatten([
                styles.leftTop,
                {
                  width: this._size.width / numColumns,
                  transform: [
                    {
                      translateY: this._offset.interpolate({
                        inputRange: summary.inputs[cellIndex],
                        outputRange: summary.outputs[cellIndex],
                      }),
                    },
                    {translateX: (this._size.width / numColumns) * index},
                  ],
                },
              ])}
            />
          )),
        )}
        {this._renderFooter()}
      </SpringScrollView>
    );
  }

  _renderHeader() {
    const {renderHeader} = this.props;
    if (!renderHeader) return null;
    const transform = {
      transform: [{translateY: this._shouldRenderContent() ? 0 : 10000}],
    };
    const header = React.Children.only(renderHeader());
    this._orgOnHeaderLayout = header.onLayout;
    return React.cloneElement(header, {
      style: StyleSheet.flatten([header.props.style, transform]),
      onLayout: this._onHeaderLayout,
    });
  }

  _renderFooter() {
    const {renderFooter} = this.props;
    if (!renderFooter) return null;
    const transform = {
      transform: [{translateY: this._shouldRenderContent() ? 0 : 10000}],
    };
    const footer = React.Children.only(renderFooter());
    this._orgOnFooterLayout = footer.onLayout;
    return React.cloneElement(footer, {
      style: StyleSheet.flatten([styles.footer, footer.props.style, transform]),
      onLayout: this._onFooterLayout,
    });
  }

  _shouldRenderContent() {
    const {renderHeader, renderFooter} = this.props;
    return (
      this._size &&
      (!renderHeader || this._headerLayout) &&
      (!renderFooter || this._footerLayout)
    );
  }

  _onSizeChange = size => {
    this._size = size;
    if (this._shouldRenderContent()) this.forceUpdate();
  };

  _onHeaderLayout = e => {
    if (
      this._headerLayout &&
      this._headerLayout.height === e.nativeEvent.layout.height
    )
      return;
    this._headerLayout = e.nativeEvent.layout;
    this._orgOnHeaderLayout && this._orgOnHeaderLayout(e);
    if (this._shouldRenderContent()) this.forceUpdate();
  };

  _onFooterLayout = e => {
    if (
      this._footerLayout &&
      this._footerLayout.height === e.nativeEvent.layout.height
    )
      return;
    this._footerLayout = e.nativeEvent.layout;
    this._orgOnFooterLayout && this._orgOnFooterLayout(e);
    if (this._shouldRenderContent()) this.forceUpdate();
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
      this._itemRefs.forEach(column =>
        column.forEach(itemRef =>
          idx(() => itemRef.current.updateOffset(this._contentOffsetY)),
        ),
      );
    this._shouldUpdateContent && this.props.onScroll && this.props.onScroll(e);
  };

  scrollTo(offset: Offset, animated: boolean = true): Promise<void> {
    if (!this._scrollView.current)
      return Promise.reject("WaterfallList has not been initialized yet!");
    this._shouldUpdateContent = false;
    this._itemRefs.forEach(column =>
      column.forEach(itemRef => idx(itemRef.current.updateOffset(offset.y))),
    );
    return this._scrollView.current.scrollTo(offset, animated).then(() => {
      this._shouldUpdateContent = true;
      return Promise.resolve();
    });
  }

  endRefresh() {
    idx(() => this._scrollView.current.endRefresh());
  }

  endLoading() {
    idx(() => this._scrollView.current.endLoading());
  }
}
