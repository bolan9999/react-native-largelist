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
  RefreshControl
} from "react-native";
import PropTypes from "prop-types";
import { LargeListCell } from "./LargeListCell";
import { LargeListSection } from "./LargeListSection";

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
  top:number;
  bottom:number;
}

class LargeList extends React.Component {
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
    onTopRefresh: PropTypes.func,

    safeMargin: PropTypes.number,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
  };
  static defaultProps = {
    numberOfSections: 1,
    numberOfRowsInSection: section => 0,
    renderSection: () => <View style={{ flex: 1 }} />,
    heightForSection: section => 0,
    renderHeader: null,
    renderFooter: null,
    bounces: true,
    onRefresh: () => {},

    safeMargin: 600
  };

  sections: Element[];
  workSectionRefs: LargeListSection[];
  freeSectionRefs: LargeListSection[];

  cells: Element[];       //所有的Cell 的元素

  workRefs: LargeListCell[];       //正在显示的Cell的引用
  freeRefs: LargeListCell[];       //空闲的Cell的引用

  size: Size;      //LargeList宽高
  contentOffset: Offset;  //LargeList偏移


  safeArea: Range;        //safe area range
  topIndexPath: IndexPath;      //safe area中最顶部的IndexPath
  bottomIndexPath: IndexPath;      //safe area中最底部的IndexPath

  contentSize:Size;
  lastScrollTime:number;

  currentSection:number;
  currentSectionRef: LargeListSection;
  nextSection: number;
  headerHeight: number;
  footerHeight: number;
  sizeConfirmed: boolean;

  forceTimer: number;
  created: boolean;
  refreshing:boolean=false;
  keyForCreating: number=0;
  minCellHeight: number = 40;
  minSectionHeight: number = 40;

  constructor(props) {
    super(props);
    this.cells = [];
    this.sections =[];
    this.workSectionRefs =[];
    this.freeSectionRefs = [];
    this.workRefs = [];
    this.freeRefs = [];
    this.contentOffset = { x: 0, y: 0 };
    this.safeArea = {top:0, bottom:0};
    this.topIndexPath = {section:0, row:0};
    this.bottomIndexPath = {section:0,row:0};
    this.contentSize = {width:0,height:0};
    this.lastScrollTime = 0;
    this.currentSection = 0;
    this.nextSection=0;
    this.forceTimer=0;
    this.sizeConfirmed=false;
    this.created = false;
    for (let i=0;i<this.props.numberOfSections;++i) {
      if (this.minSectionHeight > this.props.heightForSection(i)) {
        this.minSectionHeight = this.props.heightForSection(i);
      }
      this.contentSize.height += this.props.heightForSection(i);
      for (let j=0;j<this.props.numberOfRowsInSection(i);++j){
        if (this.minCellHeight > this.props.heightForCell(i,j)) {
          this.minCellHeight = this.props.heightForCell(i,j);
        }
        this.contentSize.height += this.props.heightForCell(i,j);
      }
    }
  }

  initCells() {
    this.contentSize.height+=this.headerHeight;
    this.contentSize.height+=this.footerHeight;
    let sumHeight: number = this.headerHeight;
    let section;
    let row=0;
    for (section=0; section<this.props.numberOfSections && sumHeight < this.size.height + this.props.safeMargin; ++section) {
      if (row==0) {
        this.sections.push(this._createSection(section, sumHeight, this.workSectionRefs));
        sumHeight += this.props.heightForSection(section);
      }
      if (this.props.numberOfRowsInSection(section) == 0) {
        this.safeArea.bottom = sumHeight;
        this.bottomIndexPath = {section:section,row:row};
        continue;
      }
      for (row=0;
           row < this.props.numberOfRowsInSection(section);
           ++row
      ) {
        if (sumHeight < this.size.height + this.props.safeMargin) {
          this.cells.push(this._createCell(section, row, sumHeight, this.workRefs));
          sumHeight += this.props.heightForCell(section, row);
          this.safeArea.bottom = sumHeight;
          this.bottomIndexPath = {section:section,row:row};
        }
      }
      row=0;
    }
    if (sumHeight<this.size.height+this.props.safeMargin) {
      this.safeArea.bottom = sumHeight;
      this.bottomIndexPath = {section:section,row:row};
      return;
    }
    for (let i = 0; i < Math.floor(this.props.safeMargin/this.minSectionHeight)+2; i++) {
      this.sections.push(this._createSection(section + i + 1, -10000, this.freeSectionRefs));
    }
    for (let i = 0; i < Math.floor(this.props.safeMargin/this.minCellHeight)+2; i++) {
      this.cells.push(this._createCell(section, row + i, -10000, this.freeRefs));
    }
  }

  render() {
    return (
      <View style={this.props.style}>
        <ScrollView
          bounces={this.props.bounces}
          refreshControl={this.props.refreshing!==undefined && <RefreshControl refreshing={this.props.refreshing} onRefresh={this.props.onRefresh}/>}
          contentContainerStyle={{ alignSelf: "stretch", height: this.contentSize.height }}
          onLayout={this._onLayout.bind(this)}
          style={{flex:1}}
          scrollEventThrottle={16}
          onScroll={this._onScroll.bind(this)}
          onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
        >
          <View style={{position: "absolute",
            left: 0,
            right: 0,
            top: this.sizeConfirmed?0:-10000}} onLayout={this._onHeaderLayout.bind(this)}>
            {this.props.renderHeader()}
          </View>
          {this.sections.map(item=>item)}
          {this.cells.map(item => item)}
          <View style={{position: "absolute",
            left: 0,
            right: 0,
            top: this.sizeConfirmed?this.contentSize.height-this.footerHeight:-10000}} onLayout={this._onFooterLayout.bind(this)}>
            {this.props.renderFooter()}
          </View>
        </ScrollView>
        <LargeListSection style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: this.sizeConfirmed?0:-10000,
          height: this.props.heightForSection(0),
          zIndex:99999999
        }} section={0} renderSection={this.props.renderSection} ref={reference=>this.currentSectionRef=reference}/>
      </View>
    );
  }

  _createSection(section: number, top:number, refs) {
    return <LargeListSection
      ref={reference=>reference&&refs.push(reference)}
      key={this.keyForCreating++}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: top,
        height: this.props.heightForSection(section)
      }}
      section={section}
      renderSection={this.props.renderSection}
    />
  }

  _createCell(section: number, row: number, top:number, refs) {
    let height = this.props.heightForCell(section, row);
    return (
      <LargeListCell
        ref={reference => reference && refs.push(reference)}
        key={this.keyForCreating++}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: top,
          height: height
        }}
        renderCell={this.props.renderCell}
        indexPath={{section:section,row:row}}
      />
    );
  }

  _onMomentumScrollEnd(){
    this.lastScrollTime = 0;
    this.workRefs.forEach(item=>{
      if (item.waitForRender)
        item.forceUpdate();
    });
    this.workSectionRefs.forEach(item=>{
      if (item.waitForRender) {
        item.forceUpdate();
      }
    });
    if (this.currentSectionRef.waitForRender) {
      this.currentSectionRef.forceUpdate();
    }
  }

  _onScroll(e) {
    let offset: Offset = e.nativeEvent.contentOffset;
    let now:number = new Date().getTime();
    let speed:number = 0;
    if (this.lastScrollTime > 0) {
      speed = Math.abs(offset.y-this.contentOffset.y)/(now-this.lastScrollTime);
    } else if (Math.abs(offset.y-this.contentOffset.y)>1000) {
      speed = 5;
    }
    this.lastScrollTime = now;
    let forceReload = offset.y<this.props.safeMargin
      || offset.y+this.size.height+this.props.safeMargin>this.contentSize.height
      || speed<4;

    if (offset.y > this.contentOffset.y) {
      this.workSectionRefs.forEach(section=>{
        if (section.top+section.height < offset.y - this.props.safeMargin) {
          this.freeSectionRefs.push(section);
          if (this.safeArea.top<section.top+section.height) {
            this.safeArea.top = section.top+section.height;
          }
        }
      });
      this.freeSectionRefs.forEach(section=>{
        let index = this.workSectionRefs.indexOf(section);
        this.workSectionRefs.splice(index,index>-1?1:0);
      });

      this.workRefs.forEach(cell=>{
        if (cell.top+cell.height < offset.y - this.props.safeMargin) {
          this.freeRefs.push(cell);
          if (this._compareIndexPath(this.topIndexPath, cell.indexPath) <= 0){
            this.topIndexPath = this._nextIndexPathWithIndexPath(cell.indexPath);
          }
          if (this.safeArea.top<cell.top+cell.height) {
            this.safeArea.top = cell.top+cell.height;
          }
        }
      });
      this.freeRefs.forEach(cell=>{
        let index = this.workRefs.indexOf(cell);
        this.workRefs.splice(index,index>-1?1:0);
      });
      while (this.safeArea.bottom < this.contentSize.height-this.footerHeight && this.safeArea.bottom<offset.y+this.size.height+this.props.safeMargin) {
        this.bottomIndexPath.row++;
        if (this.bottomIndexPath.row>=this.props.numberOfRowsInSection(this.bottomIndexPath.section)) {
          this.bottomIndexPath.section++;
          this.bottomIndexPath.row=-1;
          let reference = this.freeSectionRefs.pop();

          if (!reference){
            this.created = true;
            this.sections.push(this._createSection(this.bottomIndexPath.section,this.safeArea.bottom,this.workSectionRefs));
          } else {
            reference.updateToSection(this.bottomIndexPath.section,this.safeArea.bottom,this.props.heightForSection(this.bottomIndexPath.section),true);
            this.workSectionRefs.push(reference);
          }

          this.safeArea.bottom += this.props.heightForSection(this.bottomIndexPath.section);
          continue;
        }

        let reference = this.freeRefs.pop();
        if (!reference) {
          this.cells.push(this._createCell(this.bottomIndexPath.section, this.bottomIndexPath.row, this.safeArea.bottom,this.workRefs));
          this.created = true;
        } else {
          reference.updateToIndexPath(this.bottomIndexPath, this.safeArea.bottom,this.props.heightForCell(this.bottomIndexPath.section,this.bottomIndexPath.row),false);
          this.workRefs.push(reference);
        }
        this.safeArea.bottom += this.props.heightForCell(this.bottomIndexPath.section,this.bottomIndexPath.row);
      }
    } else {
      this.workSectionRefs.forEach(section=>{
        if (section.top > offset.y + this.size.height + this.props.safeMargin) {
          this.freeSectionRefs.push(section);
          if (this.safeArea.bottom>section.top) {
            this.safeArea.bottom = section.top;
          }
        }
      });
      this.freeSectionRefs.forEach(section=>{
        let index = this.workSectionRefs.indexOf(section);
        this.workSectionRefs.splice(index,index>-1?1:0);
      });
      this.workRefs.forEach(cell=>{
        if (cell.top> offset.y+this.size.height + this.props.safeMargin) {
          this.freeRefs.push(cell);
          if (this._compareIndexPath(this.bottomIndexPath,cell.indexPath)>=0) {
            this.bottomIndexPath = this._previousIndexPathWithIndexPath(cell.indexPath);
          }
          if (this.safeArea.bottom>cell.top) {
            this.safeArea.bottom = cell.top;
          }
        }
      });
      this.freeRefs.forEach(cell=>{
        let index = this.workRefs.indexOf(cell);
        this.workRefs.splice(index,index>-1?1:0);
      });
      // console.log("topIndexPath", this.topIndexPath);
      while (this.safeArea.top>this.headerHeight && this.safeArea.top>offset.y-this.props.safeMargin) {
        this.topIndexPath.row--;
        if (this.topIndexPath.row==-1) {
          let reference = this.freeSectionRefs.pop();
          if (!reference){
            this.created = true;
            this.sections.push(this._createSection(this.topIndexPath.section,this.safeArea.top-this.props.heightForSection(this.topIndexPath.section),this.workSectionRefs));
          } else {
            reference.updateToSection(this.topIndexPath.section,this.safeArea.top-this.props.heightForSection(this.topIndexPath.section),this.props.heightForSection(this.topIndexPath.section),true);
            this.workSectionRefs.push(reference);
          }

          this.safeArea.top -= this.props.heightForSection(this.topIndexPath.section);
          continue;
        }
        if (this.topIndexPath.row==-2) {
          this.topIndexPath.section--;
          this.topIndexPath.row = this.props.numberOfRowsInSection(this.topIndexPath.section);
          continue;
        }
        let reference = this.freeRefs.pop();
        if (!reference) {
          this.created = true;
          this.cells.push(this._createCell(this.topIndexPath.section, this.topIndexPath.row, this.safeArea.top-this.props.heightForCell(this.topIndexPath.section,this.topIndexPath.row),this.workRefs));
        } else {
          reference.updateToIndexPath(this.topIndexPath, this.safeArea.top-this.props.heightForCell(this.topIndexPath.section,this.topIndexPath.row),this.props.heightForCell(this.topIndexPath.section,this.topIndexPath.row),false);
          this.workRefs.push(reference);
        }
        this.safeArea.top -= this.props.heightForCell(this.topIndexPath.section,this.topIndexPath.row);
      }
    }
    this.contentOffset = offset;
    let exchanging = false;
    this.workSectionRefs.forEach(item=>{
      if (this.currentSection == item.section-1 && offset.y<item.top && item.top < this.currentSectionRef.height+offset.y) {
        this.nextSection=item.section;
        exchanging=true;
        this.currentSectionRef.updateToSection(this.currentSection,item.top-offset.y-this.currentSectionRef.height,this.currentSectionRef.height,false);
      }
    });
    if (!exchanging) {
      this.workSectionRefs.forEach(item=>{
        if (this.currentSection!=item.section && item.top<=offset.y && item.top+item.height>offset.y) {
          this.currentSection = item.section;
          this.currentSectionRef.updateToSection(this.currentSection,0,this.props.heightForSection(this.currentSection),false);
        }
      })
      this.workRefs.forEach(item=>{
        if (this.currentSection!=item.indexPath.section && item.top<=offset.y && item.top+item.height>offset.y) {
          this.currentSection = item.indexPath.section;
          this.currentSectionRef.updateToSection(this.currentSection,0,this.props.heightForSection(this.currentSection),false);
        }
      })
    }
    if (offset.y<this.headerHeight) {
      this.currentSectionRef.updateToSection(this.currentSection,-10000,this.props.heightForSection(this.currentSection),false);
    } else if (this.currentSectionRef.top===-10000) {
      this.currentSectionRef.updateToSection(this.currentSection,0,this.props.heightForSection(this.currentSection),false);
    }
    if (this.forceTimer>0) {
      clearTimeout(this.forceTimer);
      this.forceTimer=0;
    }
    if (forceReload) {
      // if (this.created) {
      //   this.created = false;
      //   this.setState({});
      // } else {
      this._forceUpdate();
      // }
    } else {
      // this.forceTimer = setTimeout(()=>{
      //   this.forceTimer = 0;
      //   this._forceUpdate();
      // },50);
    }
  }

  _forceUpdate(){
    this.workRefs.forEach(item=>{
      if (item.waitForRender)
        item.forceUpdate();
    });
    this.workSectionRefs.forEach(item=>{
      if (item.waitForRender) {
        item.forceUpdate();
      }
    });
    if (this.currentSectionRef.waitForRender) {
      this.currentSectionRef.forceUpdate();
    }
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

  _onSizeConfirm(){
    if (!this.sizeConfirmed && this.size!=undefined && this.footerHeight!=undefined &&this.headerHeight!=undefined){
      this.sizeConfirmed = true;
      this.initCells();
      this.setState({});
    }
  }
  _onRefresh(){
    this.refreshing=true;
    this.setState({});
    setTimeout(()=>{
      this.refreshing=false;
      this.setState({});
    },2000);
  }

  _nextIndexPathWithIndexPath(indexPath:IndexPath){
    if (indexPath.row+1 < this.props.numberOfRowsInSection(indexPath.section)) {
      return {section:indexPath.section, row:indexPath.row+1};
    }
    return {section:indexPath.section+1, row:-1};
  }

  _previousIndexPathWithIndexPath(indexPath:IndexPath) {
    if (indexPath.row > -1) {
      return {section:indexPath.section, row:indexPath.row-1};
    }
    return {section:indexPath.section-1, row:this.props.numberOfRowsInSection(indexPath.section)-1};
  }

  _compareIndexPath(indexPath1:IndexPath,indexPath2:IndexPath){
    if (indexPath1.section != indexPath2.section)
      return indexPath1.section - indexPath2.section;
    return indexPath1.row - indexPath2.row;
  }
}

export { LargeList };
