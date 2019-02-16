# 自定义下拉刷新

在我们自定义下拉刷新之前， 我们需要先了解一个下拉刷新各个状态：

* "waiting": 准备状态：视图还没有碰边
* "pulling": 下拉状态：视图已经碰到边缘，但是还没有达到组件的高度，此时松手不具备刷新的条件
* "pullingEnough": 下拉足够态：视图已经达到组件的高度，但是用户还没有松手，松手即可进入刷新态
* "pullingCancel": 下拉取消态: 当用户下拉经历过下拉足够态，但是又往上拉，达不到刷新的高度，则进入此状态，如果用户不松手，重新下拉可再次进入下拉足够态
* "refreshing": 刷新态：已经触发onRefresh，此时正在刷新中
* "rebound": 回弹态: 已经刷新完成，正在往回弹的状态

### 自定义

#### 导入
```$js
import { RefreshHeader } from "react-native-spring-scrollview/RefreshHeader";
```

#### 继承RefreshHeader
```$js
class MyHeader extends RefreshHeader{}
```

#### 重写render
```$js
render() {
  return <Text>{this.state.status}</Text>
}
```

RefreshHeader自带有两个Props, 和一个状态status，在子类里面可以直接使用

* this.props.maxHeight,类型是number， 表示刷新组件的高度
* this.props.offset，类型是Animated.Value 表示当前LargeList的contentOffset.y（原生动画值）
* this.state.status，类型是HeaderStatus: 表示当前刷新组件正处在的状态
```$js
export type HeaderStatus =
  | "waiting"
  | "pulling"
  | "pullingEnough"
  | "pullingCancel"
  | "refreshing"
  | "rebound";
```

#### 自定义刷新组件的高度

只需要重写静态变量height就可以改变该刷新组件的高度（**请注意这与V1有差别，V2取消了refreshHeaderHeight属性，V2更加注重刷新组件的独立性**）:
```
class MyHeader extends RefreshHeader{
    static height:number = 50;
}
```

#### 选择刷新组件的下拉样式

只需要重写静态变量style就可以改变刷新组件的样式,默认值是"stickyContent"：
```
class MyHeader extends RefreshHeader{
    static style:string = "stickyContent";
}
```

LargeList目前支持三种样式：

style  |  效果
---- | ------
"topping" | ![topping](../../res/RefreshingTopping.gif)
"stickyScrollView" | ![stickyScrollView](../../res/RefreshingStickyScrollView.gif)
"stickyContent" | ![stickyContent](../../res/RefreshingStickyContent.gif)

#### 将自定义的刷新组件应用到LargeList
```$js
<LargeList refreshHeader={MyHeader}/>
```

完整的示例可以查看[NormalHeader](https://github.com/bolan9999/react-native-spring-scrollview/blob/master/src/NormalHeader.js)

### 性能优化

#### 避免无用的状态改变带来的无用更新
你可以通过重写onStateChange(oldStatus: HeaderStatus, newStatus: HeaderStatus)来阻止不需要的状态更新带来的re-render

举个例子，如果你只需要区分正在刷新和没有刷新两种状态，那么你可以像下面这样优化它
```$js
onStateChange(oldStatus: HeaderStatus, newStatus: HeaderStatus) {
  if (oldStatus === "refreshing" || newStatus==="refreshing") {
    this.setState({status:newStatus});
  }
}
```

除此之外，刷新控件应当设计得足够简单（DOM节点数量不能太多，太多会造成卡顿）

#### 渐变动画

this.props.offset: 表示当前LargeList的contentOffset.y的原生动画值，， 你可以使用这个值来自定义你的动画：

举个例子，如果你有个箭头图标，希望在下拉过程中旋转角度，当到达刷新状态的时候，完全反转角度，那么你可以这样写

```$js
<Animated.Image
    source={require("./Customize/res/arrow.png")}
    style={{
    transform: [{
        rotate: offset.interpolate({
            inputRange: [-maxHeight - 1 - 10, -maxHeight - 10, -50, -49],
            outputRange: ["180deg", "180deg", "0deg", "0deg"]
        })
    }]
}}/>
```

完整的示例可以查看[NormalHeader](https://github.com/bolan9999/react-native-spring-scrollview/blob/master/src/NormalHeader.js)

### 贡献您的自定义下拉刷新组件

欢迎Fork react-native-spring-scrollview ，添加您精心制作的RefreshHeader， 提交Pull Request 合并到master，给其他人使用。

