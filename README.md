# STTVTableView

中文文档请点击这里：[中文文档](https://github.com/bolan9999/STTVTableView/blob/master/README-cn.md)

**STTVTableView** is a high performance TableView for React Native(iOS only right row, Android will support on version 1.0.0).

## Features

* Bridged from "UITableView",Highly reused，there are only a little free Views
* Support for large list, in theory, the number of Cell almost no effect on performance
* Memory and CPU usage is significantly lower than SectionList
* Support ultra-fast speed slide, support rapid slide to the top!
* The API is simple and straightforward, the parameters have obvious type declarations, and you do not need help documentation to get started quickly
* Support reload

## Preview

This is a STTVTableView with 3000 cells

![Preview](https://github.com/bolan9999/STTVTableView/raw/master/readme_resources/example.gif)

## Getting Started

iOS:

* Make sure your project is react-native project.
* Using this command to install:

```
npm add sttv-tableview
```
* Make sure your iOS project's setting: Project(or Target) --> build setting -->Other Link Flags have the option of '-ObjC'.
* Drag " ${ProjectPath}/node_modules/sttv-tableview/ios/STTVTableView.xcodeproj " to your iOS project and make sure STTVTableView.framework is linked to your project.
* Using it like this:

```
import { TableView } from "sttv-tableview";

//other code
...
<TableView
	ref={ref => (this.ref = ref)}
	style={{ flex: 1, backgroundColor: "red" }}
	bounces={true}
	refreshable={true}
	onTopRefresh={() => console.log("refreshing")}
	numberOfRowsInSection={section => 3000}
	numberOfSections={1}
	heightForCell={(section, row) => (row % 2 ? 48 : 96)}
	renderCell={this.renderItem.bind(this)}
	renderSection={section =>
		<View
			style={{
				flex: 1,
				backgroundColor: "gray",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Text>
				I am section {section}
			</Text>
		</View>}
	heightForSection={section => (section % 2 ? 40 : 80)}
	renderHeader={() =>
		<View
			style={{
				height: 100,
				backgroundColor: "rgb(245,245,245)",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Text>I am header</Text>
		</View>}
	renderFooter={() =>
		<View
			style={{
				height: 100,
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Text>I am footer</Text>
		</View>}
	/>
...
```

# Usage

```
import { TableView } from "sttv-tableview"
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
refreshable | boolean | true | allow pulling to refresh
onTopRefresh | () => any | ()=>{} | callback of pulling to refresh

method：

```
interface IndexPathType {
  section: number,
  row: number
}

export enum ReloadCellAnimationType {
  fade: 0,
  right: 1,
  left: 2,
  top: 3,
  bottom: 4,
  none: 5,
  middle: 6,
  automatic: 100
};
```

method | parameter | return | effect
--- | --- | --- | ---
reloadCells | indexPaths:IndexPathType[], animation:ReloadCellAnimationType | void | reload some cells
reloadAll | void | void | reload all cells
scrollTo | indexPath:IndexPathType | void | scroll to indexpath

