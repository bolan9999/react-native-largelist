# Overview

LargeList V3 depends on `react-native-spring-scrollview@^2.0.3`, and supports almost all props in SpringScrollView.

As the same as SpringScrollView，LargeList must have a bounded height in order to work, since they contain many cells children into a bounded container (via a scroll interaction). In order to bound the height of a LargeList, either set the height of the view directly (discouraged) or make sure all parent views have bounded height. LargeList default has a `{flex:1}` style，please be sure its parent has a bounded height.

### Basic Props

Props  |  Type  |  Default  |  Description  
---- | ------ | --------- | --------
[...SpringScrollView](https://bolan9999.github.io/react-native-spring-scrollview/#/) | - | - | Support almost all props in SpringScrollView
data | { items: any[] }[] | required | The data source of the large list.
contentStyle | ViewStyle | { height } | The content view style of LargeList.
heightForSection | (section: number) => number | ()=>0 | The height function for every Section
renderSection | (section: number) => React.ReactElement &lt;any> | ()=>null | The render function for every Section
heightForIndexPath | (indexPath: IndexPath) => number | required | The height function for every IndexPath
renderIndexPath | (indexPath: IndexPath) => React.ReactElement &lt;any> | required | The render function for every IndexPath
renderHeader | ()=> React.ReactElement &lt;any> | undefined | The render function of largelist header
renderFooter | ()=> React.ReactElement &lt;any> | undefined | The render function of largelist footer
inverted | boolean | false | Inverted the data source, see [ChatExample](https://github.com/bolan9999/react-native-largelist/tree/master/Examples/ChatExample.js) for example.

### Simple Usage

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

### Precautions
* LargeList default has a `{flex:1}` style，please be sure its parent has abounded height.
<!--* 在V3中，为了最大化优化性能，减少DOM节点数量, `renderIndexPath`、 `renderHeader` 、 `renderFooter` 的直系节点在内部都进行了切片重新装配操作，所以不要直接返回`Text`,`TextInput`,`Switch`等这类宽高样式不符合CSS规范的组件，推荐使用`View`或`TouchableOpacity`等组件包装一层。还有就是，他们本身已经具备正确的样式，不再建议使用`flex：1`。虽然您使用了也不会有什么问题。而`renderSection` 由于没有切片重新装配，则必须拥有`flex:1`样式，不然可能无法占满整个组头。-->
