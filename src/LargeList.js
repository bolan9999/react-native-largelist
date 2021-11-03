/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-10-26 16:51:21
 * @LastEditTime: 2021-11-03 22:35:21
 * @LastEditors: 石破天惊
 * @Description:
 */

import React from "react";
import {
  measure,
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SpringScrollView } from "react-native-spring-scrollview";
import Reanimated from "react-native-reanimated";
import { Dimensions, Text } from "react-native";
import { Item } from "./Item";
import { TouchableOpacity } from "react-native-gesture-handler";

const trashOffset = -10000;
export interface ItemDataStruct {
  key?: string;
  reuseType?: string;
  data: any;
  height?: number;
}
export interface SectionDataStruct {
  key?: string;
  reuseType?: string;
  items: ItemDataStruct[];
  height?: number;
}
export interface LargeListProps {
  sections: SectionDataStruct[];
  renderSectionHeader: (section: Section) => JSX.Element;
  renderItem: (item: ItemDataStruct, index: number, section: Section) => JSX.Element;
  poolSizeForReuseType: { ["string"]: number };
}

interface LargeListCoreProps extends LargeListProps {
  keyMapping: Reanimated.SharedValue<{ [string]: number }>;
  trashItems: Reanimated.SharedValue<{ sectionIndex: number, itemIndex: number }[]>;
  trashSections: Reanimated.SharedValue<{ sectionIndex: number, itemIndex: number }[]>;
  availableItems: Reanimated.SharedValue<{ sectionIndex: number, itemIndex: number }[]>;
  availableItemIndexes: Reanimated.SharedValue<{ sectionIndex: number, itemIndex: number }[]>;
}

export const LargeList = React.forwardRef((props: LargeListProps, ref) => {
  const [sharedValues] = React.useState({
    size: { width: useSharedValue(0), height: useSharedValue(0) },
    contentSize: { width: useSharedValue(0), height: useSharedValue(0) },
    contentOffset: { x: useSharedValue(0), y: useSharedValue(0) },
    contentInsets: {
      top: useSharedValue(0),
      bottom: useSharedValue(0),
      left: useSharedValue(0),
      right: useSharedValue(0),
    },
    dragging: useSharedValue(false),
    vIndicatorOpacity: useSharedValue(0),
    hIndicatorOpacity: useSharedValue(0),
    refreshAnimating: useSharedValue(false),
    refreshHeaderRef: React.useRef(),
    refreshStatus: useSharedValue("waiting"),
    loadMoreAnimating: useSharedValue(false),
    loadMoreFooterRef: React.useRef(),
    loadMoreStatus: useSharedValue("waiting"),
    panRef: React.useRef(),
    focus: useSharedValue(false),
    currentPage: useSharedValue(0),
    refreshingInner: useSharedValue(false),
    loadingMoreInner: useSharedValue(false),
    keyboardOffset: useSharedValue(0),
  });
  const combined = { ...sharedValues, ...props };
  return <LargeListClass ref={ref} {...combined} />;
});

class LargeListClass extends React.PureComponent {
  render() {
    return <LargeListCore {...this.props} />;
  }
}

