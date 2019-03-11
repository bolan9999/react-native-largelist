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

## Installation
```
yarn add react-native-spring-scrollview react-native-largelist-v3
react-native link react-native-spring-scrollview
```

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

##### Items reused. Never blank.

##### Sticky section support

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![StickySection](./docs/res/StickySection.gif)

##### Fully Cross-platform bounces (iOS & Android).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![bounces](./docs/res/bounces.gif)

##### Customize refreshing (Support `lottie-react-native` progress with `useNativeDriver`)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![CustomizeRefreshing](./docs/res/CustomizeRefreshing.gif)

##### Customize loading (Support `lottie-react-native` progress with `useNativeDriver`)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![CustomizeLoading](./docs/res/CustomizeLoading.gif)

##### Slide on both horizontal and vertical directions.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![BothDirections](./docs/res/BothDirections.gif)

##### Sticky header support.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![StickyHeader](./docs/res/StickyHeader.gif)

##### directionalLockEnabled

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![directionalLockEnabled](./docs/res/directionalLockEnabled.gif)

##### Support `inverted`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![inverted](./docs/res/inverted.gif)

##### Drag to scale header background: renderScaleHeaderBackground

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![renderScaleHeaderBackground](./docs/res/renderScaleHeaderBackground.gif)

### WaterfallList

##### Complex situation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![WaterfallExample](./docs/res/WaterfallExample.png)

##### preferColumnWidth

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![preferColumnWidth](./docs/res/preferColumnWidth.gif)

##### numColumns

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![numColumns](./docs/res/numColumns.gif)

### StickyForm

##### example

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![StickyFormExample](./docs/res/StickyFormExample.gif)


## License

react-native-largelist is released under the MIT license. See LICENSE for details.

