# Usage

Props  |  Type  |  Default  |  Description  
---- | ------ | --------- | --------
[...SpringScrollView](https://bolan9999.github.io/react-native-spring-scrollview/#/) | - | - | Support almost all props in SpringScrollView
data | any[] | required | The data source of WaterfallList
heightForItem | (item:any,index:number)=> number | required | The function of the height of every Item.
renderItem | (item:any,index:number)=> React.ReactElement&lt;any> | required | The render function of your Item.
preferColumnWidth | number | undefined | The prefer column width of your item.(At least one of `preferColumnWidth` and `numColumns` must be required. )
numColumns | number | undefined | The column count of WaterfallList. (At least one of `preferColumnWidth` and `numColumns` must be required. )
renderHeader | ()=> React.ReactElement &lt;any> | undefined | The render function of WaterfallList header
renderFooter | ()=> React.ReactElement &lt;any> | undefined | The render function of WaterfallList footer

