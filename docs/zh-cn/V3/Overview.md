# 概述

LargeList V3 依赖 `react-native-spring-scrollview@^2.0.3`, 支持SpringScrollView几乎所有的属性。

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
renderIndexPath | (indexPath: IndexPath) => React.ReactElement &lt;any> | 必需 | 每一行的render函数
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
* 在V3中，为了最大化优化性能，减少DOM节点数量, `renderIndexPath`、 `renderHeader` 、 `renderFooter` 的直系节点在内部都进行了切片重新装配操作，会增加一些style和onLayout属性进入您的直系节点。所以不要直接返回`Text`,`TextInput`,`Switch`等这类宽高样式不符合CSS规范的组件，推荐使用`View`或`TouchableOpacity`等组件包装一层。还有就是，他们本身已经具备正确的样式，不再建议使用`flex：1`。虽然您使用了也不会有什么问题。而`renderSection` 由于没有切片重新装配，则必须拥有`flex:1`样式，不然可能无法占满整个组头。
```
renderIndexPath = ({ section, row }) => (
    return <View><Text>{...}</Text></View>
)
```
* 如果你的Item在垂直方向上有margin， 你也应该是对外层进行一下包装：
```
renderIndexPath = ({ section, row }) => (
    return <View>
        <TouchableOpacity style={{margin:10}}>
            {...}
        </TouchableOpacity>
    </View>
)
```


* 如果你返回的是一个自定义的节点，请务必把直系节点的style传到一个真实的原生节点上. 
```
const CustomizedComponent = (props) => <TouchableHighlight style={StyleSheet.flatten([this.props.style,{your customized style}])} {...other props}>{some info...}</TouchableHighlight>;
...
renderIndexPath = ({ section, row }) => (
  <CustomizedComponent />
)
```

更多信息可查看 [这个问题](https://github.com/bolan9999/react-native-largelist/issues/260) 
