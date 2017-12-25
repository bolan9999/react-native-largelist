/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/2
 *
 */

import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

interface IndexPath {
  section: number,
  row: number
}

class LargeListCell extends React.Component {
  static propTypes = {
    renderCell: PropTypes.func,
    indexPath: PropTypes.object,
    numberOfRowsInSection: PropTypes.func,
    numberOfSections: PropTypes.func
  };

  rootView: View;
  top: number;
  height: number;

  indexPath: IndexPath;
  waitForRender: boolean;
  locationUpdated: boolean;

  forceUpdate() {
    this.waitForRender = false;
    if (this.locationUpdated) this.positionUpdate();
    this.locationUpdated = false;
    this.setState({});
  }

  positionUpdate() {
    this.locationUpdated = true;
    this.rootView.setNativeProps({
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
    this.indexPath = {
      section: props.indexPath.section,
      row: props.indexPath.row
    };
  }

  render() {
    let { section, row } = this.indexPath;
    let show =
      this.top !== -10000 &&
      section >= 0 &&
      section < this.props.numberOfSections() &&
      row >= 0 &&
      row < this.props.numberOfRowsInSection(section);
    return (
      <View
        ref={ref => (this.rootView = ref)}
        style={[this.props.style, { top: this.top, height: this.height }]}
      >
        {show &&
          this.props.renderCell(this.indexPath.section, this.indexPath.row)}
      </View>
    );
  }

  _compareIndexPath(indexPath1: IndexPath, indexPath2: IndexPath) {
    if (indexPath1.section !== indexPath2.section)
      return indexPath1.section - indexPath2.section;
    return indexPath1.row - indexPath2.row;
  }
}

export { LargeListCell };
