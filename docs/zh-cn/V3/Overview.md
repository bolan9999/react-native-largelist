<!--
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:11:34
 * @LastEditTime: 2021-07-29 17:31:22
 * @LastEditors: 石破天惊
 * @Description: 
-->
# 概述

LargeList V3 依赖 `react-native-spring-scrollview@^3.0.2`, 支持SpringScrollView几乎所有的属性。

与SpringScrollView一样，LargeList必须有一个确定的高度才能正常工作，因为它实际上所做的就是将一系列Cell装进一个确定高度的容器（通过滚动操作）。LargeList默认具有{flex:1}的样式，因此要使LargeList正常工作，它的父容器必须是确定高度的，你也可以通过手动指定样式，使之正常工作。

### 基础属性列表

属性  |  类型  |  默认值  |  描述  
---- | ------ | --------- | --------
[...SpringScrollView](https://bolan9999.github.io/react-native-spring-scrollview/#/) | - | - | 支持SpringScrollView几乎所有属性
data | { items: any[] }[] | 必需 | 列表的数据源,外层数组表示吸顶Section的数量，内层的items数组表示每个Section下有多少个Items。
contentStyle | ViewStyle | { height } | LargeList的content view样式
heightForSection | (section: number) => number | ()=>0 | 返回列表每一组组头高度的函数
renderSection | (section: number) => React.ReactElement &lt;any> | ()=>null | 每一组组头的render函数
heightForIndexPath | (indexPath: IndexPath) => number | 必需 | 返回列表每一行高度的函数
renderIndexPath | (indexPath: IndexPath, mediaWrapperParam:Object) => React.ReactElement &lt;any> | 必需 | 每一行的render函数,mediaWrapperParam是用于大图片或视频优化选项。
renderHeader | ()=> React.ReactElement &lt;any> | undefined | 列表的头部组件函数
renderFooter | ()=> React.ReactElement &lt;any> | undefined | 列表的尾部组件函数
inverted | boolean | false | 翻转滚动方向，适配聊天App，查看示例 [ChatExample](https://github.com/bolan9999/react-native-largelist/tree/master/Examples/ChatExample.js) .

### 简单示例

```
<LargeList
    style={styles.container}
    data={data}
    heightForSection={() => 50}
    renderSection={this._renderSection}
    heightForIndexPath={() => 50}
    renderIndexPath={this._renderIndexPath}
/>
```

### 注意事项
* LargeList默认具有{flex:1}的样式，因此要使LargeList正常工作，它的父容器必须是确定高度的，你也可以通过手动指定样式，使之正常工作。
* 再3.1版本之后，`renderHeader`,`renderFooter`,`renderIndexPath`不再执行切片操作. `renderIndexPath`需要`{flex:1}`才能占满整个行
