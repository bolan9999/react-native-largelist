# Basic

### Basic Props

Props  |  Type  |  Default  |  Effect  
---- | ------ | --------- | --------
...[VerticalScrollViewProps](https://bolan9999.github.io/react-native-spring-scrollview) | - | - | All props of VerticalScrollView
data | { items: any[] }[] | required | The data source of largelist
heightForSection | (section: number) => number | ()=>0 | The height function for every Section
renderSection | (section: number) => React.ReactElement &lt;any> | ()=>null | The render function for every Section
heightForIndexPath | (indexPath: IndexPath) => number | required | The height function for every IndexPath
renderIndexPath | (indexPath: IndexPath) => React.ReactElement &lt;any> | required | The render function for every IndexPath
renderHeader | ()=> React.ReactElement &lt;any> | undefined | The render function of largelist header
renderFooter | ()=> React.ReactElement &lt;any> | undefined | The render function of largelist footer

### Usage

```$js
<LargeList
    style={styles.container}
    data={data}
    heightForSection={() => 50}
    renderSection={this._renderSection}
    heightForIndexPath={() => 50}
    renderIndexPath={this._renderIndexPath}
/>
```


### Precautions

The parent node's width and height of `renderSection` and `renderIndexPath` is bounded. You can use `Flex`.
Conversely， The parent node's width and height of `renderHeader` and `renderFooter` is not bounded. Children must prop up parent node.
