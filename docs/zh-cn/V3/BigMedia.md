<!--
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-28 17:20:21
 * @LastEditTime: 2021-07-29 18:11:44
 * @LastEditors: 石破天惊
 * @Description: 
-->

# 大图片视频列表优化

当使用LargeList时，由于大图片或者视频更新较慢，就会出现旧的图片变成新的图片的过程，本节讲解如何添加一个Loading图片覆盖在上面，让用户无法看到还没更新的旧图片.

请注意：这种优化只能在等高或者大致一致时才完美，如果图片大小不一，这种优化也会看到Loading图标有些错乱的情况。具体取决于您的图片大小差异到底有多大。

只需要在`renderIndexPath`上让你的大图片包含在`MediaWrapper`即可：
```
renderIndexPath = (indexPath, mediaWrapperParam)=>{
    return <View>
        <MediaWrapper
            mediaWrapperParam={mediaWrapperParam}
            renderLoading={() => (<ImageBackground source={require("./icons/loading.gif")} />)}
            loadEndFunc="onLoadEnd">
                <Image ...>
        </MediaWrapper>
    </View>
}
```
属性说明：

属性  |  类型  |  默认值  |  描述  
---- | ------ | --------- | --------
mediaWrapperParam | Object | 必须 ｜ 将renderIndexPath的第二个参数传给MediaWrapper即可。
renderLoading | ()=> React.ReactElement &lt;any> | 必须 | 函数，用以挡住图片或视频的Loading图标
loadEndFunc | string | 必须 | MediaWrapper的子元素可以是`Image`,也可以是`Video`, 但是你需要指定其加载完成的函数名称，这样才能在加载完成时关闭Loading遮挡。常用的有：`Image from react-native` => `onLoadEnd`， `Video from react-native-video` => `onLoad`


完整的示例： [BigMediaExample](https://github.com/bolan9999/react-native-largelist/tree/master/Examples/LargeListExamples/BigMediaExample.js)