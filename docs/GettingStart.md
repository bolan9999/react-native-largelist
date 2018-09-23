# Getting Started

This library offers two components: NativeLargeList depends on [ScrollView](http://facebook.github.io/react-native/docs/scrollview) and it does not need to install any other library. And LargeList depends on [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler),  and you should install it first if you want to use LargeList.

### 1. Install[react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler) and [react-native-spring-scrollview](https://github.com/bolan9999/react-native-spring-scrollview) (optional)
If you use NativeLargeList only(no LargeList), you can skip this step.

Install code:
```$node
yarn add react-native-gesture-handler react-native-spring-scrollview
react-native link react-native-gesture-handler
```
Wrapper your Screen Component like this:
```$js
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

class YourScreen extends React.Component{
    //...
};

export const YourScreenWrapper = gestureHandlerRootHOC(YourScreen);
```
Use `YourScreenWrapper` instead of `YourScreen` in any places.

[react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler)has been successfully installed.

### 2. Install [react-native-largelist](https://github.com/bolan9999/react-native-largelist)

Use this npm command to install react-native-largelist v2.

```$node
yarn add react-native-largelist-v2
```



