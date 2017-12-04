# react-native-largelist

中文文档请 [点击这里](./README-cn.md)

React-native-largelist is a high performance large list component for React-Native. It's performance is much better than SectionList.



**react-native-largelist** is a high performance list component for React Native(iOS & Android).

## Features

* react-native-largelist is better than SectionList

## Preview

This is a STTVTableView with 3000 cells

![Preview](./readme_resources/example.gif)

## Getting Started

iOS:

* Make sure your project is react-native project.
* Using this command to install:

```
npm add react-native-largelist
```

* Using it like this:

```
import { LargeList } from "react-native-largelist";

//other code
...
<LargeList
        style={{ flex: 1 }}
        bounces={true}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true });
          setTimeout(() => this.setState({ refreshing: false }), 2000);
        }}
        safeMargin={600}
        numberOfRowsInSection={section => this.props.numberOfEachSection}
        numberOfSections={this.props.numberOfSections}
        heightForCell={(section, row) =>
          row % 2 ? this.minCellHeight : this.maxCellHeight}
        renderCell={this.renderItem.bind(this)}
        heightForSection={section =>
          section % 2 ? this.minSectionHeight : this.maxSectionHeight}
        renderHeader={this.renderHeader.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        renderSection={section => {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: section % 2 ? "grey" : "yellow",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>
                I am section {section}
              </Text>
            </View>
          );
        }}
      />
...
```

# Usage

```
import { LargeList } from "react-native-largelist"
```

Props:

Props  |  type  |  default  |  effect  
------ | ------ | --------- | --------
（ViewPropTypes） | （ViewPropTypes） |  | All props of View
numberOfSections | number | 1 | number of sections in tableview
numberOfRowsInSection | (section:number) => number | section=>0 | function：return the number of rows in section
renderCell | (section:number,row:number) => React.Element | required | function: render of cell with section and row index
heightForCell | (section:number,row:number) => number | required | function：return height for cell with section and row index 
renderSection | (section:number) => React.Element | section=>null | function：render of section with section index
heightForSection | (section:number) => number | 0 | function：return height of section with section index
renderHeader | () => React.Element | null | function：render of header in the tableview
renderFooter | () => React.Element | null | function：render of footer in tableview
bounces | boolean | true | bounces
refreshing | boolean | true | refreshing
onRefresh | () => any | ()=>{} | callback of pulling to refresh
onScroll | ({nativeEvent:{contentOffset:{x:number,y:number}}})=> any |  | Callback when scrolling.

# principle
![](./readme_resources/largelist_advanced_usage.png)

# Advanced Usage
### safeMargin ( type:number ,default: 600)
Untranslated
### dynamicMargin (type:number,default: 500)
Untranslated
### scrollEventThrottle (type: number ,default: ios:16 android:32)
Untranslated
### onIndexPathDidEnterSafeArea (type:(indexPath:IndexPath)=>any)
Untranslated
### onIndexPathDidLeaveSafeArea (type:(indexPath:IndexPath)=>any)
Untranslated

# Method
### scrollTo(offset:Offset, animated:boolean=true)
Untranslated
### scrollToIndexPath(indexPath:IndexPath, animated:boolean = true)
Untranslated
### scrollToEnd(animated:boolean=true)
Untranslated
### visiableIndexPaths():IndexPath[]
Untranslated
### renderedIndexPaths():IndexPath[]
Untranslated
### freeCount(): number
Untranslated

# dynisic
### size:Size
Untranslated   Size：{width:number,height:number}
### contentOffset:Offset
Untranslated   Offset：{x:number,y:number}
### safeArea: Range
Untranslated   Range:{top:number,bottom:number}
### topIndexPath: IndexPath
Untranslated   IndexPath:{section:number,row:number}
### bottomIndexPath: IndexPath
Untranslated   IndexPath:{section:number,row:number}
### contentSize:Size
Untranslated   Size:{width:number, height:number}
### currentSection:number
Untranslated
### headerHeight:number
Get LargeList's header height
### footerHeight:number
Get LargeList's footer height