<!--
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:11:34
 * @LastEditTime: 2021-07-29 18:57:01
 * @LastEditors: 石破天惊
 * @Description: 
-->
# All supported props

Props  |  Type  |  Default  |  Description  
---- | ------ | --------- | --------
[...Animated.View](http://facebook.github.io/react-native/docs/view) | - | - | Support all props of View
bounces | boolean | true | Bounces if the content offset is out of the content view. It won't be bounces on the horizontal direction if the content view is not wider than the wrapper view although bounces is true. But it will on the vertical direction.
scrollEnabled | boolean | true | scrollEnabled
contentStyle | ViewStyle | { height } | The content view style of LargeList.
initialContentOffset | {x:number, y:number} | {x:0,y:0} | initial content offset. Only works when initiation.
showsVerticalScrollIndicator | boolean | true | showsVerticalScrollIndicator
showsHorizontalScrollIndicator | boolean | true | showsHorizontalScrollIndicator（Only works when content view is wider than wrapper view）
directionalLockEnabled | boolean | false | When true, the SpringScrollView will try to lock to only vertical or horizontal scrolling while dragging.
headerStickyEnabled | boolean | false | Sticky the header of the LargeList on the top. And then sticky Section on the bottom of the header.
tapToHideKeyboard | boolean | true | tapToHideKeyboard
data | { items: any[] }[] | required | The data source of largelist
heightForSection | (section: number) => number | ()=>0 | The height function for every Section
renderSection | (section: number) => React.ReactElement &lt;any> | ()=>null | The render function for every Section
heightForIndexPath | (indexPath: IndexPath) => number | required | The height function for every IndexPath
renderIndexPath | (indexPath: IndexPath) => React.ReactElement &lt;any, , mediaWrapperParam:Object> | required | The render function for every IndexPath, mediaWrapperParam is the parameter of big pic/video optimization. View [Big picture or Video optimization](./BigMedia)
renderHeader | ()=> React.ReactElement &lt;any> | undefined | The render function of largelist header
renderFooter | ()=> React.ReactElement &lt;any> | undefined | The render function of largelist footer
inverted | boolean | false | Inverted the data source, see [ChatExample](https://github.com/bolan9999/react-native-largelist/tree/master/Examples/LargeListExamples/ChatExample.js) for example.
onRefresh | ()=>any | undefined | The callback when refreshing. When this props is configured, a refresh header will be add on the top of the LargeList
refreshHeader | [RefreshHeader](https://github.com/bolan9999/react-native-spring-scrollview/blob/master/src/RefreshHeader.js) | NormalHeader | Select a refreshing header , The headers in the Customize dir are all supported
onLoading | ()=>any | undefined | The callback of loading. If set this prop, a loading footer will add to the bottom of the LargeLIst
allLoaded | boolean | false | Whether the data is all loaded.
loadingFooter | [LoadingFooter](https://github.com/bolan9999/react-native-spring-scrollview/blob/master/src/LoadingFooter.js) | NormalFooter | The footer component of loading. If you want to customize loading footer , this will be helpful [Customize Loading] (CustomLoading)
onScroll | ({nativeEvent:{contentOffset:{x, y}}})=>any | undefined | onScroll（on JavaScript）
onNativeContentOffsetExtract | {x?:Animated.Value, y?:Animated.Value} | undefined | Native Animated.View of contentOffset.y of LargeList.
onTouchBegin | ()=>any | undefined | callback when touching begin.
onTouchEnd | ()=>any | undefined | callback when touching end.
onMomentumScrollBegin | ()=>any | undefined | callback when momentum scroll begin.
onMomentumScrollEnd | ()=>any | undefined | callback when momentum scroll end.
textInputRefs | TextInput[] | [] | Keyboard avoiding
tapToHideKeyboard | boolean | true | Tap to hide keyboard.
inputToolBarHeight | number | 44 | inputToolBarHeight
