<!--
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-28 17:20:21
 * @LastEditTime: 2021-07-29 18:56:00
 * @LastEditors: 石破天惊
 * @Description: 
-->

# Big Picture or View Optimization

<!-- 当使用LargeList时，由于大图片或者视频更新较慢，就会出现旧的图片变成新的图片的过程，本节讲解如何添加一个Loading图片覆盖在上面，让用户无法看到还没更新的旧图片.

请注意：这种优化只能在等高或者大致一致时才完美，如果图片大小不一，这种优化也会看到Loading图标有些错乱的情况。具体取决于您的图片大小差异到底有多大。

只需要在`renderIndexPath`上让你的大图片包含在`MediaWrapper`即可： -->
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
Props：

Props  |  Type  |  Default  | Description  
---- | ------ | --------- | --------
mediaWrapperParam | Object | required | Pass the 2nd parameter of the `renderIndexPath`to `MediaWrapper`。
renderLoading | ()=> React.ReactElement &lt;any> | required | Render Element of the Loading indicator.
loadEndFunc | string | required | The complete function name of the Media. For example：`Image from react-native` => `onLoadEnd`， `Video from react-native-video` => `onLoad`

MediaWrapper's Children must be only one.


完整的示例： [BigMediaExample](https://github.com/bolan9999/react-native-largelist/tree/master/Examples/LargeListExamples/BigMediaExample.js)