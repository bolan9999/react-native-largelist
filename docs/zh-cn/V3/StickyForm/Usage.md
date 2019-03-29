# Usage

属性  |  类型  |  默认值  | 描述  
---- | ------ | --------- | --------
...LargeList | - | - | 支持所有的LargeList属性（含刷新及加载）。
directionalLockEnabled | boolean | true | 当此属性为true时，它会试着锁定只在水平或垂直一个方向上滚动。
headerStickyEnabled | boolean | true | 将头部吸在StickForm的顶部，Section跟着吸在头部的下边。


### Precautions
它会把`renderHeader`,`renderSection`,`renderIndexPath`,`renderFooter`返回节点的子节点切片，并且让他们的第一个节点自动吸住左边。 配合LargeList的headerStickyEnabled，可以把头部吸在列表的顶部，然后把Section吸在头部的下面。. 具体可以查看示例 [StickyFormExample](https://github.com/bolan9999/react-native-largelist/blob/master/Examples/StickyFormExamples/StickyFormExample.js) .

