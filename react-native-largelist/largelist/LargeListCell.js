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
    indexPath: PropTypes.object
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

  updateToIndexPath(
    indexPath: IndexPath,
    top: number,
    height: number
  ) {
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

    return (
      <View
        ref={ref => (this.rootView = ref)}
        style={[this.props.style, { top: this.top, height: this.height }]}
      >
        {this.top !== -10000 &&
          this.props.renderCell(this.indexPath.section, this.indexPath.row)}
      </View>
    );
  }
}

export { LargeListCell };
