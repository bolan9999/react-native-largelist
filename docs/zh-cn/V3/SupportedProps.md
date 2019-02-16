# 所有支持属性列表

属性  |  类型  |  默认值  |  描述  
---- | ------ | --------- | --------
[...Animated.View](http://facebook.github.io/react-native/docs/view) | - | - | 支持有View的属性
bounces | boolean | true | 滑动超出内容视图后是否可以弹性地继续滑动(iOS & Android，如果为true，水平方向内容视图如果没有超过SpringScrollView则不会有弹性，垂直方向始终具有弹性）
scrollEnabled | boolean | true | 是否可以滚动
initialContentOffset | {x:number, y:number} | {x:0,y:0} | 初始化偏移，仅第一次初始化有效，后期更改无效（已支持x方向）
showsVerticalScrollIndicator | boolean | true | 显示垂直滚动指示器
showsHorizontalScrollIndicator | boolean | true | 显示水平滚动指示器（内容视图超出LargeList视口才有用）
tapToHideKeyboard | boolean | true | 点击LargeList是否收起键盘
data | { items: any[] }[] | 必需 | 列表的数据源
heightForSection | (section: number) => number | ()=>0 | 返回列表每一组组头高度的函数
renderSection | (section: number) => React.ReactElement &lt;any> | ()=>null | 每一组组头的render函数
heightForIndexPath | (indexPath: IndexPath) => number | 必需 | 返回列表每一行高度的函数
renderIndexPath | (indexPath: IndexPath) => React.ReactElement &lt;any> | 必需 | 每一行的render函数
renderHeader | ()=> React.ReactElement &lt;any> | undefined | 列表的头部组件函数
renderFooter | ()=> React.ReactElement &lt;any> | undefined | 列表的尾部组件函数
onRefresh | ()=>any | undefined | 下拉刷新的回调函数,如果设置了此属性，则会在顶部加一个刷新Header
refreshHeader | [RefreshHeader](https://github.com/bolan9999/react-native-spring-scrollview/blob/master/src/RefreshHeader.js) | NormalHeader | 选择下拉刷新的组件，用户如果不希望高度自定义，则可以不设定直接使用NormalHeader,如果需要高度自定义，请参看[自定义下拉刷新](zh-cn/V3/CustomRefresh)
onLoading | ()=>any | undefined | 上拉加载的回调函数,如果设置了此属性，则会在底部加一个加载组件
allLoaded | boolean | false | 数据是否加载完成。
loadingFooter | [LoadingFooter](https://github.com/bolan9999/react-native-spring-scrollview/blob/master/src/LoadingFooter.js) | NormalFooter | 上拉加载组件，用户如果不希望自定义，则可以使用NormalFooter,如果需要高度自定义，请参看[自定义上拉加载](CustomLoading)
onScroll | ({nativeEvent:{contentOffset:{x, y}}})=>any | undefined | 监听列表滑动（JavaScript端）
onNativeContentOffsetExtract | {x?:Animated.Value, y?:Animated.Value} | undefined | 使用原生动画值监听滑动偏移，可以用作插值动画
onTouchBegin | ()=>any | undefined | 手指按下时回调
onTouchEnd | ()=>any | undefined | 手指抬起时回调
onMomentumScrollBegin | ()=>any | undefined | 松手后减速开始的回调
onMomentumScrollEnd | ()=>any | undefined | 减速结束回调
textInputRefs | TextInput[] | [] | 将TextInput的引用传入，让SpringScrollView自动管理键盘遮挡问题。
tapToHideKeyboard | boolean | true | 触摸屏幕时是否隐藏键盘
inputToolBarHeight | number | 44 | 不同的系统，不同的三方输入法，键盘的工具栏高度是不确定的，并且官方没有给出获取工具栏高度的办法，这个属性用以给用户小幅调整键盘弹起时，组件偏移的位置
