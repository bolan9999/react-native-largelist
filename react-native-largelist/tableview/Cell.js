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
    this.state = {
      section: Math.floor(props.row / this.props.numberOfMostRows),
      row: props.row % props.numberOfMostRows,
      style: props.style,
      update: updateIdf,
      jsRenderedRow:props.row
    };
  }
  render() {
    return (
      <NativeCell
        {...this.props}
        style={this.state.style}
        jsRenderedRow={this.state.jsRenderedRow}
        jsFree={++busyIdf}
        onUpdate={this.onUpdate.bind(this)}
      >
        {this.props.renderChildren({
          section: this.state.section,
          row: this.state.row
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
    this.setState({
      section: section,
      row: row,
      style: style,
      update: ++updateIdf,
      jsRenderedRow:e.nativeEvent.row
    });
  }
}

export { Cell };
