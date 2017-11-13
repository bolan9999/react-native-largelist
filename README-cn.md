# STTVTableView

For English readme.md [click here](https://github.com/bolan9999/STTVTableView/blob/master/README.md)

**STTVTableView** 是一个原生封装的高性能的React Native列表组件(目前仅支持iOS。Android将在正式版V1.0.0支持).

## 特点
* 使用原生UITableView桥接，高度重用，总View数量只比必须要显示的当前数量多一点，
* 内存及CPU占用明显低于官方SectionList,
* 支持超快速度滑动，支持快速到顶，不会出现空白及Section停在中间的问题
* API简单明了，参数有明显的类型声明，无需帮助文档即可快速入手
* 支持超大列表，理论上Cell的数量多少对性能几乎无影响
* 支持更新

## 预览
![Preview](https://github.com/bolan9999/STTVTableView/raw/master/readme_resources/example.gif)

## 接入步骤

iOS:

* 确认您的项目是React Native项目
* 使用下面的命令安装:

```
npm add sttv-tableview
```
* 确保您的项目设置: Project(or Target) --> build setting -->Other Link Flags 包含 '-ObjC'.
* 将 " ${ProjectPath}/node_modules/sttv-tableview/ios/STTVTableView.xcodeproj " 拖入您的iOS项目并保证STTVTableView.framework链接到您的项目.
* 像下面这样使用它:

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
renderHeader | () => React.Element | null | 函数：列表的头部组件的render函数
renderFooter | () => React.Element | null | 函数：列表的尾部组件的render函数
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

## 已知问题
* 当滑动速度非常快的时候，立即旋转屏幕，会出现短暂的Cell白板 （已有方案解决）
* 当每个Cell的高度严重不一样的时候，超出js渲染速度时，会模糊地看到cell里面元素超出现象，速度放慢后立马可以恢复
* 目前暂时不支持更改props，改变STTVTableView，请更改数据源，并使用reloadAll的方法
* 下拉刷新使用苹果原生的组件，目前问题较多，正考虑使用三方组件

## 目标计划
* 增加Android支持
* 优化下拉刷新
* 优化快速滑动时旋转屏幕出现短暂白板Cell的问题
* 增加Cell左右滑动显示额外View的功能
