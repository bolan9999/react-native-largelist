<!--
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:11:34
 * @LastEditTime: 2021-07-28 16:46:54
 * @LastEditors: 石破天惊
 * @Description: 
-->
# **React Native Large List V3**
**React Native Large List V3** 是原生桥接实现的一组高性能弹性大列表组件（iOS & Android）。组件内容高度重用，极大地优化了列表性能。

### 功能特性

* 支持超大数据源，高度重用，极大地优化了性能，滑动更跟手，完全可以媲美原生列表。CPU和内存占用比官方的SectionList明显少很多。
* 跨平台（iOS & Android）的弹性列表，安卓端拥有真正的拖拽感，用户体验更好。（V3解决了V2在某些暴力情况下无法回弹到正确位置的问题）
* 高度自定义的高性能下拉刷新和上拉加载的支持（根本上解决了在某些暴力情况下，由于react-native本身bug偶尔无法回调onRefresh或者onLoading的情况) 全力支持`react-native-lottie`，支持更顺滑地控制动画进度。
* 头部和尾部组件支持
* 支持原生监听滚动，支持高性能滑动动画
* 粘性组头支持
* 支持inverted，适配聊天App
* 永不白板
* 支持pagingEnabled (<font color=red>新特性</font>)
* 大图片大视频优化方案 (<font color=red>新特性</font>)

### V3.1更新
* 优化了SpringScrollView在安卓上的流畅性
* 支持pagingEnabled
* 提供一种解决大图片大视频列表的优化方案
* 支持主动刷新beginRefresh
* `renderHeader`,`renderFooter`,`renderIndexPath`不再执行切片操作.

### LargeList

All the features below are supported on both iOS and Android.

##### Sticky section support

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![StickySection](../res/StickySection.gif)

##### Fully Cross-platform bounces (iOS & Android).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![bounces](../res/bounces.gif)

##### Customize refreshing (Support `lottie-react-native` progress with `useNativeDriver`)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![CustomizeRefreshing](../res/CustomizeRefreshing.gif)

##### Customize loading (Support `lottie-react-native` progress with `useNativeDriver`)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![CustomizeLoading](../res/CustomizeLoading.gif)

##### Slide on both horizontal and vertical directions.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![BothDirections](../res/BothDirections.gif)

##### Sticky header support.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![StickyHeader](../res/StickyHeader.gif)

##### directionalLockEnabled

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![directionalLockEnabled](../res/directionalLockEnabled.gif)

##### Support `inverted`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![inverted](../res/inverted.gif)

##### Drag to scale header background: renderScaleHeaderBackground

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![renderScaleHeaderBackground](../res/renderScaleHeaderBackground.gif)

### WaterfallList

##### Complex situation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![WaterfallExample](../res/WaterfallExample.png)

##### preferColumnWidth

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![preferColumnWidth](../res/preferColumnWidth.gif)

##### numColumns

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![numColumns](../res/numColumns.gif)

### StickyForm

##### example

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![StickyFormExample](../res/StickyFormExample.gif)
