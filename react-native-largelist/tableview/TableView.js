import {
  requireNativeComponent,
  View,
  NativeModules
} from "react-native";
import React from "react";
import { CellContainer } from "./CellContainer";
import PropTypes from "prop-types";

const NativeSectionView = requireNativeComponent("STTVSectionView");
const NativeTableView = requireNativeComponent("STTVTableView", TableView);
const NativeHeader = requireNativeComponent("STTVHeaderView");
const NativeFooter = requireNativeComponent("STTVFooterView");
const TableViewModule = NativeModules.STTVTableViewModule;

interface SummaryRowType {
  height: number
}

interface SummarySectionType {
  rows: SummaryRowType[],
  height: number
}

interface IndexPathType {
  section: number,
  row: number
}

export const ReloadCellAnimationType = {
  fade: 0,
  right: 1,
  left: 2,
  top: 3,
  bottom: 4,
  none: 5,
  middle: 6,
  automatic: 100
};

let tableViewTag = 0;

class TableView extends React.Component {
  static propTypes = {
    numberOfSections: PropTypes.number,
    numberOfRowsInSection: PropTypes.func,
    renderCell: PropTypes.func,
    heightForCell: PropTypes.func,
    renderSection: PropTypes.func,
    heightForSection: PropTypes.func,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    bounces: PropTypes.bool,
    refreshable: PropTypes.bool,
    onTopRefresh: PropTypes.func
  };
  static defaultProps = {
    numberOfSections: 1,
    numberOfRowsInSection: section => 0,
    renderSection: () => <View style={{ flex: 1 }} />,
    heightForSection: 0,
    renderHeader: null,
    renderFooter: null,
    bounces: true,
    refreshable: false,
    onTopRefresh: () => {}
  };

  indexesOfSections: number[] = [];
  summary: SummarySectionType[];
  numberOfAllCells: number = 0;
  numberOfMaxCell: number = 0;
  tag;
  cellContainer: CellContainer;

  constructor(props) {
    super(props);
    this.initSummary(props);
  }

  initSummary(props): void {
    this.summary = [];
    this.numberOfAllCells = 0;
    this.tag = tableViewTag++;
    for (let i = 0; i < props.numberOfSections; ++i) {
      this.indexesOfSections.push(i);
      let section: SummarySectionType = { height: props.heightForSection(i) };
      let rows: SummaryRowType[] = [];
      for (let j = 0; j < props.numberOfRowsInSection(i); ++j) {
        let height = props.heightForCell(i, j);
        let row: SummaryRowType = { height: height };
        rows.push(row);
      }
      section.rows = rows;
      this.summary.push(section);
      if (this.numberOfMaxCell < rows.length)
        this.numberOfMaxCell = rows.length;
    }
  }

  render() {
    return (
      <NativeTableView
        tag={this.tag}
        style={this.props.style}
        summary={this.summary}
        numberOfMaxCell={this.numberOfMaxCell}
        refreshable={this.props.refreshable}
        bounces={this.props.bounces}
        onTopRefresh={this.props.onTopRefresh}
      >
        {this.props.renderHeader &&
          <NativeHeader>
            {this.props.renderHeader()}
          </NativeHeader>}
        {this.props.renderFooter &&
          <NativeFooter>
            {this.props.renderFooter()}
          </NativeFooter>}
        <CellContainer
          ref={ref => (this.cellContainer = ref)}
          renderCell={this.props.renderCell}
          heightForCell={this.props.heightForCell}
          numberOfMostRows={this.numberOfMaxCell}
        />
        {this.indexesOfSections.map(item => {
          return (
            <NativeSectionView
              style={{ height: this.props.heightForSection(item) }}
              key={item}
              tag={item}
            >
              {this.props.renderSection(item)}
            </NativeSectionView>
          );
        })}
      </NativeTableView>
    );
  }

  reloadCells(
    indexPaths: IndexPathType[],
    animation: number = ReloadCellAnimationType.automatic
  ): void {
    TableViewModule.reloadCells(indexPaths, this.tag, animation);
  }

  reloadAll() {
    TableViewModule.reloadAll({}, this.tag);
  }

  scrollToIndexPath(indexPath: IndexPathType) {
    TableViewModule.scrollTo(indexPath, this.tag);
  }
}

export { TableView };
