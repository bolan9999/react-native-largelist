# react-native-largelist

**React-native-largelist** is a very high performance large list component for React-Native. (iOS & Android) Now V3 is available. V1 is [here](https://github.com/bolan9999/react-native-largelist/tree/V1)

## Features

* Large data source list component, items reused by group, Less CPU/Memory usage. Never blanks.
* Fully Cross-platform bounces (iOS & Android).
* Highly customize Refreshing and Loading. Fully support `react-native-lottie`. More smoothly animation.

## Preview
![Preview](./docs/res/LottieRefreshing.gif)
![Preview](./docs/res/LottieLoading.gif)
![WaterfallExample](./docs/res/WaterfallExample.gif)
![PictureExample](./docs/res/PictureExample.gif)

## Documentation

API reference and more:  [Documentation Reference](https://bolan9999.github.io/react-native-largelist/)

## Running Examples

1. Git clone from github
```
git clone git@github.com:bolan9999/react-native-largelist.git
```

2. Install dependence and start.

```
yarn install
yarn start
```

3. Modify iOS bundle source location in `AppDelegate.m`

4. Change Android bundle source location in "Dev Setting"

5. If you build it in XCode and get this error:
```
'React/RCTBridgeModule.h' file not found
```
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you can resolve it by this [topic](https://github.com/facebook/react-native/issues/22000#issuecomment-438201084)

6. Running

### LargeList

All the features below are supported on both iOS and Android.

* Items reused. Never blank.

* Sticky section support

![StickySection](./docs/res/StickySection.gif)

* Fully Cross-platform bounces (iOS & Android).

![bounces](./docs/res/bounces.gif)

* Customize refreshing (Support `lottie-react-native` progress with `useNativeDriver`)

![CustomizeRefreshing](./docs/res/CustomizeRefreshing.gif)

* Customize loading (Support `lottie-react-native` progress with `useNativeDriver`)

![CustomizeLoading](./docs/res/CustomizeLoading.gif)

* Slide on both horizontal and vertical directions.

![BothDirections](./docs/res/BothDirections.gif)

* Sticky header support.

![StickyHeader](./docs/res/StickyHeader.gif)

* directionalLockEnabled

![directionalLockEnabled](./docs/res/directionalLockEnabled.gif)

* Support `inverted`

![inverted](./docs/res/inverted.gif)

### WaterfallList

* Complex situation

![WaterfallExample](./docs/res/WaterfallExample.png)

* preferColumnWidth

![preferColumnWidth](./docs/res/preferColumnWidth.gif)

* numColumns

![numColumns](./docs/res/numColumns.gif)

### StickyForm

* example

![StickyFormExample](./docs/res/StickyFormExample.gif)


## License

react-native-largelist is released under the MIT license. See LICENSE for details.

