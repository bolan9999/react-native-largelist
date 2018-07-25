# Getting Started

This component depend on [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler), read [react-native-gesture-handler docs](https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html#installation) and install it first.

### Install [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler)
Npm command Line：
```$node
yarn add react-native-gesture-handler
react-native link react-native-gesture-handler
```

#### Scene 1
If you do not use 'native-navigation' or 'react-native-navigation' as your navigation framework, following this:

```$java
package com.swmansion.gesturehandler.react.example;

import com.facebook.react.ReactActivity;
// Add these
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
// ============

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

// Add these
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
// =============
}
```
Nothing to do on iOS.

#### Scene 2
If you use 'native-navigation' or 'react-native-navigation'，following this:

```$js
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Navigation } from 'react-native-navigation';
import YourScreen from './YourScreen';

export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () =>
    gestureHandlerRootHOC(YourScreen));
}
```

OK，[react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler)has been successfully installed。

### Install [react-native-largelist](https://github.com/bolan9999/react-native-largelist)

Use this npm command to install react-native-largelist

```$node
yarn add react-native-largelist-v2
```



