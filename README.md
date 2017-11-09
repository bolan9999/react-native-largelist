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

属性:

属性  |  类型  |  默认  |  作用  
------ | ------ | --------- | --------
numberOfSections | number | 1 | 总的Section数量
numberOfRowsInSection | (section:number) => number | section=>0 | 函数：根据section索引返回当前section的Cell数量
renderCell | (section:number,row:number) => React.Element | 必须 | 函数:根据当前Section和Row，返回当前Cell的render
heightForCell | (section:number,row:number) => number | 必须 | 函数：根据Section和row index，返回当前Cell的高度
renderSection | (section:number) => React.Element | section=>null | 函数：当前Section的render函数
heightForSection | (section:number) => number | 0 | 函数：返回当前section的高度
renderHeader | () => React.Element | null | 函数：列表的头部组件render函数
renderFooter | () => React.Element | null | 函数：列表头部组件的render函数
bounces | boolean | true | 组件滑动到边缘是否可以继续滑动，松开后弹回
refreshable | boolean | true | 是否允许下拉刷新
onTopRefresh | () => any | ()=>{} | 下拉刷新的回调

方法：

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

方法 | 参数 | 返回 | 作用
--- | --- | --- | ---
reloadCells | indexPaths:IndexPathType[], animation:ReloadCellAnimationType | void | 重新加载一些Cell
reloadAll | void | void | 重新加载列表所有Cell
scrollTo | indexPath:IndexPathType | void | 滑动到指定的Cell（最终位置居中）

