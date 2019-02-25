# Usage

Props  |  Type  |  Default  |  Description  
---- | ------ | --------- | --------
...LargeList | - | - | Support all props in LargeList
directionalLockEnabled | boolean | true | When true, the StickyForm will try to lock to only vertical or horizontal scrolling while dragging.
headerStickyEnabled | boolean | true | Sticky the header of the StickyForm on the top. And then sticky the Section on the bottom of the header.


### Precautions
StickyForm will sticky the first element of `renderHeader`,`renderSection`,`renderIndexPath`,`renderFooter` element on the left of the StickyForm. See [StickyFormExample](https://github.com/bolan9999/react-native-largelist/blob/master/Examples/StickyFormExamples/StickyFormExample.js) for more information.

