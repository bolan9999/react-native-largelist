# react-native-largelist

For English readme.md [click here](https://github.com/bolan9999/react-native-largelist/blob/master/README.md)

**react-native-largelist** 是一个为React Native准备的高性能的列表组件，它比官方的SectionList给人以更好的性能体验（兼容iOS和Android）.

## 特点
* react-native-largelist 比官网的SectionList性能表现更好

## 预览
![Preview](https://github.com/bolan9999/react-native-largelist/raw/master/readme_resources/example.gif)

## 接入步骤

iOS:

* 确认您的项目是React Native项目

* 使用下面的命令安装:

```
npm add react-native-largelist
```

* 像下面这样使用它:

```
import { LargeList } from "react-native-largelist";

//other code
...
<LargeList
        style={{ flex: 1 }}
        bounces={true}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true });
          setTimeout(() => this.setState({ refreshing: false }), 2000);
        }}
        safeMargin={600}
        numberOfRowsInSection={section => this.props.numberOfEachSection}
        numberOfSections={this.props.numberOfSections}
        heightForCell={(section, row) =>
          row % 2 ? this.minCellHeight : this.maxCellHeight}
        renderCell={this.renderItem.bind(this)}
        heightForSection={section =>
          section % 2 ? this.minSectionHeight : this.maxSectionHeight}
        renderHeader={this.renderHeader.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        renderSection={section => {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: section % 2 ? "grey" : "yellow",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>
                I am section {section}
              </Text>
            </View>
          );
        }}
      />
...
```

# Usage

```
import { LargeList } from "react-native-largelist"
```

属性:

属性  |  类型  |  默认  |  作用  
------ | ------ | --------- | --------
numberOfSections | number | 1 | 总的Section数量
numberOfRowsInSection | (section:number) => number | section=>0 | 函数：根据section索引返回当前section的Cell数量
renderCell | (section:number,row:number) => React.Element | 必须 | 函数:根据当前Section和Row，返回当前Cell的render
heightForCell | (section:number,row:number) => number | 必须 | 函数：根据Section和row index，返回当前Cell的高度
renderSection | (section:number) => React.Element | section=>null | 函数：当前Section的render函数
heightForSection | (section:number) => number | 0 | 函数：返回当前section的高度
renderHeader | () => React.Element | null | 函数：列表的头部组件的render函数
renderFooter | () => React.Element | null | 函数：列表的尾部组件的render函数
bounces | boolean | true | 组件滑动到边缘是否可以继续滑动，松开后弹回
refreshing | boolean | true | 是否正在刷新
onRefresh | () => any | ()=>{} | 下拉刷新的回调


## 目标计划

1. 完成帮助文档
2. freeRefs数量自动计算
3. safeMargin动态修改
4. 提供外界监听滑动
5. 提供主动滑动到目的地
6. refresh禁止全更新
7. 提供编辑功能
