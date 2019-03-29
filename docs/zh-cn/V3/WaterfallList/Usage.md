# Usage

Props  |  Type  |  Default  |  Description  
---- | ------ | --------- | --------
[...SpringScrollView](https://bolan9999.github.io/react-native-spring-scrollview/#/) | - | - | 支持几乎所有SpringScrollView的属性（包含自定义刷新及自定义加载）。
data | any[] | required | 数据源，数组的个数决定了Item的数量
heightForItem | (item:any,index:number)=> number | 必需 | 一个高度函数，用以返回每个Item的高度
renderItem | (item:any,index:number)=> React.ReactElement&lt;any> | 必需 | 每个Item的render函数
preferColumnWidth | number | undefined | 每个Item的理想宽度， 它会影响实际列数，实际列数等于WaterfallList除以理想宽度向下取整，实际宽度是组件宽度除以实际列数（目前只支持等宽的Item）.(`preferColumnWidth` 和 `numColumns` 至少需要指定一个. )
numColumns | number | undefined | 固定列数. (`preferColumnWidth` 和 `numColumns` 至少需要指定一个. )
renderHeader | ()=> React.ReactElement &lt;any> | undefined | 头部组件函数
renderFooter | ()=> React.ReactElement &lt;any> | undefined | 尾部组件函数

