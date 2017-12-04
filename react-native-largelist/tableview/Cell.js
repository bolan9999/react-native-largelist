import React from "react";
import PropTypes from "prop-types";
import { requireNativeComponent, Platform } from "react-native";
const NativeCell = requireNativeComponent("STTVCellView", Cell);

let busyIdf = 0;
let updateIdf = 0;

class Cell extends React.Component {
  static propTypes = {
    renderChildren: PropTypes.func,
    row: PropTypes.number,
    numberOfMostRows: PropTypes.number,
    heightForCell: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { row: props.row, style: props.style, update: updateIdf };
  }
  render() {
    return (
      <NativeCell
        {...this.props}
        style={this.state.style}
        jsRenderedRow={this.state.row}
        jsFree={++busyIdf}
        onUpdate={this.onUpdate.bind(this)}
        onChange={this.onUpdate.bind(this)}
      >
        {this.props.renderChildren({
          section: Math.floor(this.state.row / this.props.numberOfMostRows),
          row: this.state.row % this.props.numberOfMostRows
        })}
      </NativeCell>
    );
  }

  onUpdate(e) {
    let { row } = e.nativeEvent;
    let section = Math.floor(row / this.props.numberOfMostRows);
    row = row % this.props.numberOfMostRows;
    let style = {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: this.props.heightForCell(section, row)
    };
    console.log("onUpdate",new Date().getTime());
    this.setState({
      section: section,
      row: row,
      style: style,
      update: ++updateIdf
    });
  }
}

export { Cell };
