# react-native-largelist

中文文档请 [点击这里](https://github.com/bolan9999/react-native-largelist/blob/master/README-cn.md)

React-native-largelist is a high performance large list component for React-Native. It's performance is much better than SectionList.



**react-native-largelist** is a high performance list component for React Native(iOS & Android).

## Features

* react-native-largelist is better than SectionList

## Preview

This is a STTVTableView with 3000 cells

![Preview](https://github.com/bolan9999/react-native-largelist/raw/master/readme_resources/example.gif)

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


