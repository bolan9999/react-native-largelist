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
  View,
  PanResponder,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import { EventScrollView } from "./EventScrollView";

interface IndexPath {
  section: number,
  row: number
}

class LargeListCell extends React.Component {
  static propTypes = {
    renderCell: PropTypes.func,
    indexPath: PropTypes.object,
    numberOfRowsInSection: PropTypes.func,
    numberOfSections: PropTypes.func,
    widthForRightWhenSwipeOut: PropTypes.func,
    renderRightWhenSwipeOut: PropTypes.func,
    onCellTouchBegin: PropTypes.func,
    widthForLeftWhenSwipeOut: PropTypes.func,
    renderLeftWhenSwipeOut: PropTypes.func,
    colorForSwipeOutBgColor: PropTypes.func
  };

  _rootView;
  _scrollView;
  top: number;
  height: number;
  contentSize;

  indexPath: IndexPath;
  waitForRender: boolean;
  locationUpdated: boolean;
  _panResponder = {};
  _offsetX: number = 0;
  _showRight: boolean = false;
  _showLeft: boolean = false;
  _left;
  _right;
  _cell;
  rerendered: boolean = false;
  _shouldScrollToCenter = false;
  _maxRightWidth: number = 250;
  _maxLeftWidth: number = 250;

  contentUpdate() {
    this.waitForRender = false;
    if (this.locationUpdated) this.positionUpdate();
    this.locationUpdated = false;
    this.forceUpdate();
  }

  positionUpdate() {
    this.locationUpdated = true;
    this._rootView.setNativeProps({
      style: { top: this.top, height: this.height }
    });
  }

  updateToIndexPath(indexPath: IndexPath, top: number, height: number) {
    this.waitForRender = true;
    this.indexPath = { section: indexPath.section, row: indexPath.row };
    this.top = top;
    this.height = height;
  }

