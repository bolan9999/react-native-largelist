# 滑动

要使用代码滑动到指定位置，非常简单：

### 第一步，获取VerticalScrollView的引用
```$js
<VerticalScrollView ref={ref=>(this._scrollView = ref)} />
```

### 第二步，使用scrollTo方法
```$js
this._scrollView && this._scrollView.scrollTo({x:0,y:100});
```

scrollTo({x:number, y:number}, animated=true):Promise&lt;void>

滑动到指定的偏移，注意：

* x坐标目前没有任何效果

* 如果超出 VerticalScrollView的内容范围，将自动矫正到极端位置


# 监听滑动

### onScroll : ({x:number, y:number})=>any

```$js
<VerticalScrollView onScroll={({x:x,y:y})=>{
    console.log("offset : x=", x, "y=", y);
} />
```

注意：

* y值是有可能超出内容范围之外的
* 遮挡键盘的偏移处理当中，该函数不会回调
* 如果需要提高性能，使用原生动画驱动，则可以考虑使用下面的方法

### onTouchBegin : ()=>any
手指按下时回调
```$js
<VerticalScrollView onTouchBegin={()=>{
    console.log("onTouchBegin");
} />
```

### onTouchEnd : ()=>any
手指按下时回调
```$js
<VerticalScrollView onTouchEnd={()=>{
    console.log("onTouchEnd");
} />
```

### onMomentumScrollStart : ()=>any
手指按下时回调
```$js
<VerticalScrollView onMomentumScrollStart={()=>{
    console.log("onMomentumScrollStart");
} />
```

### onMomentumScrollEnd : ()=>any
手指按下时回调
```$js
<VerticalScrollView onMomentumScrollEnd={()=>{
    console.log("onMomentumScrollEnd");
} />
```

# 监听原生偏移值

### getNativeOffset : (offset: Animated.Value) => any

获得监听滑动偏移并支持原生动画的动画值（该值是合成值，不可监听，不可修改，只能用于原生动画，键盘遮挡的偏移动画不会触发此值更改）

```$js
<VerticalScrollView getNativeOffset={(offset=>{
    //可以将此offset做任何插值运算并应用到你的组件里面，这样将在原生动画中驱动动画
} />
```


