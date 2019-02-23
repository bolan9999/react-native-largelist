# Usage

Props  |  Type  |  Default  |  Description  
---- | ------ | --------- | --------
[...Animated.View](http://facebook.github.io/react-native/docs/view) | - | - | Support all props of View
data | any[] | required | The data source of WaterfallList
heightForItem | (item:any,index:number)=>number; | required | The function of the height of every Item.
preferColumnWidth | number | undefined | The prefer column width of your item.(At least one of `preferColumnWidth` and `numColumns` must be required. )
numColumns | number | undefined | The column count of WaterfallList. (At least one of `preferColumnWidth` and `numColumns` must be required. )
renderHeader | ()=> React.ReactElement &lt;any> | undefined | The render function of largelist header
renderFooter | ()=> React.ReactElement &lt;any> | undefined | The render function of largelist footer

