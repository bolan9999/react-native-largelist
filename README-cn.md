# react-native-largelist

For English readme.md [click here](./README.md)

**react-native-largelist** 是一个为React Native准备的高性能的列表组件，它比官方的SectionList给人以更好的性能体验（兼容iOS和Android）.

## 特点
* react-native-largelist 比官网的SectionList性能表现更好

## 预览
![Preview](./readme_resources/example.gif)

## 接入步骤

* 确认您的项目是React Native项目

* 使用下面的命令安装:

```
npm install react-native-largelist --save
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

# 基本用法

```
import { LargeList } from "react-native-largelist"
```

属性:

属性  |  类型  |  默认  |  作用  
------ | ------ | --------- | --------
（ViewPropTypes） | （ViewPropTypes） |  | View的所有属性
numberOfSections | number | 1 | 总的Section数量
numberOfRowsInSection | (section:number) => number | section=>0 | 函数：根据section索引返回当前section的Cell数量
renderCell | (section:number,row:number) => React.Element | 必须 | 函数:根据当前Section和Row，返回当前Cell的render
heightForCell | (section:number,row:number) => number | 必须 | 函数：根据Section和row index，返回当前Cell的高度
renderSection | (section:number) => React.Element | section=>null | 函数：当前Section的render函数
heightForSection | (section:number) => number | 0 | 函数：返回当前section的高度
renderHeader | () => React.Element | ()=>null | 函数：列表的头部组件的render函数
renderFooter | () => React.Element | ()=>null | 函数：列表的尾部组件的render函数
bounces | boolean | true | 组件滑动到边缘是否可以继续滑动，松开后弹回
refreshing | boolean | undefined | 是否正在刷新
onRefresh | () => any | undefined | 下拉刷新的回调,如果用户设置了此属性，则添加一个刷新控件
onScroll | ({nativeEvent:{contentOffset:{x:number,y:number}}})=> any |  | 滑动的回调，同官方ScrollView

# 原理
在了解高级用法之前，我们先要了解下基本原理：

和UITableView/RecyclerView基本原理一样，每一行的Cell/Item是重用的，当上面的Cell/Item滑离屏幕的时候，它对于我们来说已经不用再展示了，所以，把它挪到底部，用新的数据渲染。这样就不会出现由于数据量过大，造成View的浪费导致加载卡顿。

但是，这又和原生的UITableView/RecyclerView不一样，因为UI线程和我们的JavaScript线程不是同一个线程，并且他们是异步的，他们之间通讯还会花费较多的时间。所以，我在可视区域之外的上下各自额外渲染了一段距离（safeMargin），用以缓冲，避免用户突然的滑动造成视觉上看到上下边缘的加载是闪烁的。

下面的图可以直观地看到react-native-largelist的设计：

![](./readme_resources/largelist_advanced_usage.png)

当然，在之后的版本中，我会把iOS原生优化加入其中的选项中，这样，不论你滑动的速度有多快，用户都不会看到白板的情况了。

# 高级属性

### safeMargin ( type:number ,default: 600)
上下额外的预渲染高度，值越大在快速滑动过程中越不容易看到空白，但是第一次加载的时间越长
### dynamicMargin (type:number,default: 500)
在快速滑动过程中，允许上下端相互借用的预渲染高度。比如假设safeMargin=600，dynamicMargin=500，在快速下滑过程中，上端只额外渲染100高度，下端额外渲染1100高度，反之亦然。 在慢速滑动过程中该属性无作用。请注意：该属性不能大于safeMargin
### scrollEventThrottle (type: number ,default: ios:16 android:32)
同ScrollView的scrollEventThrottle，滑动过程中，onScroll回调时间最小间隔，值越小，相同的滑动追踪次数越多，越不容易出现空白，性能越差。
### onIndexPathDidEnterSafeArea (type:(indexPath:IndexPath)=>any)
当一个indexPath进入SafeArea时回调
### onIndexPathDidLeaveSafeArea (type:(indexPath:IndexPath)=>any)
当一个indexPath离开SafeArea时回调
### showsVerticalScrollIndicator (type:bool,default:true)
显示垂直滚动指示器
### onSectionDidHangOnTop (type:section=>any, default: ()=>{})
当一个新的Section被挂在LargeList顶部时的回调
### speedLevel1 (type:number, default:4)
当滑动的速度超过这个speedLevel1，LargeList则不会rerender，仅仅只是移动位置。  单位是  每毫秒移动的逻辑像素量。
### speedLevel2 (type:number, default:10)
当前版本无意义
### nativeOptimize (type:bool, default: false)
启用原生优化，iOS专用。这是一个实验性的功能，使用该功能以后，safeArea就没有意义了。要使用改功能，请将"${YourProject}/node_modules/react-native-largelist/ios/STTVTableView.xcodeproj"拖入您的iOS项目，并且保证链接了它


# 方法
### scrollTo(offset:Offset, animated:boolean=true)
滑动到目标偏移Offset:{x:number,y:number},目前x值只支持0
### scrollToIndexPath(indexPath:IndexPath, animated:boolean = true)
滑动到一个指定的IndexPath:{section:number,row:number}
### scrollToEnd(animated:boolean=true)
滑动到最底部
### visiableIndexPaths():IndexPath[]
获取当前可见的所有IndexPaths
### renderedIndexPaths():IndexPath[]
获取当前已经渲染好的所有IndexPaths
### freeCount(): number
获取当前空闲的Cell数量
### reloadIndexPath(indexPath: IndexPath)
重新加载指定indexPath.
### reloadIndexPaths(indexPaths: IndexPath[])
重新加载一些指定的indexPaths
### reloadAll()
重新加载所有indexPaths

Notice:

1. 如果section数量、高度或每个Section里面Cell数量和高度变化，所有的reload方法都不能正常使用
2. 后期版本将添加数量、高度变化后的重新加载数据

# 动态变量
### size:Size
获取LargeList的当前可视Size：{width:number,height:number}
### contentOffset:Offset
获取LargeList当前偏移Offset：{x:number,y:number}
### safeArea: Range
获取LargeList当前的已经渲染好的区域Range:{top:number,bottom:number}
### topIndexPath: IndexPath
获取LargeList当前SafeArea顶部的IndexPath:{section:number,row:number}
### bottomIndexPath: IndexPath
获取LargeList当前SafeArea底部的IndexPath:{section:number,row:number}
### contentSize:Size
获取LargeList当前总大小Size:{width:number, height:number}
### currentSection:number
获取放置在顶部的Section
### headerHeight:number
获取LargeList当前的Header高度
### footerHeight:number
获取LargeList当前的Footer高度

## 目标计划
1. 修正细节问题
2. 提供编辑功能
