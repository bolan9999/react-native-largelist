/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/23
 *
 */

import React from "react";
import { ScrollView, ViewPropTypes, Platform } from "react-native";
import PropTypes from "prop-types";

//   Event List:
//
//   onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
//   onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,  //not fire when scroll out of the visible area.
//   onResponderGrant: this.scrollResponderHandleResponderGrant,
//   onResponderReject: this.scrollResponderHandleResponderReject,
//   onResponderRelease: this.scrollResponderHandleResponderRelease,    //bug on Android
//   onResponderTerminate: this.scrollResponderHandleTerminate,
//   onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
//   onScroll: this._handleScroll,
//   onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
//   onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
//   onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
//   onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
//   onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
//   onTouchEnd: this.scrollResponderHandleTouchEnd,
//   onTouchMove: this.scrollResponderHandleTouchMove,
//   onTouchStart: this.scrollResponderHandleTouchStart,

class EventScrollView extends ScrollView {
  static propTypes = {
    ...ViewPropTypes,
    llonTouchStart: PropTypes.func,
    llonTouchMove: PropTypes.func,
    llonTouchEnd: PropTypes.func,
    llonResponderGrant: PropTypes.func,
  };

  static defaultProps = {
    llonTouchStart: () => {},
    llonTouchMove: () => {},
    llonTouchEnd: () => {},
    llonResponderGrant: ()=>{}
  };

  orgOnTouchStart;
  orgOnTouchMove;
  orgOnTouchEnd;
  orgOnScrollBeginDrag;
  orgOnScrollEndDrag;
  orgOnResponderRelease;
  orgOnMomentumScrollEnd;
  orgOnStartShouldSetResponderCapture;
  orgOnResponderGrant;
  orgOnScrollEvent;

  constructor(props) {
    super(props);
    this.orgOnTouchStart = this.scrollResponderHandleTouchStart;
    this.scrollResponderHandleTouchStart = this.onTouchStart.bind(this);

    this.orgOnTouchMove = this.scrollResponderHandleTouchMove;
    this.scrollResponderHandleTouchMove = this.onTouchMove.bind(this);

    this.orgOnScrollEndDrag = this.scrollResponderHandleScrollEndDrag;
    this.scrollResponderHandleScrollEndDrag = this.onScrollEndDrag.bind(this);

    // this.orgOnStartShouldSetResponderCapture = this.scrollResponderHandleScrollShouldSetResponder;
    // this.scrollResponderHandleScrollShouldSetResponder = this.onStartShouldSetResponderCapture.bind(this);

    this.orgOnResponderGrant = this.scrollResponderHandleResponderGrant;
    this.scrollResponderHandleResponderGrant = this.onResponderGrant.bind(this);

    // this.orgOnScrollEvent = this._handleScroll;
    // this._handleScroll = this.onScrollEvent.bind(this);
  }
  onTouchStart(e) {
    this.orgOnTouchStart(e);
    this.props.llonTouchStart({
      x: e.nativeEvent.locationX,
      y: e.nativeEvent.locationY
    });
  }
  onTouchMove(e) {
    this.orgOnTouchMove(e);
    this.props.llonTouchMove({
      x: e.nativeEvent.locationX,
      y: e.nativeEvent.locationY
    });
  }
  onScrollEndDrag(e) {
    this.orgOnScrollEndDrag(e);
    this.props.llonTouchEnd({
      x: e.nativeEvent.locationX,
      y: e.nativeEvent.locationY
    });
  }

  // onStartShouldSetResponderCapture(){
  //   return false;
  // }

  onResponderGrant(e){
    this.orgOnResponderGrant(e);
    this.props.llonResponderGrant(e);
  }

  // onScrollEvent(e) {
  //   this.orgOnScrollEvent(e);
  //   console.log("scrolling");
  // }

}

export { EventScrollView };
