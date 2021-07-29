<!--
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:11:34
 * @LastEditTime: 2021-07-28 17:02:31
 * @LastEditors: 石破天惊
 * @Description: 
-->
# 滑动

要使用代码滑动到指定位置，非常简单：

### 第一步，获取LargeList的引用
```$js
<LargeList ref={ref=>(this._list = ref)} />
```

### 第二步，使用scrollTo方法
```$js
this._list && this._list.scrollTo({x:0,y:100}).then().catch();
```
### 可用滑动方法
scrollTo({x:number, y:number}, animated:boolean=true):Promise&lt;void>

滑动到指定的偏移

scrollToIndexPath({section:number, row:number}, animated: boolean = true):Promise&lt;void>

滑动到指定的IndexPath，如果row===-1，则表示滑动到相应的组头
# Javascript端监听滑动

### onScroll : ({nativeEvent:{contentOffset:{x:number, y:number}}})=>any

```$js
<LargeList onScroll={({nativeEvent:{contentOffset:{x, y}}})=>{
    console.log("offset : x=", x, "y=", y);
}/>
```

注意：

* y值是有可能超出内容范围之外的
* 不要使用Animated.createAnimatedComponent，LargeList本身支持所有的Animated.View的属性，如果需要高性能的监听偏移，请使用下面的原生动画驱动

# 监听原生偏移值

### onNativeContentOffsetExtract : {x?&#58;Animated.Value, y?&#58;Animated.Value}

使用原生动画值监听滑动偏移，可以用作插值动画

```$js
_nativeOffset = {
    y: new Animated.Value(0)
};

render(){
    return <LargeList onNativeContentOffsetExtract={this._nativeOffset} />
}

```






