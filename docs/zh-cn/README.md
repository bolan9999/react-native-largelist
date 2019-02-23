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
* 永不白板，性能在百元安卓机（500元红米）暴力测试通过。

### 预览
![Refreshing](../res/LottieRefreshing.gif)
![Loading](../res/LottieLoading.gif)
![WaterfallExample](../res/WaterfallExample.gif)
![PictureExample](../res/PictureExample.gif)