  constructor(props) {
    super(props);
    this.top = props.style.top;
    this.height = props.style.height;
    this.contentSize = {};
    this.indexPath = {
      section: props.indexPath.section,
      row: props.indexPath.row
    };
    this.state = { offsetX: 0, showRight: false };
    if (this._maxRightWidth < this._rWidth() || this._rWidth() === 0) {
      this._maxRightWidth = this._rWidth();
    }
    if (this._maxLeftWidth < this._lWidth() || this._lWidth() === 0)
      this._maxLeftWidth = this._lWidth();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      // this.state.openedLeft || this.state.openedRight,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
      // Math.abs(gestureState.dx) > this.props.sensitivity &&
      // Math.abs(gestureState.dy) <= this.props.sensitivity,
      // onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      // onPanResponderRelease: this._handlePanResponderEnd,
      // onPanResponderTerminate: this._handlePanResponderEnd,
      onShouldBlockNativeResponder: (event, gestureState) => true,
      onPanResponderTerminationRequest: () => true
    });
  }

  componentDidUpdate() {
    if (this._shouldScrollToCenter && this.contentSize.width) {
      // this._scrollView.scrollTo({x:this._maxRightWidth,y:0,animated:false});
      setTimeout(() => this._scrollToOrigin(false), 1);
    }
  }

  _isValidSwipe(): boolean {
    return this._rWidth() > 0 || this._lWidth() > 0;
  }

  render() {
    let { section, row } = this.indexPath;
    let show =
      this.top !== -10000 &&
      section >= 0 &&
      section < this.props.numberOfSections() &&
      row >= 0 &&
      row < this.props.numberOfRowsInSection(section);
    if (!this._isValidSwipe())
      return (
        <View
          style={[this.props.style, { top: this.top, height: this.height }]}
          ref={ref => (this._rootView = ref)}
        >
          {show &&
            this.props.renderCell(this.indexPath.section, this.indexPath.row)}
        </View>
      );
    let contentStyle = this.contentSize.width
      ? {
          width:
            this.contentSize.width + this._maxRightWidth + this._maxLeftWidth,
          paddingHorizontal: this._maxRightWidth,
          flexDirection: "row"
        }
      : { flex: 1, flexDirection: "row" };
    // let contentStyle = {width:this.contentSize.width+StyleSheet.hairlineWidth};
    let cellStyle = {
      flex: 1,
      marginLeft: this._maxRightWidth,
      marginRight: this._maxRightWidth
    };
    return (
      <View
        ref={ref => (this._rootView = ref)}
        style={[
          this.props.style,
          {
            top: this.top,
            height: this.height,
            backgroundColor: this._bgColor()
          }
        ]}
      >
        <EventScrollView
          ref={ref => (this._scrollView = ref)}
          style={{ flex: 1 }}
          contentContainerStyle={contentStyle}
          horizontal={true}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          llonTouchStart={this._onResponderGrant.bind(this)}
          scrollEventThrottle={20}
          onScroll={this._onScroll.bind(this)}
          //llonTouchMove={this._handlePanResponderMove.bind(this)}
          onLayout={this._onLayout.bind(this)}
          llonTouchEnd={this._onTouchEnd.bind(this)}
          // contentOffset={{x:this._maxRightWidth,y:0}}
          //{...this._panResponder.panHandlers}
        >
          {show &&
            this.props.renderCell(this.indexPath.section, this.indexPath.row)}
        </EventScrollView>
        {show && this._renderLeft()}
        {show && this._renderRight()}
      </View>
    );
  }
  _renderLeft() {
    let { renderLeftWhenSwipeOut } = this.props;
    if (!this.contentSize.width || this._lWidth() <= 0) return null;
    let { section, row } = this.indexPath;
    return (
      <View style={[styles.ex, { left: 0 }]} ref={ref => (this._left = ref)}>
        {renderLeftWhenSwipeOut(section, row)}
      </View>
    );
  }

  _renderRight() {
    let { renderRightWhenSwipeOut } = this.props;
    if (!this.contentSize.width || this._rWidth() <= 0) return null;
    let { section, row } = this.indexPath;
    return (
      <View style={[styles.ex, { right: 0 }]} ref={ref => (this._right = ref)}>
        {renderRightWhenSwipeOut(section, row)}
      </View>
    );
  }

  _onLayout(e) {
    if (this.contentSize.width !== e.nativeEvent.layout.width) {
      // let width = this.contentSize.width;
      this.contentSize = { ...e.nativeEvent.layout };
      this._shouldScrollToCenter = true;
      this.forceUpdate();
    }
  }

  _onResponderGrant(e) {
    // console.log("Cell _onResponderGrant");
    // if (!this.rerendered) {
    //   this.rerendered = true;
    //   // this.forceUpdate();
    // }
    // this.setState({showRight:true});
    this.props.onCellTouchBegin(this);
  }

  _handlePanResponderMove(e, g) {
    console.log("_onMove", e, g);
  }

  hideOther(sender) {
    if (this !== sender) {
      this._scrollToOrigin();
    }
  }

  _onScroll(e) {
    let offsetX = e.nativeEvent.contentOffset.x;
    this._offsetX = offsetX;
    let width = offsetX - this._maxLeftWidth;
    if (width > this._rWidth()) width = this._rWidth();
    this._right && this._right.setNativeProps({ style: { width: width } });
    width = this._maxLeftWidth - offsetX;
    if (width > this._lWidth()) width = this._lWidth();
    this._left && this._left.setNativeProps({ style: { width: width } });
    // if (
    //   offsetX <= 0 ||
    //   offsetX >= this.contentSize.width + this._maxRightWidth
    // ) {
    //   this._onTouchEnd();
    // }
  }
  _onTouchEnd() {
    let rightWidth = this._rWidth();
    if (this._offsetX > this._maxLeftWidth + rightWidth / 2) {
      this._scrollToShowRight();
    } else if (this._offsetX > this._maxLeftWidth) {
      this._scrollToOrigin();
    } else if (this._offsetX < this._maxLeftWidth - this._lWidth() / 2) {
      this._scrollToShowLeft();
    } else if (this._offsetX < this._maxLeftWidth) {
      this._scrollToOrigin();
    }
  }

  _scrollToShowLeft(animated: boolean = true) {
    this._showLeft = true;
    this._offsetX !== this._maxRightWidth - this._lWidth() &&
      this._scrollView &&
      this._scrollView.scrollTo({
        x: this._maxRightWidth - this._rWidth(),
        y: 0,
        animated: animated
      });
  }

  _scrollToShowRight(animated: boolean = true) {
    this._showRight = true;
    let rWidth = this._rWidth();
    this._offsetX !== this._maxRightWidth + rWidth &&
      this._scrollView &&
      this._scrollView.scrollTo({
        x: this._maxRightWidth + rWidth,
        y: 0,
        animated: animated
      });
  }

  _scrollToOrigin(animated: boolean = true) {
    this._showRight = false;
    this._showLeft = false;
    this._offsetX !== this._maxRightWidth &&
      this._scrollView &&
      this._scrollView.scrollTo({
        x: this._maxLeftWidth,
        y: 0,
        animated: animated
      });
  }

  _lWidth() {
    return this.props.widthForLeftWhenSwipeOut(
      this.indexPath.section,
      this.indexPath.row
    );
  }

  _rWidth() {
    return this.props.widthForRightWhenSwipeOut(
      this.indexPath.section,
      this.indexPath.row
    );
  }

  _bgColor() {
    return this.props.colorForSwipeOutBgColor(
      this.indexPath.section,
      this.indexPath.row
    );
  }
}

const styles = StyleSheet.create({
  ex: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 0,
    overflow: "hidden"
  }
});

export { LargeListCell };
