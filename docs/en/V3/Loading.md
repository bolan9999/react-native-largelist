# Loading

### Preview
![Preview](../../res/LoadingStickyContent.gif)

### Code

Import

```$js
import { LargeList } from "react-native-largelist-v3";
import { ChineseWithLastDateFooter } from "react-native-spring-scrollview/Customize";
```

It is easy to support loading more data with LargeList. React-native-spring-scrollview offers a `NormalFooter` for you. And you can try other loading footers in the [Customize](https://github.com/bolan9999/react-native-spring-scrollview/tree/master/src/Customize) dir.

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


### Props

Props  |  Type  |  Default  |  Description  
---- | ------ | --------- | --------
onLoading | ()=>any | undefined | The callback of loading. If set this prop, a loading footer will add to the botom of the LargeList
allLoaded | boolean | false | Whether the data is all loaded.
loadingFooter | LoadingFooter | NormalFooter | The footer component of loading. If you want to customize loading footer , this will be helpful [Custom Loading](/en/V3/CustomLoading)

### All loading footers in this library

```
import {NormalFooter} from "react-native-spring-scrollview/NormalFooter";
import {
    WithLastDateFooter,
    ChineseNormalFooter,
    ChineseWithLastDateFooter,
} from "react-native-spring-scrollview/Customize";
```
