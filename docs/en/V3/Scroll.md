<!--
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:11:34
 * @LastEditTime: 2021-07-29 18:50:37
 * @LastEditors: 石破天惊
 * @Description: 
-->
# Scroll to

It is easy to scrollTo:

### Firstly，get the reference of the LargeList的
```$js
<LargeList ref={ref=>(this._list = ref)} />
```

### Secondly, call `scrollTo`
```$js
this._list && this._list.scrollTo({x:0,y:100}).then().catch();
```
### Available scrolling methods
scrollTo({x:number, y:number}, animated:boolean=true):Promise&lt;void>

scrollToIndexPath({section:number, row:number}, animated: boolean = true):Promise&lt;void>

# onScroll listener on Javascript

### onScroll : ({nativeEvent:{contentOffset:{x:number, y:number}}})=>any

```$js
<LargeList onScroll={({nativeEvent:{contentOffset:{x, y}}})=>{
    console.log("offset : x=", x, "y=", y);
}/>
```

注意：

**Precautions：**

* The `contentOffset` can be able to out of content view range.
* As the `onScroll` on the official React Native, you can use `Animated.createAnimatedComponent` to support `useNativeDriver`. Or you can use `onNativeContentOffsetExtract` .
* It supports `react-native-reanimated`.

# Native onScroll listener

### onNativeContentOffsetExtract : {x?&#58;Animated.Value, y?&#58;Animated.Value}

Example:

```$js
_nativeOffset = {
    y: new Animated.Value(0)
};

render(){
    return <LargeList onNativeContentOffsetExtract={this._nativeOffset} />
}

```






