# Pull to refresh

### Preview
![Preview](../../res/RefreshingStickyContent.gif)

### Import

```$js
import { LargeList } from "react-native-largelist-v3";
import { ChineseWithLastDateHeader } from "react-native-spring-scrollview/Customize";
```

It is easy to support pulling to refresh with LargeList. React-native-spring-scrollview offers a `NormalHeader` for you. And you can try other refresh headers in the [Customize](https://github.com/bolan9999/react-native-spring-scrollview/tree/master/src/Customize) dir.

### Simple Example

```$js
<LargeList
  ref={ref => (this._list = ref)}
  refreshHeader={ChineseWithLastDateHeader}
  onRefresh={()=>{
    setTimeOut(()=>{
      this._list.endRefresh();
      setTimeOut(()=>this.setState({prop:"your changed props"}));
    },2000);
  }
  //...other props
/>
```

Props  |  Type  |  Default  |  description  
---- | ------ | --------- | --------
onRefresh | ()=>any | undefined | The callback when refreshing. When this props is configured, a refresh header will be add on the top of the LargeList
refreshHeader | [RefreshHeader](https://github.com/bolan9999/react-native-spring-scrollview/blob/master/src/RefreshHeader.js) | NormalHeader | Select a refreshing header , The headers in the [Customize](https://github.com/bolan9999/react-native-spring-scrollview/tree/master/src/Customize) dir are all supported

**Precautions:** refreshHeaderHeight is not supported after V3. If you want to customize the height of the refreshing header. View [Customize the refreshing header height](en/V3/CustomRefresh?id=自定义刷新组件的高度) below [custom refreshing](en/V3/CustomRefresh) please.


### Methods

### endRefresh()

End the refreshing status.

### All refreshing headers in this library

react-native-spring-scrollview提供了一些刷新控件, 用户可以试试
```
import {NormalRefresh} from "react-native-spring-scrollview/NormalRefresh";
import {
    WithLastDateHeader,
    ChineseNormalHeader,
    ChineseWithLastDateHeader,
} from "react-native-spring-scrollview/Customize";
```
