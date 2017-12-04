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
  ViewPropTypes
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
    ...ViewPropTypes,
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
    onRefresh: PropTypes.func,
    dynamicMargin: PropTypes.number,
    scrollEventThrottle: PropTypes.number,
    onScroll:PropTypes.func,

    onIndexPathDidEnterSafeArea: PropTypes.func,
    onIndexPathDidLeaveSafeArea: PropTypes.func,

    // onIndexPathDidAppear: PropTypes.func,
    // onIndexPathDidDisappear: PropTypes.func,
    // onSectionDidAppear: PropTypes.func,
    // onSectionDidDisappear: PropTypes.func
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

    safeMargin: 600,
    dynamicMargin: 500,
    scrollEventThrottle: Platform.OS==="ios"?16:32
  };

  sections: Element[]=[];
  workSectionRefs: LargeListSection[]=[];
  freeSectionRefs: LargeListSection[]=[];

  cells: Element[]=[];       //所有的Cell 的元素

  workRefs: LargeListCell[]=[];       //正在显示的Cell的引用
  freeRefs: LargeListCell[]=[];       //空闲的Cell的引用

  size: Size;      //LargeList宽高
  contentOffset: Offset={ x: 0, y: 0 };  //LargeList偏移


  safeArea: Range={top:0, bottom:0};        //safe area range
  topIndexPath: IndexPath={section:0, row:0};      //safe area中最顶部的IndexPath
  bottomIndexPath: IndexPath={section:0, row:0};      //safe area中最底部的IndexPath

  contentSize:Size={width:0,height:0};
  lastScrollTime:number=0;

  currentSection:number=0;
  currentSectionRef: LargeListSection;
  nextSection: number=0;
  headerHeight: number;
  footerHeight: number;
  sizeConfirmed: boolean=false;

  forceTimer: number=0;
  created: boolean=false;
  keyForCreating: number=0;
  minCellHeight: number = 40;
  minSectionHeight: number = 40;
  scrollViewRef: ScrollView;

  constructor(props) {
    super(props);
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
      <View {...this.props}>
        <ScrollView
          ref = {ref=>this.scrollViewRef=ref}
          bounces={this.props.bounces}
          refreshControl={this.props.refreshing!==undefined && <RefreshControl refreshing={this.props.refreshing} onRefresh={this.props.onRefresh}/>}
          contentContainerStyle={{ alignSelf: "stretch", height: this.contentSize.height }}
          onLayout={this._onLayout.bind(this)}
          style={{flex:1}}
          scrollEventThrottle={this.props.scrollEventThrottle}
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
    this._forceUpdate();
  }

  _onScroll(e) {
    let offset: Offset = e.nativeEvent.contentOffset;
    let now:number = new Date().getTime();
    let speed:number = 0;
    let topMargin:number=this.props.safeMargin;
    let bottomMargin:number=this.props.safeMargin;
    if (this.lastScrollTime > 0) {
      speed = Math.abs(offset.y-this.contentOffset.y)/(now-this.lastScrollTime);
    } else if (Math.abs(offset.y-this.contentOffset.y)>this.props.safeMargin) {
      speed = 5;
    }
    this.lastScrollTime = now;
    let forceReload = offset.y<topMargin
      || offset.y+this.size.height+bottomMargin>this.contentSize.height
      || speed<4;

    if (offset.y > this.contentOffset.y) {
      if (speed>=4) {
        topMargin = this.props.safeMargin-this.props.dynamicMargin;
        bottomMargin = this.props.safeMargin + this.props.dynamicMargin;
      }
      this.workSectionRefs.forEach(section=>{
        if (section.top+section.height < offset.y - topMargin) {
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
        if (cell.top+cell.height < offset.y - topMargin) {
          this.freeRefs.push(cell);
          this.props.onIndexPathDidLeaveSafeArea && this.props.onIndexPathDidLeaveSafeArea({section:cell.indexPath.section,row:cell.indexPath.row});
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
      while (this.safeArea.bottom < this.contentSize.height-this.footerHeight && this.safeArea.bottom<offset.y+this.size.height+bottomMargin) {
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
        this.props.onIndexPathDidEnterSafeArea && this.props.onIndexPathDidEnterSafeArea({section:this.bottomIndexPath.section,row:this.bottomIndexPath.row});
        this.safeArea.bottom += this.props.heightForCell(this.bottomIndexPath.section,this.bottomIndexPath.row);
      }
    } else {
      if (speed>=4) {
        topMargin = this.props.safeMargin+this.props.dynamicMargin;
        bottomMargin = this.props.safeMargin - this.props.dynamicMargin;
      }
      this.workSectionRefs.forEach(section=>{
        if (section.top > offset.y + this.size.height + bottomMargin) {
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
        if (cell.top> offset.y+this.size.height + bottomMargin) {
          this.freeRefs.push(cell);
          this.props.onIndexPathDidLeaveSafeArea && this.props.onIndexPathDidLeaveSafeArea({section:cell.indexPath.section,row:cell.indexPath.row});
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
      while (this.safeArea.top>this.headerHeight && this.safeArea.top>offset.y-topMargin) {
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
        this.props.onIndexPathDidEnterSafeArea && this.props.onIndexPathDidEnterSafeArea({section:this.topIndexPath.section,row:this.topIndexPath.row});
        this.safeArea.top -= this.props.heightForCell(this.topIndexPath.section,this.topIndexPath.row);
      }
    }
    this.contentOffset = offset;
    let exchanging = false;
    this.workSectionRefs.forEach(item=>{
      if (this.currentSection == item.section-1 && offset.y<item.top && item.top < this.currentSectionRef.height+offset.y) {
        // this.nextSection=item.section;
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
    // if (this.forceTimer>0) {
    //   clearTimeout(this.forceTimer);
    //   this.forceTimer=0;
    // }
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
    this.props.onScroll && this.props.onScroll(e);
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

  scrollTo(offset:Offset, animated:boolean=true) {
    offset.animated=animated;
    this.scrollViewRef.scrollTo(offset);
  }

  scrollToIndexPath(indexPath:IndexPath, animated:boolean = true) {
    let sumHeight = this.headerHeight?this.headerHeight:0;
    for (let section=0;section<this.props.numberOfSections;++section) {
      sumHeight+=this.props.heightForSection(section);
      for (let row=0;row<this.props.numberOfRowsInSection(section);++row) {
        sumHeight += this.props.heightForCell(section,row);
        if (this._compareIndexPath(indexPath,{section:section,row:row})===0) {
          this.scrollTo({x:0,y:sumHeight},animated);
          return;
        }
      }
    }
  }

  scrollToEnd(animated:boolean=true){
    this.scrollViewRef.scrollToEnd({animated:animated});
  }

  visiableIndexPaths():IndexPath[]{
    let indexPaths:IndexPath[] = [];
    this.workRefs.forEach(item=>{
      if (item.top+item.height>this.contentOffset.y && item.top<this.contentOffset.y+this.size.height) {
        indexPaths.push({section:item.indexPath.section,row:item.indexPath.row});
      }
    });
    return indexPaths;
  }

  renderedIndexPaths():IndexPath[] {
    let indexPaths:IndexPath[] = [];
    this.workRefs.forEach(item=>{
      indexPaths.push({section:item.indexPath.section,row:item.indexPath.row});
    });
    return indexPaths;
  }

  freeCount(): number {
    return this.freeRefs.length;
  }

}

export { LargeList };