const LargeListCore = (props: LargeListCoreProps) => {
  const heightSummary = useSharedValue({});
  const [trashItems] = React.useState([]);
  const [availableItems] = React.useState([]);
  const [refs] = React.useState([]);
  const gotItemHeightCount = useSharedValue(0);
  const sumGotHeight = useSharedValue(0);
  let itemCount = 0;

  //#region  计算当前需要渲染的起始和结束index
  const [elements] = React.useState([]);
  const screenHeight = Dimensions.get("window").height;
  const extraRenderRate = 0.5;
  if (elements.length === 0) {
    let rowIndex = 0;
    let initItemCount = (screenHeight * 2) / 40;
    props.sections.forEach((section, sectionIndex) => {
      itemCount += section.items.length;
      section.items.every((item, itemIndex) => {
        if (initItemCount < 0) return false;
        initItemCount--;
        const ref = useAnimatedRef();
        const offset = useSharedValue(trashOffset);
        const measureable = useSharedValue(false);
        const style = useAnimatedStyle(() => ({
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          borderColor: "red",
          borderTopWidth: 1,
          transform: [{ translateY: offset.value }],
        }));
        elements.push(
          <Item
            ref={ref}
            key={`${sectionIndex},${itemIndex}`}
            style={style}
            renderItem={props.renderItem}
            sectionIndex={sectionIndex}
            itemIndex={itemIndex}
            sections={props.sections}
            onLayout={() => (measureable.value = true)}
          />,
        );
        const itemInfo = {
          ref,
          measureable,
          rowIndex: rowIndex++,
          sectionIndex,
          itemIndex,
          height: item.estimatedItemHeight,
          offset: trashOffset,
          reuseType: item.reuseType,
          animatedOffset: offset,
          measured: false,
        };
        // allItems.push(itemInfo);
        refs.push(ref);
        availableItems.push(itemInfo);
        return true;
      });
    });
  }

  const updateItem = (rowIndex, sectionIndex, itemIndex, offset) => {
    // console.log("更新", sectionIndex, itemIndex,refs[rowIndex]?.current);
    refs[rowIndex]?.current?.updateIndex(sectionIndex, itemIndex);
  };
  //#endregion
  useAnimatedReaction(
    () => {
      return {
        y: props.contentOffset.y.value,
        height: props.size.height.value,
        measureables: availableItems.filter((item) => item.measureable.value),
      };
    },
    (res, pre) => {
      const summary = { ...heightSummary.value };
      const getHeight = (section: number, item: number) => {
        const ht = summary[`${section},${item}`];
        if (ht === undefined) return props.sections[section].items[item].estimatedItemHeight;
        return ht;
      };
      //需要测量items
      if (res.measureables.length > 0) {
        // console.log("需要测量items", res.measureables.length);
        res.measureables.forEach((itemShouldMeasure) => {
          const layout = measure(itemShouldMeasure.ref);
          const indexInAV = availableItems.findIndex(
            (fItem) => fItem.rowIndex === itemShouldMeasure.rowIndex,
          );
          if (indexInAV < 0) return;
          const item = availableItems[indexInAV];
          const newItem = { ...item, height: layout.height };
          const increment = layout.height - item.height;
          if (newItem.sectionIndex === 0 && newItem.itemIndex === 0) {
            newItem.offset = 0;
            newItem.animatedOffset.value = 0;
          }
          if (summary[`${item.sectionIndex},${item.itemIndex}`] === undefined) {
            gotItemHeightCount.value++;
            sumGotHeight.value += layout.height;
            console.log(
              "gotItemHeightCount",
              item.sectionIndex,
              item.itemIndex,
              gotItemHeightCount.value,summary[`${item.sectionIndex},${item.itemIndex}`]
              );
              summary[`${item.sectionIndex},${item.itemIndex}`] = layout.height;
          }
          availableItems.splice(indexInAV, 1, newItem);
        });
        for (let i = 0, started = false; i < availableItems.length - 1; i++) {
          const item = availableItems[i];
          if (item.measureable.value) started = true;
          if (started) {
            // console.log("started", item.sectionIndex, item.itemIndex);
            const newNext = { ...availableItems[i + 1] };
            newNext.offset = item.offset + item.height;
            newNext.animatedOffset.value = newNext.offset;
            availableItems.splice(i + 1, 1, newNext);
            // console.log("set", newNext.sectionIndex, newNext.itemIndex, newNext.offset);
          }
        }
        res.measureables.forEach((item) => {
          item.measureable.value = false;
        });
      }
      if (res && res.height > 0 && (res.y !== pre?.y || res.height !== pre?.height)) {
        //将超出范围的Item标记为可回收Item
        if (trashItems.length === 0) {
          for (let i = 0; i < availableItems.length; i++) {
            const itemInfo = availableItems[i];
            if (
              itemInfo.offset + itemInfo.height >
                res.y + res.height + (screenHeight * extraRenderRate) / 2 ||
              itemInfo.offset + itemInfo.height < res.y - (screenHeight * extraRenderRate) / 2
            ) {
              itemInfo.animatedOffset.value = trashOffset;
              trashItems.push(itemInfo);
              availableItems.splice(i, 1);
              // console.log("首次回收", itemInfo.sectionIndex, itemInfo.itemIndex);
              i--;
            }
          }
        }

        //比较Item
        const isTrashBetter = (item, trash, nextItemData) => {
          if (!item) return true;
          if (
            trash.sectionIndex === nextItemData.sectionIndex &&
            trash.itemIndex === nextItemData.itemIndex
          )
            return true;
          if (item.reuseType !== nextItemData.reuseType) {
            if (trash.reuseType === nextItemData.reuseType) return true;
            if (
              Math.abs(trash.height - nextItemData.estimatedItemHeight) <
              Math.abs(item.height - nextItemData.estimatedItemHeight)
            )
              return true;
          }
          if (
            Math.abs(trash.height - nextItemData.estimatedItemHeight) <
            Math.abs(item.height - nextItemData.estimatedItemHeight)
          )
            return true;
          return false;
        };
        //开始置换
        const scrollY = res.y - pre?.y;
        //下滑
        if (scrollY > 0) {
          //先回收顶部超出的Item
          while (
            availableItems[0] &&
            availableItems[0].offset + availableItems[0].height <
              res.y - (screenHeight * extraRenderRate) / 2
          ) {
            availableItems[0].animatedOffset.value = trashOffset;
            trashItems.push(availableItems[0]);
            availableItems.splice(0, 1);
          }
          //处理底部新的Item进入
          let bottomItem = availableItems[availableItems.length - 1];
          while (
            bottomItem?.offset + bottomItem?.height <=
            res.y + res.height + (screenHeight * extraRenderRate) / 2
          ) {
            //获取即将渲染的Item下标
            const nextPath = { ...bottomItem };
            if (nextPath.itemIndex < props.sections[nextPath.sectionIndex].items.length - 1) {
              nextPath.itemIndex++;
            } else {
              if (nextPath.sectionIndex === props.sections.length - 1) {
                return;
              }
              nextPath.sectionIndex++;
              nextPath.itemIndex = 0;
            }

            //从垃圾桶选取一个最合适的Item
            const nextItemData = props.sections[nextPath.sectionIndex].items[nextPath.itemIndex];
            let recyleItem;
            trashItems.forEach((trashItem) => {
              if (isTrashBetter(recyleItem, trashItem, nextItemData)) recyleItem = trashItem;
            });
            if (!recyleItem) {
              return console.log(
                "Cannot find a trash item to bottom in reuse pool!",
                trashItems.length,
              );
            }
            trashItems.splice(trashItems.indexOf(recyleItem), 1);
            const nextItem = {
              ...recyleItem,
              sectionIndex: nextPath.sectionIndex,
              itemIndex: nextPath.itemIndex,
              offset: bottomItem.offset + bottomItem.height,
              reuseType: nextItemData.reuseType,
              measured: false,
            };
            nextItem.animatedOffset.value = nextItem.offset;
            runOnJS(updateItem)(
              nextItem.rowIndex,
              nextPath.sectionIndex,
              nextPath.itemIndex,
              nextItem.offset,
            );
            availableItems.push(nextItem);
            // console.log(
            //   "bottom reuse",
            //   recyleItem.sectionIndex,
            //   recyleItem.itemIndex,
            //   nextItem.sectionIndex,
            //   nextItem.itemIndex,
            //   trashItems.length,
            // );
            bottomItem = availableItems[availableItems.length - 1];
          }
        }
        //上滑
        if (scrollY < 0) {
          //先回收底部超出的Item
          while (
            availableItems[availableItems.length - 1] &&
            availableItems[availableItems.length - 1].offset +
              availableItems[availableItems.length - 1].height >
              res.y + res.height + (screenHeight * extraRenderRate) / 2
          ) {
            const last = availableItems[availableItems.length - 1];
            last.animatedOffset.value = trashOffset;
            trashItems.push(last);
            // console.log("上滑回收", last.sectionIndex, last.itemIndex, trashItems.length);
            availableItems.splice(availableItems.length - 1, 1);
          }
          //处理顶部的item进入
          let topItem = availableItems[0];
          while (
            topItem?.offset + topItem?.height >=
            res.y - (screenHeight * extraRenderRate) / 2
          ) {
            const prePath = { ...topItem };
            //获取即将渲染的Item
            if (prePath.itemIndex > 0) {
              prePath.itemIndex--;
            } else {
              if (prePath.sectionIndex === 0) return;
              prePath.sectionIndex--;
              prePath.itemIndex = props.sections[prePath.sectionIndex].items.length - 1;
            }
            //从垃圾桶选取一个最合适的Item
            const preItemData = props.sections[prePath.sectionIndex].items[prePath.itemIndex];
            let recyleItem;
            trashItems.forEach((trashItem) => {
              if (isTrashBetter(recyleItem, trashItem, preItemData)) recyleItem = trashItem;
            });
            if (!recyleItem) {
              return console.log(
                "Cannot find a trash item to top in reuse pool!",
                trashItems.length,
              );
            }
            // console.log(
            //   "top reuse",
            //   recyleItem.sectionIndex,
            //   recyleItem.itemIndex,
            //   prePath.sectionIndex,
            //   prePath.itemIndex,
            //   trashItems.length,
            // );
            trashItems.splice(trashItems.indexOf(recyleItem), 1);
            const preItem = {
              ...recyleItem,
              sectionIndex: prePath.sectionIndex,
              itemIndex: prePath.itemIndex,
              offset: topItem.offset - getHeight(prePath.sectionIndex, prePath.itemIndex),
              // height: getHeight(prePath.sectionIndex, prePath.itemIndex),
              reuseType: preItemData.reuseType,
              measured: false,
            };
            preItem.animatedOffset.value = preItem.offset;
            runOnJS(updateItem)(
              preItem.rowIndex,
              preItem.sectionIndex,
              preItem.itemIndex,
              preItem.offset,
            );
            availableItems.splice(0, 0, preItem);
            // allItems.splice(allItems.indexOf(recyleItem), 1, preItem);
            topItem = availableItems[0];
          }
        }
        heightSummary.value = summary;
      }
    },
  );

  const heightStyle = useAnimatedStyle(() => {
    if (!gotItemHeightCount.value) return {};
    if (itemCount !== gotItemHeightCount.value) {
      console.log("itemCount", itemCount, gotItemHeightCount.value);
      return { height: (sumGotHeight.value / gotItemHeightCount.value) * itemCount };
    }
    console.log("sumGotHeight", sumGotHeight.value);
    return { height: sumGotHeight.value };
  });

  return (
    <SpringScrollView contentContainerStyle={heightStyle} {...props}>
      {elements}
      <TouchableOpacity
        onPress={() => {
          availableItems[0].measureable.value = !availableItems[0].measureable.value;
        }}
      >
        <Text>123123</Text>
      </TouchableOpacity>
    </SpringScrollView>
  );
};
