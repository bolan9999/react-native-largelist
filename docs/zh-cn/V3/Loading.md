# 上拉加载

### 预览
![Preview](../../res/LoadingStickyContent.gif)

### 代码

导入

```$js
import { LargeList } from "react-native-largelist-v3";
import { ChineseWithLastDateFooter } from "react-native-spring-scrollview/Customize";
```

使用LargeList可以非常简单地实现上拉加载的功能, react-native-spring-scrollview默认提供了一个NormalFooter类供用户使用,中文用户推荐使用Customize目录下的ChineseWithLastDateFooter

```$js
<LargeList
  ref={ref => (this._list = ref)}
  loadingFooter={ChineseWithLastDateFooter}
  allLoaded={this.state.allLoaded}
  onLoading={()=>{
    setTimeOut(()=>{
      this._list.endLoading();
      this.setState({...});
    },2000);
  }
  //...
/>
```


### 属性

属性  |  类型  |  默认值  |  作用  
---- | ------ | --------- | --------
onLoading | ()=>any | undefined | 上拉加载的回调函数
allLoaded | boolean | false | 数据是否加载完成。
loadingFooter | LoadingFooter | NormalFooter | 上拉加载组件，用户如果不希望自定义，则可以使用NormalFooter,如果需要高度自定义，请参看[自定义上拉加载](CustomLoading)

### 本库提供的额外加载控件
本库提供了一些加载控件, 用户可以试试
```
import {NormalFooter} from "react-native-spring-scrollview/NormalFooter";
import {
    WithLastDateFooter,
    ChineseNormalFooter,
    ChineseWithLastDateFooter,
} from "react-native-spring-scrollview/Customize";
```
