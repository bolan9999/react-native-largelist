<!--
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:11:34
 * @LastEditTime: 2021-07-29 18:32:40
 * @LastEditors: 石破天惊
 * @Description: 
-->
# Overview

LargeList V3 depends on `react-native-spring-scrollview@^2.0.3`, and supports almost all props in SpringScrollView.

As the same as SpringScrollView，LargeList must have a bounded height in order to work, since they contain many cells children into a bounded container (via a scroll interaction). In order to bound the height of a LargeList, either set the height of the view directly (discouraged) or make sure all parent views have bounded height. LargeList default has a `{flex:1}` style，please be sure its parent has a bounded height. Note that in order to optimize performance, the height of each item and each section must be given.

### Basic Props

Props  |  Type  |  Default  |  Description  
---- | ------ | --------- | --------
[...SpringScrollView](https://bolan9999.github.io/react-native-spring-scrollview/#/) | - | - | Support almost all props in SpringScrollView
data | { items: any[] }[] | required | The data source of the large list. The outer array is the number of sections. And the inner array:`items` is the items of the section.
contentStyle | ViewStyle | { height } | The content view style of LargeList.
heightForSection | (section: number) => number | ()=>0 | The height function for every Section
renderSection | (section: number) => React.ReactElement &lt;any> | ()=>null | The render function for every Section
heightForIndexPath | (indexPath: IndexPath) => number | required | The height function for every IndexPath
renderIndexPath | (indexPath: IndexPath) => React.ReactElement &lt;any, , mediaWrapperParam:Object> | required | The render function for every IndexPath, mediaWrapperParam is the parameter of big pic/video optimization. View [Big picture or Video optimization](./BigMedia)
renderHeader | ()=> React.ReactElement &lt;any> | undefined | The render function of largelist header
renderFooter | ()=> React.ReactElement &lt;any> | undefined | The render function of largelist footer
inverted | boolean | false | Inverted the data source, see [ChatExample](https://github.com/bolan9999/react-native-largelist/tree/master/Examples/LargeListExamples/ChatExample.js) for example.
directionalLockEnabled | boolean | false | When true, the SpringScrollView will try to lock to only vertical or horizontal scrolling while dragging.
headerStickyEnabled | boolean | false | Sticky the header of the LargeList on the top. And then sticky Section on the bottom of the header.
renderScaleHeaderBackground | ()=> React.ReactElement &lt;any> | undefined | Render the scale header background when dragging. See [HeightEqualExample](https://github.com/bolan9999/react-native-largelist/tree/master/Examples/LargeListExamples/HeightEqualExample.js)

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
* After V3, LargeList will no longer slice on `renderHeader`,`renderFooter`,`renderIndexPath`. `{flex:1}` is required in `renderIndexPath`.

