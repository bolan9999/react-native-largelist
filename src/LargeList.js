/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-10-26 16:51:21
 * @LastEditTime: 2021-10-29 13:36:34
 * @LastEditors: 石破天惊
 * @Description:
 */

import React from "react";
import { useAnimatedReaction, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { SpringScrollView } from "react-native-spring-scrollview";
import Reanimated from "react-native-reanimated";
import { Dimensions, Text } from "react-native";
import { Item } from "./Item";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface ItemDataStruct {
  key?: string;
  reuseType?: string;
  data: any;
  estimatedItemHeight: number;
}
export interface SectionDataStruct {
  key?: string;
  reuseType?: string;
  items: ItemDataStruct[];
  estimatedSectionHeaderHeight: number;
}
export interface LargeListProps {
  sections: SectionDataStruct[];
  renderSectionHeader: (section: Section) => JSX.Element;
  renderItem: (item: ItemDataStruct, index: number, section: Section) => JSX.Element;
  poolSizeForReuseType: { ["string"]: number };
}

interface LargeListCoreProps extends LargeListProps {
  heightSummary: Reanimated.SharedValue<{ [string]: number }>;
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

    // heightSummary: useSharedValue({}),
    // keyMapping: useSharedValue({}),
    // trashItems: useSharedValue([]),
    // trashSections: useSharedValue([]),
    // availableItems: useSharedValue([]),
    // availableItemIndexes: useSharedValue([]),
    // topItem: useSharedValue(),
    // bottomItem: useSharedValue(),
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
  const [heightSummary] = React.useState([]);
  const [trashItems] = React.useState([]);
  const [availableItems] = React.useState([]);
  const [allItems] = React.useState([]);
  // const topItem = useSharedValue();
  // const bottomItem = useSharedValue();
  const getHeight = (section: number, item: number) => {
    "worklet";
    if (heightSummary[`${section},${item}`] === undefined) {
      if (item === -1) {
        heightSummary[`${section},${item}`] = props.sections[section].estimatedSectionHeaderHeight;
      } else {
        heightSummary[`${section},${item}`] =
          props.sections[section].items[item].estimatedItemHeight;
      }
    }
    return heightSummary[`${section},${item}`];
  };

  //#region  计算当前需要渲染的起始和结束index
  const screenHeight = Dimensions.get("window").height;
  const extraRenderRate = 0.5;
  let height = 0,
    rowIndex = 0;
  const elements = [];
  let bottom = props.contentOffset.y.value + screenHeight * (1 + extraRenderRate);
  if (props.contentOffset.y.value < screenHeight) bottom = screenHeight * (1 + 2 * extraRenderRate);
  props.sections.every((section, sectionIndex) => {
    return section.items.every((item, itemIndex) => {
      const preHeight = height + getHeight(sectionIndex, itemIndex);
      if (preHeight >= props.contentOffset.y.value - screenHeight * extraRenderRate) {
        const ref = React.useRef();
        const offset = useSharedValue(height);
        const translate = useAnimatedStyle(() => ({
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
            translate={translate}
            offset={height}
            renderItem={props.renderItem}
            sectionIndex={sectionIndex}
            itemIndex={itemIndex}
            sections={props.sections}
          />,
        );
        const itemInfo = {
          rowIndex: rowIndex++,
          sectionIndex,
          itemIndex,
          offset: height,
          reuseType: item.reuseType,
          animatedOffset: offset,
          height: getHeight(sectionIndex, itemIndex),
        };
        allItems.push(itemInfo);
        availableItems.push(itemInfo);
        if (preHeight > bottom) return false;
      }
      height = preHeight;
      return true;
    });
  });
  //#endregion

  useAnimatedReaction(
    () => {
      return { y: props.contentOffset.y.value, height: props.size.height.value };
    },
    (res, pre) => {
      if (res && res.height > 0 && (res.y !== pre.y || res.height !== pre.height)) {
        //将超出范围的Item标记为可回收Item
        if (trashItems.length === 0) {
          availableItems.forEach((itemInfo, index) => {
            if (
              itemInfo.offset + itemInfo.height >
                res.y + res.height + (screenHeight * extraRenderRate) / 2 ||
              itemInfo.offset + itemInfo.height < res.y - (screenHeight * extraRenderRate) / 2
            ) {
              if (
                trashItems.findIndex(
                  (trash) =>
                    trash.sectionIndex === itemInfo.sectionIndex &&
                    trash.itemIndex === itemInfo.itemIndex,
                ) < 0
              ) {
                trashItems.push(itemInfo);
                availableItems.splice(availableItems.indexOf(itemInfo), 1);
                console.log("push trash", itemInfo.sectionIndex, itemInfo.itemIndex);
              }
            }
          });
        }

        //开始置换
        const scrollY = res.y - pre.y;
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
        //下滑
        if (scrollY > 0) {
          //先回收顶部超出的Item
          while (
            availableItems[0].offset + availableItems[0].height <
            res.y - (screenHeight * extraRenderRate) / 2
          ) {
            trashItems.push(availableItems[0]);
            console.log(
              "下滑回收",
              availableItems[0].sectionIndex,
              availableItems[0].itemIndex,
              trashItems.length,
            );
            availableItems.splice(0, 1);
          }
          //处理底部新的Item进入
          const bottomItem = availableItems[availableItems.length - 1];
          if (
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
              rowIndex: recyleItem.rowIndex,
              sectionIndex: nextPath.sectionIndex,
              itemIndex: nextPath.itemIndex,
              offset: bottomItem.offset + bottomItem.height,
              height: getHeight(nextPath.sectionIndex, nextPath.itemIndex),
              reuseType: nextItemData.reuseType,
              animatedOffset: recyleItem.animatedOffset,
            };
            nextItem.animatedOffset.value = nextItem.offset;
            availableItems.push(nextItem);
            allItems.splice(allItems.indexOf(recyleItem), 1, nextItem);
            console.log(
              "bottom reuse",
              recyleItem.sectionIndex,
              recyleItem.itemIndex,
              nextItem.sectionIndex,
              nextItem.itemIndex,
              trashItems.length,
            );
          }
        }
        //上滑
        if (scrollY < 0) {
          //先回收底部超出的Item
          while (
            availableItems[availableItems.length - 1].offset +
              availableItems[availableItems.length - 1].height >
            res.y + res.height + (screenHeight * extraRenderRate) / 2
          ) {
            const last = availableItems[availableItems.length - 1];
            trashItems.push(last);
            console.log("上滑回收", last.sectionIndex, last.itemIndex, trashItems.length);
            availableItems.splice(availableItems.length - 1, 1);
          }
          //处理顶部的item进入
          const topItem = availableItems[0];
          if (topItem?.offset + topItem?.height >= res.y - (screenHeight * extraRenderRate) / 2) {
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
            console.log(
              "top reuse",
              recyleItem.sectionIndex,
              recyleItem.itemIndex,
              prePath.sectionIndex,
              prePath.itemIndex,
              trashItems.length,
            );
            trashItems.splice(trashItems.indexOf(recyleItem), 1);
            const preItem = {
              rowIndex: recyleItem.rowIndex,
              sectionIndex: prePath.sectionIndex,
              itemIndex: prePath.itemIndex,
              offset: topItem.offset - getHeight(prePath.sectionIndex, prePath.itemIndex),
              height: getHeight(prePath.sectionIndex, prePath.itemIndex),
              reuseType: preItemData.reuseType,
              animatedOffset: recyleItem.animatedOffset,
            };
            preItem.animatedOffset.value = preItem.offset;
            availableItems.splice(0, 0, preItem);
            allItems.splice(allItems.indexOf(recyleItem), 1, preItem);
          }
        }
      }
    },
  );

  return (
    <SpringScrollView contentContainerStyle={{ height: 1500 }} {...props}>
      {elements}
      <TouchableOpacity
        onPress={() => {
          console.log("trashItems.length", trashItems.length);
        }}
      >
        <Text>123123</Text>
      </TouchableOpacity>
    </SpringScrollView>
  );
};
