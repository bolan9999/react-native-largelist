/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/2
 *
 */

import React from "react";
import {
  ScrollView,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  Platform,
  ViewPropTypes,
  ActivityIndicator,
  PanResponder,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import { LargeListCell } from "./LargeListCell";
import { LargeListSection } from "./LargeListSection";
import { TableView } from "../tableview";
import { EventScrollView } from "./EventScrollView";

interface Size {
  width: number,
  height: number
}

interface Offset {
  x: number,
  y: number
}

interface IndexPath {
  section: number,
  row: number
}

interface Range {
  top: number,
  bottom: number
}

class LargeList extends React.Component {
  static propTypes = {
    ...ViewPropTypes,
    numberOfSections: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    numberOfRowsInSection: PropTypes.func,
    renderCell: PropTypes.func.isRequired,
    heightForCell: PropTypes.func.isRequired,
    renderSection: PropTypes.func,
    heightForSection: PropTypes.func,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    bounces: PropTypes.bool,
    onRefresh: PropTypes.func,

    safeMargin: PropTypes.number,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    dynamicMargin: PropTypes.number,
    scrollEventThrottle: PropTypes.number,
    onScroll: PropTypes.func,

    speedLevel1: PropTypes.number,
    speedLevel2: PropTypes.number,
    nativeOptimize: PropTypes.bool,
    showsVerticalScrollIndicator: PropTypes.bool,

    onIndexPathDidEnterSafeArea: PropTypes.func,
    onIndexPathDidLeaveSafeArea: PropTypes.func,

    onSectionDidHangOnTop: PropTypes.func,

    onLoadMore: PropTypes.func,
    heightForLoadMore: PropTypes.func,
    allLoadCompleted: PropTypes.bool,
    renderLoadingMore: PropTypes.func,
    renderLoadCompleted: PropTypes.func,

    numberOfCellPoolSize: PropTypes.number,
    numberOfSectionPoolSize: PropTypes.number,
    renderEmpty: PropTypes.func,

    widthForRightWhenSwipeOut: PropTypes.func,
    renderRightWhenSwipeOut: PropTypes.func,
    widthForLeftWhenSwipeOut: PropTypes.func,
    renderLeftWhenSwipeOut: PropTypes.func,
    colorForSwipeOutBgColor: PropTypes.func,
    initialOffsetY: PropTypes.number,
    renderItemSeparator: PropTypes.func,

    onLargeListDidUpdate: PropTypes.func

    // onIndexPathDidAppear: PropTypes.func,
    // onIndexPathDidDisappear: PropTypes.func,
    // onSectionDidAppear: PropTypes.func,
    // onSectionDidDisappear: PropTypes.func
  };
  static defaultProps = {
    numberOfSections: () => 1,
    numberOfRowsInSection: section => 0,
    renderSection: () => null,
    heightForSection: section => 0,
    renderHeader: () => null,
    renderFooter: () => null,
    bounces: true,
    nativeOptimize: false,
    onIndexPathDidEnterSafeArea: () => null,
    onIndexPathDidLeaveSafeArea: () => null,

    safeMargin: 600,
    dynamicMargin: 500,
    scrollEventThrottle: Platform.OS === "ios" ? 16 : 32,
    speedLevel1: Platform.OS === "ios" ? 4 : 4,
    speedLevel2: Platform.OS === "ios" ? 10 : 10,
    showsVerticalScrollIndicator: true,
    numberOfSectionPoolSize: 6,
    onSectionDidHangOnTop: () => null,
    heightForLoadMore: () => 70,
    allLoadCompleted: false,
    renderEmpty: () => null,
    renderLoadingMore: () =>
      <ActivityIndicator
        style={{ marginTop: 10, alignSelf: "center" }}
        size={"large"}
      />,
    renderLoadCompleted: () =>
      <Text style={{ marginTop: 20, alignSelf: "center", fontSize: 16 }}>
        No more data
      </Text>,
    widthForRightWhenSwipeOut: () => 0,
    renderRightWhenSwipeOut: () => null,
    widthForLeftWhenSwipeOut: () => 0,
    renderLeftWhenSwipeOut: () => null,
    colorForSwipeOutBgColor: () => "#AAA",
    initialOffsetY: 0,
    renderItemSeparator: () =>
      <View style={{ height: 1, backgroundColor: "#EEE", marginLeft: 16 }} />,
    onLargeListDidUpdate: () => null
  };

  sections: Element[] = [];
  workSectionRefs: LargeListSection[] = [];
  freeSectionRefs: LargeListSection[] = [];

  cells: Element[] = []; //所有的Cell 的元素
  workRefs: LargeListCell[] = []; //正在显示的Cell的引用
  freeRefs: LargeListCell[] = []; //空闲的Cell的引用

  size: Size = null; //LargeList宽高
  contentOffset: Offset = { x: 0, y: 0 }; //LargeList偏移

  safeArea: Range = { top: 0, bottom: 0 }; //safe area range
  topIndexPath: IndexPath = { section: 0, row: 0 }; //safe area中最顶部的IndexPath
  bottomIndexPath: IndexPath = { section: 0, row: 0 }; //safe area中最底部的IndexPath

  contentSize: Size = { width: 0, height: 0 };
  lastScrollTime: number = 0;

  currentSection: number = 0;
  currentSectionRef: LargeListSection;
  headerHeight: number = null;
  footerHeight: number = null;
  sizeConfirmed: boolean = false;
  keyForCreating: number = 0;
  minCellHeight: number = 40;
  minSectionHeight: number = 40;
  scrollViewRef: ScrollView | TableView;
  native: boolean = false;
  loadingMore: boolean = false;
  enoughLoadMore: boolean = false;
  draging: boolean = false;
  scrollingAfterDraging = false;

  numberOfSections: number;
  empty: boolean = false;
  initialOffsetY: number = 0;
  reloading: boolean = false;

  headerRef;
  footerRef;

  constructor(props) {
    super(props);
    this.initialOffsetY = props.initialOffsetY;
    this.initVar();
  }

  initVar() {
    this.numberOfSections = this.props.numberOfSections;
    this.reloading = true;
    if (typeof this.numberOfSections !== "function") {
      console.warn(
        "LargeList warning: numberOfSections's prop type has changed to function, use 'numberOfSections={()=>100}' instead of 'numberOfSections={100}, number will not support after 2.0'."
      );
      this.numberOfSections = () => this.props.numberOfSections;
    }
    this.enoughLoadMore = false;
    this.loadingMore = false;
    this.scrollingAfterDraging = false;
    this.safeArea = { top: 0, bottom: 0 };
    this.topIndexPath = { section: 0, row: -2 };
    this.bottomIndexPath = { section: 0, row: -2 };
    this.contentSize = { width: 0, height: 0 };
    this.lastScrollTime = 0;
    this.currentSection = 0;
    this.minCellHeight = 40;
    this.minSectionHeight = 40;
    this.sizeConfirmed = false;
    this.headerHeight = null;
    this.footerHeight = null;
    this.native =
      Platform.OS === "ios" && this.props.nativeOptimize && TableView;
    for (let i = 0; i < this.numberOfSections(); ++i) {
      if (
        this.minSectionHeight > this.props.heightForSection(i) &&
        this.props.heightForSection(i) > 20
      ) {
        this.minSectionHeight = this.props.heightForSection(i);
      }
      this.contentSize.height += this.props.heightForSection(i);
      for (let j = 0; j < this.props.numberOfRowsInSection(i); ++j) {
        if (
          this.minCellHeight > this.props.heightForCell(i, j) &&
          this.props.heightForCell(i, j) > 20
        ) {
          this.minCellHeight = this.props.heightForCell(i, j);
        }
        this.contentSize.height += this.props.heightForCell(i, j);
      }
    }
    this.empty =
      this.numberOfSections() === 0 ||
      (this.numberOfSections() === 1 &&
        this.props.numberOfRowsInSection(0) === 0);
    if (this.cells.length > 0) return;
    for (let i = 0; i < this.props.numberOfSectionPoolSize; ++i) {
      this.sections.push(this._createSection(0, -10000, this.freeSectionRefs));
    }
    let numberOfCellPoolSize = this.props.numberOfCellPoolSize;
    if (!numberOfCellPoolSize)
      numberOfCellPoolSize =
        (Dimensions.get("window").height + 2 * this.props.safeMargin) /
          this.minCellHeight +
        0.5;
    for (let i = 0; i < numberOfCellPoolSize; ++i) {
      this.cells.push(this._createCell(0, 0, -10000, this.freeRefs));
    }
  }

  initCells() {
    this.contentSize.height += this.headerHeight;
    this.contentSize.height += this.footerHeight;
    this.safeArea.top = this.safeArea.bottom = this.headerHeight;
    this.forceUpdate();
    this._onScroll(
      { nativeEvent: { contentOffset: this.contentOffset } },
      true
    );
  }

  componentDidUpdate() {
    if (this.sizeConfirmed) {
      if (this.initialOffsetY > 0)
        this.scrollTo({ x: 0, y: this.initialOffsetY }, false);
      this.initialOffsetY = 0;
      if (this.reloading) this.props.onLargeListDidUpdate();
      this.reloading = false;
      return;
    }
    let timer = setTimeout(() => {
      this.headerRef.measure((x, y, w, h) => {
        this._onHeaderLayout({ nativeEvent: { layout: { height: h } } });
      });
      this.footerRef.measure((x, y, w, h) => {
        this._onFooterLayout({ nativeEvent: { layout: { height: h } } });
      });
      clearTimeout(timer);
    }, 10);
  }

  render() {
    if (this.native)
      return (
        <TableView ref={ref => (this.scrollViewRef = ref)} {...this.props} />
      );
    let empty = this.empty;
    let headerStyle = [
      styles.absoluteStretch,
      {
        top: this.sizeConfirmed ? 0 : -10000
      }
    ];
    if (empty) headerStyle = {};
    let footerStyle = [
      styles.absoluteStretch,
      {
        top: this.sizeConfirmed
          ? this.contentSize.height - this.footerHeight
          : -10000
      }
    ];
    if (empty) footerStyle = {};
    let refreshControl =
      this.props.onRefresh !== undefined
        ? <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.props.onRefresh}
          />
        : null;
    let contentStyle = {
      alignSelf: "stretch",
      height: empty
        ? null
        : this.contentSize.height +
          (this.props.onLoadMore ? this.props.heightForLoadMore() : 0)
    };
    let loadMoreStyle = [
      styles.absoluteStretch,
      {
        top: this.contentSize.height,
        height: this.props.heightForLoadMore()
      }
    ];
    let hangSectionStyle = [
      styles.absoluteStretch,
      {
        top: this.sizeConfirmed && !empty ? 0 : -10000,
        height: this.props.heightForSection(this.currentSection)
      }
    ];
    return (
      <View {...this.props}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
          bounces={false}
        >
          <EventScrollView
            ref={ref => (this.scrollViewRef = ref)}
            bounces={this.props.bounces}
            refreshControl={refreshControl}
            contentContainerStyle={contentStyle}
            onLayout={this._onLayout.bind(this)}
            style={{ flex: 1 }}
            scrollEventThrottle={this.props.scrollEventThrottle}
            onScroll={this._onScroll.bind(this)}
            onMomentumScrollEnd={this._onScrollEnd.bind(this)}
            showsVerticalScrollIndicator={
              this.props.showsVerticalScrollIndicator
            }
            llonTouchStart={this._onTouchStart.bind(this)}
            llonTouchMove={this._onTouchMove.bind(this)}
            llonTouchEnd={this._onTouchEnd.bind(this)}
          >
            <View
              style={headerStyle}
              onLayout={this._onHeaderLayout.bind(this)}
              ref={ref => (this.headerRef = ref)}
            >
              {this.props.renderHeader()}
            </View>
            {empty && this.props.renderEmpty()}
            {this.sections.map(item => item)}
            {this.cells.map(item => item)}
            <View
              style={footerStyle}
              onLayout={this._onFooterLayout.bind(this)}
              ref={ref => (this.footerRef = ref)}
            >
              {this.props.renderFooter()}
            </View>
            {!empty &&
              this.props.onLoadMore &&
              <View style={loadMoreStyle}>
                {this.props.allLoadCompleted
                  ? this.props.renderLoadCompleted()
                  : this.props.renderLoadingMore()}
              </View>}
          </EventScrollView>
          <LargeListSection
            style={hangSectionStyle}
            section={this.currentSection}
            renderSection={this.props.renderSection}
            ref={reference => (this.currentSectionRef = reference)}
            numberOfSections={this.numberOfSections}
            heightForSection={this.props.heightForSection}
          />
        </ScrollView>
      </View>
    );
  }

  _createSection(section: number, top: number, refs: LargeListSection[]) {
    let height = section>=0 && section< this.numberOfSections() ? this.props.heightForSection(section):0;
    return (
      <LargeListSection
        ref={reference => reference && refs.push(reference)}
        key={this.keyForCreating++}
        style={[styles.absoluteStretch, { top: top, height:height }]}
        numberOfSections={this.numberOfSections}
        section={section}
        renderSection={this.props.renderSection}
        heightForSection={this.props.heightForSection}
      />
    );
  }

  _createCell(
    section: number,
    row: number,
    top: number,
    refs: LargeListCell[]
  ) {
    return (
      <LargeListCell
        ref={reference => reference && refs.push(reference)}
        key={this.keyForCreating++}
        style={[styles.absoluteStretch, { top: top }]}
        renderCell={this.props.renderCell}
        indexPath={{ section: section, row: row }}
        numberOfSections={this.numberOfSections}
        numberOfRowsInSection={this.props.numberOfRowsInSection}
        widthForRightWhenSwipeOut={this.props.widthForRightWhenSwipeOut}
        renderRightWhenSwipeOut={this.props.renderRightWhenSwipeOut}
        widthForLeftWhenSwipeOut={this.props.widthForLeftWhenSwipeOut}
        renderLeftWhenSwipeOut={this.props.renderLeftWhenSwipeOut}
        onCellTouchBegin={this._onCellTouchBegin.bind(this)}
        colorForSwipeOutBgColor={this.props.colorForSwipeOutBgColor}
        itemSeparator={this.props.renderItemSeparator}
      />
    );
  }

  _onCellTouchBegin(sender) {
    let hide = false;
    this.workRefs.forEach(item => {
      let res = item.hideOther(sender);
      if (!hide) hide = res;
    });
    return hide;
  }

  _onScroll(e, forceUpdate) {
    let offset: Offset = e.nativeEvent.contentOffset;
    if (this.empty || !this.sizeConfirmed) {
      this.contentOffset = offset;
      this._positionUpdate();
      return;
    }
    let distance = Math.abs(offset.y - this.contentOffset.y);
    let now: number = new Date().getTime();
    let speed: number = 0;
    let topMargin: number = this.props.safeMargin;
    let bottomMargin: number = this.props.safeMargin;
    if (this.lastScrollTime > 0) {
      speed = distance / (now - this.lastScrollTime);
    } else if (distance > this.props.safeMargin) {
      speed = 5;
    }
    this.lastScrollTime = now;
    let reloadType: number = 0;
    if (
      forceUpdate ||
      offset.y < topMargin ||
      offset.y + this.size.height + bottomMargin > this.contentSize.height ||
      speed < this.props.speedLevel1
    ) {
      reloadType = 0;
    } else {
      reloadType = 1;
    }

    if (offset.y >= this.contentOffset.y) {
      if (reloadType === 1) {
        topMargin = this.props.safeMargin - this.props.dynamicMargin;
        bottomMargin = this.props.safeMargin + this.props.dynamicMargin;
      }

      //下滑 处理上边
      while (
        this.safeArea.top < offset.y - topMargin &&
        this.safeArea.top > this.headerHeight
      ) {
        let lastIndexPath = this.topIndexPath;
        this.topIndexPath = this._nextIndexPathWithIndexPath(this.topIndexPath);
        if (lastIndexPath.row === -1) {
          this.safeArea.top += this.props.heightForSection(
            lastIndexPath.section
          );
          //Section离开事件
        } else {
          this.safeArea.top += this.props.heightForCell(
            lastIndexPath.section,
            lastIndexPath.row
          );
          this.props.onIndexPathDidLeaveSafeArea({
            section: lastIndexPath.section,
            row: lastIndexPath.row
          });
        }
      }

      //下滑 移动无用Section和Cell
      this.workSectionRefs.forEach(item => {
        if (item.section < this.topIndexPath.section) {
          this.freeSectionRefs.splice(0, 0, item);
        }
      });
      this.freeSectionRefs.forEach(section => {
        let index = this.workSectionRefs.indexOf(section);
        this.workSectionRefs.splice(index, index > -1 ? 1 : 0);
      });
      this.workRefs.forEach(item => {
        if (this._compareIndexPath(item.indexPath, this.topIndexPath) < 0) {
          // this.freeRefs.splice(0, 0, item);
          this.freeRefs.push(item);
        }
      });
      this.freeRefs.forEach(cell => {
        let index = this.workRefs.indexOf(cell);
        this.workRefs.splice(index, index > -1 ? 1 : 0);
      });

      //下滑 处理下边
      while (
        this.safeArea.bottom < offset.y + this.size.height + bottomMargin &&
        this.safeArea.bottom < this.contentSize.height - this.footerHeight
      ) {
        let nextIndexPath = this._nextIndexPathWithIndexPath(
          this.bottomIndexPath
        );
        if (nextIndexPath.section >= this.numberOfSections()) {
          break;
        }
        this.bottomIndexPath = nextIndexPath;
        if (this.bottomIndexPath.row === -1) {
          let reference = this.freeSectionRefs.pop();
          if (!reference) {
            this.sections.push(
              this._createSection(
                this.bottomIndexPath.section,
                this.safeArea.bottom,
                this.workSectionRefs
              )
            );
          } else {
            reference.updateToSection(
              this.bottomIndexPath.section,
              this.safeArea.bottom,
              this.props.heightForSection(this.bottomIndexPath.section),
              true
            );
            this.workSectionRefs.push(reference);
          }
          this.safeArea.bottom += this.props.heightForSection(
            this.bottomIndexPath.section
          );
        } else {
          let reference = this.freeRefs.pop();
          if (!reference) {
            reference = this._topCellRef();
            this.topIndexPath = this._nextIndexPathWithIndexPath(
              reference.indexPath
            );
            this.safeArea.top = reference.top + reference.height;
          } else {
            this.workRefs.push(reference);
          }
          let nextHeight = this.props.heightForCell(
            this.bottomIndexPath.section,
            this.bottomIndexPath.row
          );
          reference.updateToIndexPath(
            this.bottomIndexPath,
            this.safeArea.bottom,
            nextHeight
          );
          this.props.onIndexPathDidEnterSafeArea({
            section: this.bottomIndexPath.section,
            row: this.bottomIndexPath.row
          });
          this.safeArea.bottom += nextHeight;
        }
      }
    } else {
      if (reloadType === 1) {
        topMargin = this.props.safeMargin + this.props.dynamicMargin;
        bottomMargin = this.props.safeMargin - this.props.dynamicMargin;
      }

      //上滑，处理下边
      while (
        this.safeArea.bottom >
        offset.y + this.size.height + bottomMargin
      ) {
        let lastIndexPath = this.bottomIndexPath;
        this.bottomIndexPath = this._previousIndexPathWithIndexPath(
          this.bottomIndexPath
        );
        if (lastIndexPath.row === -1) {
          this.safeArea.bottom -= this.props.heightForSection(
            lastIndexPath.section
          );
          //Section离开事件
        } else {
          this.safeArea.bottom -= this.props.heightForCell(
            lastIndexPath.section,
            lastIndexPath.row
          );
          this.props.onIndexPathDidLeaveSafeArea({
            section: lastIndexPath.section,
            row: lastIndexPath.row
          });
        }
      }

      //移动Cell
      this.workSectionRefs.forEach(item => {
        if (item.section > this.bottomIndexPath.section) {
          this.freeSectionRefs.splice(0, 0, item);
        }
      });
      this.freeSectionRefs.forEach(section => {
        let index = this.workSectionRefs.indexOf(section);
        this.workSectionRefs.splice(index, index > -1 ? 1 : 0);
      });

      this.workRefs.forEach(item => {
        if (this._compareIndexPath(item.indexPath, this.bottomIndexPath) > 0) {
          // this.freeRefs.splice(0, 0, item);
          this.freeRefs.push(item);
        }
      });
      this.freeRefs.forEach(cell => {
        let index = this.workRefs.indexOf(cell);
        this.workRefs.splice(index, index > -1 ? 1 : 0);
      });

      //上滑，处理上边
      while (
        this.safeArea.top > offset.y - topMargin &&
        this.safeArea.top > this.headerHeight
      ) {
        let nextIndexPath = this._previousIndexPathWithIndexPath(
          this.topIndexPath
        );
        if (nextIndexPath.section < 0) {
          break;
        }
        this.topIndexPath = nextIndexPath;
        if (this.topIndexPath.row === -1) {
          this.safeArea.top -= this.props.heightForSection(
            this.topIndexPath.section
          );
          let reference = this.freeSectionRefs.pop();
          if (!reference) {
            this.sections.push(
              this._createSection(
                this.topIndexPath.section,
                this.safeArea.top,
                this.workSectionRefs
              )
            );
          } else {
            reference.updateToSection(
              this.topIndexPath.section,
              this.safeArea.top,
              this.props.heightForSection(this.topIndexPath.section),
              true
            );
            this.workSectionRefs.push(reference);
          }
        } else {
          this.safeArea.top -= this.props.heightForCell(
            this.topIndexPath.section,
            this.topIndexPath.row
          );
          let reference = this.freeRefs.pop();
          if (!reference) {
            reference = this._bottomCellRef();
            this.bottomIndexPath = this._previousIndexPathWithIndexPath(
              reference.indexPath
            );
            this.safeArea.bottom = reference.top;
          } else {
            this.workRefs.push(reference);
          }
          let nextHeight = this.props.heightForCell(
            this.topIndexPath.section,
            this.topIndexPath.row
          );
          reference.updateToIndexPath(
            this.topIndexPath,
            this.safeArea.top,
            nextHeight
          );
          this.props.onIndexPathDidEnterSafeArea({
            section: this.topIndexPath.section,
            row: this.topIndexPath.row
          });
        }
      }
    }

    this._exchangeSection(offset);
    this.freeRefs.forEach(cell => {
      if (cell.top !== -10000)
        cell.updateToIndexPath(cell.indexPath, -10000, cell.height);
    });
    this.freeSectionRefs.forEach(section => {
      if (section.top !== -10000)
        section.updateToSection(section.section, -10000, section.height, false);
    });
    switch (reloadType) {
      case 0:
        this._forceUpdate();
        break;
      default:
        this._positionUpdate();
        break;
    }
    this.contentOffset = offset;
    this.props.onScroll && this.props.onScroll(e);
    //解决冲量结束无法回调的问题
    if (
      this.props.onLoadMore &&
      this.contentOffset.y >=
        this.contentSize.height -
          this.size.height +
          this.props.heightForLoadMore() -
          1
    ) {
      if (this.props.onLoadMore && !this.props.allLoadCompleted)
        this.enoughLoadMore = true;
      this._onScrollEnd();
    }
    //禁止手动滑动到最下面
    if (
      this.props.onLoadMore &&
      !this.draging &&
      this.scrollingAfterDraging &&
      offset.y > this.contentSize.height - this.size.height &&
      offset.y <
        this.contentSize.height -
          this.size.height +
          this.props.heightForLoadMore()
    ) {
      this.scrollingAfterDraging = false;
      this.scrollToEnd();
    }
  }

  _exchangeSection(offset: Offset) {
    let exchanging = false;
    this.workSectionRefs.forEach(item => {
      if (
        this.currentSection === item.section - 1 &&
        offset.y < item.top &&
        item.top < this.currentSectionRef.height + offset.y
      ) {
        exchanging = true;
        this.currentSectionRef.updateToSection(
          this.currentSection,
          item.top - offset.y - this.currentSectionRef.height,
          this.currentSectionRef.height,
          false
        );
      }
    });
    if (!exchanging) {
      this.workSectionRefs.forEach(item => {
        if (
          this.currentSection != item.section &&
          item.top < offset.y &&
          item.top + item.height > offset.y
        ) {
          this.currentSection = item.section;
          this.currentSectionRef.updateToSection(
            this.currentSection,
            0,
            this.props.heightForSection(this.currentSection),
            true
          );
          this.props.onSectionDidHangOnTop(item.section);
        }
      });
      this.workRefs.forEach(item => {
        if (
          this.currentSection != item.indexPath.section &&
          item.top < offset.y &&
          item.top + item.height > offset.y
        ) {
          this.currentSection = item.indexPath.section;
          this.currentSectionRef.updateToSection(
            this.currentSection,
            0,
            this.props.heightForSection(this.currentSection),
            true
          );
          this.props.onSectionDidHangOnTop(item.indexPath.section);
        }
      });
      if (
        this.currentSectionRef.top !== 0 &&
        offset.y > this.headerHeight &&
        offset.y < this.contentSize.height - this.footerHeight
      ) {
        this.currentSectionRef.updateToSection(
          this.currentSection,
          0,
          this.props.heightForSection(this.currentSection),
          true
        );
      }
    }
    if (
      offset.y <= this.headerHeight ||
      offset.y >= this.contentSize.height - this.footerHeight
    ) {
      if (this.currentSectionRef.top !== -10000)
        this.currentSectionRef.updateToSection(
          this.currentSection,
          -10000,
          this.props.heightForSection(this.currentSection),
          false
        );
    } else if (this.currentSectionRef.top === -10000) {
      this.currentSectionRef.updateToSection(
        this.currentSection,
        0,
        this.props.heightForSection(this.currentSection),
        false
      );
    }
  }

  _forceUpdate() {
    this.workRefs.forEach(item => {
      if (item.waitForRender) item.contentUpdate();
    });
    this.workSectionRefs.forEach(item => {
      if (item.waitForRender) {
        item.contentUpdate();
      }
    });
    if (this.currentSectionRef.waitForRender) {
      this.currentSectionRef.contentUpdate();
    }
    this.freeRefs.forEach(item => {
      if (item.waitForRender) item.positionUpdate();
    });
    this.freeSectionRefs.forEach(section => {
      if (section.waitForRender) section.contentUpdate();
    });
  }
  _positionUpdate() {
    this.workRefs.forEach(item => {
      if (item.waitForRender) item.positionUpdate();
    });
    this.freeRefs.forEach(item => {
      if (item.waitForRender) item.positionUpdate();
    });
  }

  _onLayout(e) {
    this.size = e.nativeEvent.layout;
    this.contentSize.width = this.size.width;
    this._onSizeConfirm();
  }
  _onHeaderLayout(e) {
    this.headerHeight = e.nativeEvent.layout.height;
    this._onSizeConfirm();
  }
  _onFooterLayout(e) {
    this.footerHeight = e.nativeEvent.layout.height;
    this._onSizeConfirm();
  }

  _onSizeConfirm() {
    if (
      !this.sizeConfirmed &&
      this.size !== null &&
      this.footerHeight !== null &&
      this.headerHeight !== null
    ) {
      this.sizeConfirmed = true;
      this.initCells();
    }
  }

  _nextIndexPathWithIndexPath(indexPath: IndexPath) {
    if (
      indexPath.row + 1 <
      this.props.numberOfRowsInSection(indexPath.section)
    ) {
      return { section: indexPath.section, row: indexPath.row + 1 };
    }
    return { section: indexPath.section + 1, row: -1 };
  }

  _previousIndexPathWithIndexPath(indexPath: IndexPath) {
    if (indexPath.row > -1) {
      return { section: indexPath.section, row: indexPath.row - 1 };
    }
    return {
      section: indexPath.section - 1,
      row: this.props.numberOfRowsInSection(indexPath.section - 1) - 1
    };
  }

  _compareIndexPath(indexPath1: IndexPath, indexPath2: IndexPath) {
    if (indexPath1.section !== indexPath2.section)
      return indexPath1.section - indexPath2.section;
    return indexPath1.row - indexPath2.row;
  }

  _topCellRef(): LargeListCell {
    let top = this.contentSize.height;
    let cell: LargeListCell;
    this.workRefs.forEach(item => {
      if (top > item.top) {
        cell = item;
        top = item.top;
      }
    });
    return cell;
  }

  _bottomCellRef(): LargeListCell {
    let top = 0;
    let cell: LargeListCell;
    this.workRefs.forEach(item => {
      if (top < item.top) {
        cell = item;
        top = item.top;
      }
    });
    return cell;
  }

  scrollTo(offset: Offset, animated: boolean = true) {
    offset.animated = animated;
    if (offset.y < 0) offset.y = 0;
    if (offset.y > this.contentSize.height - this.size.height)
      offset.y = this.contentSize.height - this.size.height;
    if (!animated) {
      this._onScroll({ nativeEvent: { contentOffset: offset } }, true);
    }
    this.scrollViewRef.scrollTo(offset);
  }

  scrollToIndexPath(indexPath: IndexPath, animated: boolean = true) {
    if (this.native) {
      this.scrollViewRef.scrollToIndexPath(indexPath);
      return;
    }
    let sumHeight = this.headerHeight ? this.headerHeight : 0;
    sumHeight -= this.props.heightForSection(indexPath.section);
    sumHeight += 1;
    for (let section = 0; section < this.numberOfSections(); ++section) {
      sumHeight += this.props.heightForSection(section);
      for (
        let row = 0;
        row < this.props.numberOfRowsInSection(section);
        ++row
      ) {
        if (
          this._compareIndexPath(indexPath, { section: section, row: row }) ===
          0
        ) {
          if (sumHeight > this.contentSize.height - this.size.height)
            sumHeight = this.contentSize.height - this.size.height - 1;
          this.scrollTo({ x: 0, y: sumHeight }, animated);
          return;
        }
        sumHeight += this.props.heightForCell(section, row);
      }
    }
  }

  scrollToEnd(animated: boolean = true) {
    this.scrollTo(
      { x: 0, y: this.contentSize.height - this.size.height },
      animated
    );
  }

  reloadIndexPath(indexPath: IndexPath) {
    this.workRefs.forEach(cell => {
      if (this._compareIndexPath(indexPath, cell.indexPath) === 0) {
        cell.contentUpdate();
      }
    });
  }

  reloadIndexPaths(indexPaths: IndexPath[]) {
    indexPaths.forEach(indexPath => {
      this.reloadIndexPath(indexPath);
    });
  }

  reloadAll() {
    this.workRefs.forEach(cell => {
      cell.contentUpdate();
    });
  }

  reloadData() {
    let waitTime = Platform.OS === "ios" ? 320 : 150;
    if (!this._onCellTouchBegin()) {
      waitTime = 0;
    }
    let timer = setTimeout(() => {
      this.initVar();
      this.safeArea = { top: 0, bottom: 0 };
      this.workRefs.forEach(cell => {
        this.freeRefs.push(cell);
      });
      this.freeRefs.forEach(cell => {
        cell.waitForRender = true;
        let index = this.workRefs.indexOf(cell);
        this.workRefs.splice(index, index > -1 ? 1 : 0);
        cell.updateToIndexPath(cell.indexPath, -10000, cell.height);
      });
      this.workSectionRefs.forEach(section => {
        this.freeSectionRefs.splice(0, 0, section);
      });
      this.freeSectionRefs.forEach(section => {
        let index = this.workSectionRefs.indexOf(section);
        this.workSectionRefs.splice(index, index > -1 ? 1 : 0);
        section.updateToSection(section.section, -10000, section.height, false);
      });
      this.forceUpdate();
      clearTimeout(timer);
    }, waitTime);
  }

  visibleIndexPaths(): IndexPath[] {
    let indexPaths: IndexPath[] = [];
    this.workRefs.forEach(item => {
      if (
        item.top + item.height > this.contentOffset.y &&
        item.top < this.contentOffset.y + this.size.height
      ) {
        indexPaths.push({
          section: item.indexPath.section,
          row: item.indexPath.row
        });
      }
    });
    return indexPaths;
  }

  visiableIndexPaths(): IndexPath[] {
    console.warn(
      "LargeList Warning: visiableIndexPaths is deprecated， use visibleIndexPaths instead. visiableIndexPaths will not support after 2.0.0"
    );
    this.visibleIndexPaths();
  }

  renderedIndexPaths(): IndexPath[] {
    let indexPaths: IndexPath[] = [];
    this.workRefs.forEach(item => {
      indexPaths.push({
        section: item.indexPath.section,
        row: item.indexPath.row
      });
    });
    return indexPaths;
  }

  freeCount(): number {
    return this.freeRefs.length;
  }

  _onTouchStart() {
    if (!this.props.onLoadMore) return;
    this.draging = true;
  }

  _onTouchMove(offset) {}

  _onTouchEnd() {
    if (!this.props.onLoadMore) return;
    this.draging = false;
    if (
      this.contentOffset.y > this.contentSize.height - this.size.height &&
      this.contentOffset.y <
        this.contentSize.height -
          this.size.height +
          this.props.heightForLoadMore()
    ) {
      this.scrollToEnd();
      return;
    }
    if (
      Platform.OS !== "ios" &&
      this.props.allLoadCompleted &&
      this.contentOffset.y >= this.contentSize.height - this.size.height
    ) {
      this.scrollToEnd();
      return;
    }
    this.scrollingAfterDraging = true;
  }

  _onScrollEnd() {
    this.lastScrollTime = 0;
    if (
      this.scrollingAfterDraging &&
      this.props.allLoadCompleted &&
      this.contentOffset.y > this.contentSize.height - this.size.height
    ) {
      this.scrollToEnd();
    }
    this.scrollingAfterDraging = false;
    this._forceUpdate();
    if (
      this.enoughLoadMore &&
      !this.loadingMore &&
      !this.props.allLoadCompleted &&
      this.contentOffset.y >=
        this.contentSize.height -
          this.size.height +
          this.props.heightForLoadMore()
    ) {
      this.loadingMore = true;
      this.props.onLoadMore();
    }
  }
}

const styles = StyleSheet.create({
  absoluteStretch: {
    position: "absolute",
    left: 0,
    right: 0
  }
});

export { LargeList };
