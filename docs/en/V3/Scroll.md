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

<!--scroll({x:number, y:number}, animated:boolean=true):Promise&lt;void>-->

<!--在当前位置上滑动指定的偏移，请注意scroll参数是偏移值，scrollTo是目标值-->

<!--scrollToBegin(animated:boolean=true):Promise&lt;void>-->

<!--滑动到{x:0,y:0}的位置-->

<!--scrollToEnd(animated: boolean = true):Promise&lt;void>-->

<!--滑动到最右下角位置-->


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
* Do not use `Animated.createAnimatedComponent`，LargeList supports all Animated.View styles, if you want  to make a native interpolate animation, use `onNativeContentOffsetExtract` please.

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






