/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-10-26 16:51:21
 * @LastEditTime: 2021-10-28 18:09:33
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
    keyMapping: useSharedValue({}),
    trashItems: useSharedValue([]),
    trashSections: useSharedValue([]),
    availableItems: useSharedValue([]),
    availableItemIndexes: useSharedValue([]),
    topItem: useSharedValue(),
    bottomItem: useSharedValue(),
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
  const [heightSummary] = React.useState({});
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

  //计算当前需要渲染的起始和结束index
  const screenHeight = Dimensions.get("window").height;
  const extraRenderRate = 0.2;
  props.topItem.value = null;
  props.bottomItem.value = null;
  let height = 0;
  const elements = [];
  let bottom = props.contentOffset.y.value + screenHeight * (1 + extraRenderRate);
  if (props.contentOffset.y.value < screenHeight) bottom = screenHeight * (1 + 2 * extraRenderRate);
  props.sections.every((section, sectionIndex) => {
    return section.items.every((item, itemIndex) => {
      const preHeight = height + getHeight(sectionIndex, itemIndex);
      if (preHeight >= props.contentOffset.y.value - screenHeight * extraRenderRate) {
        props.availableItemIndexes.value.push({ sectionIndex, itemIndex });
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
          sectionIndex,
          itemIndex,
          offset: height,
          reuseType: item.reuseType,
          animatedOffset: offset,
          height: getHeight(sectionIndex, itemIndex),
        };
        props.availableItems.value.push(itemInfo);
        if (
          !props.topItem.value &&
          preHeight >= props.contentOffset.y.value - (screenHeight * extraRenderRate) / 2
        ) {
          props.topItem.value = itemInfo;
        }
        if (preHeight <= bottom - (screenHeight * extraRenderRate) / 2)
          props.bottomItem.value = itemInfo;
        if (preHeight > bottom) return false;
      }
      height = preHeight;
      return true;
    });
  });

  props.availableItems.value=[...props.availableItems.value];

  useAnimatedReaction(
    () => {
      return { y: props.contentOffset.y.value, height: props.size.height.value };
    },
    (res, pre) => {
      if (res && res.height > 0 && (res.y !== pre.y || res.height !== pre.height)) {
        //将超出范围的Item标记为可回收Item
        // console.log("props.availableItems.value",props.availableItems.value.length);
        props.availableItems.value.forEach((itemInfo, index) => {
          if (
            itemInfo.offset + itemInfo.height < res.y - (screenHeight * extraRenderRate) / 2 ||
            itemInfo.offset > res.y + res.height + (screenHeight * extraRenderRate) / 2
          ) {
            if (props.trashItems.value.indexOf(itemInfo) < 0) {
              props.trashItems.value.push(itemInfo);
              console.log("push trash", itemInfo.sectionIndex, itemInfo.itemIndex);
            }
          } else {
            const findIndex = props.trashItems.value.indexOf(itemInfo);
            if (findIndex >= 0) {
              props.trashItems.value.splice(findIndex, 1);
            }
          }
        });

        //开始置换
        const scrollY = res.y - pre.y;
        //比较Item
        const isBetter = (item, trash, nextItemData) => {
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
        if (scrollY < 0) {
          if (
            props.topItem.value?.offset + props.topItem.value?.height >=
            res.y - (screenHeight * extraRenderRate) / 2
          ) {
            const prePath = { ...props.topItem.value };
            //获取即将渲染的Item
            if (prePath.itemIndex > 0) {
              prePath.itemIndex--;
            } else {
              if (prePath.sectionIndex === 0) return;
              prePath.sectionIndex--;
              prePath.itemIndex = props.sections[prePath.sectionIndex].items.length - 1;
            }
            const preItemData = props.sections[prePath.sectionIndex].items[prePath.itemIndex];
            let preItem;
            props.trashItems.value.forEach((trashItem) => {
              if (isBetter(preItem, trashItem, preItemData)) preItem = trashItem;
            });
            console.log("top reuse", preItem.sectionIndex, preItem.itemIndex);
            props.trashItems.value.splice(props.trashItems.value.indexOf(preItem), 1);
            preItem.sectionIndex = prePath.sectionIndex;
            preItem.itemIndex = prePath.itemIndex;
            preItem.height = getHeight(prePath.sectionIndex, prePath.itemIndex);
            preItem.offset = props.topItem.value.offset - preItem.height;
            preItem.reuseType = preItemData.reuseType;
            preItem.animatedOffset.value = preItem.offset;
            props.topItem.value = preItem;
          }
        }
        if (scrollY > 0) {
          if (
            props.bottomItem.value?.offset + props.bottomItem.value?.height <=
            res.y + res.height + (screenHeight * extraRenderRate) / 2
          ) {
            const nextPath = { ...props.bottomItem.value };
            //获取即将渲染的Item
            if (nextPath.itemIndex < props.sections[nextPath.sectionIndex].items.length - 1) {
              nextPath.itemIndex++;
            } else {
              if (nextPath.sectionIndex === props.sections.length - 1) return;
              nextPath.sectionIndex++;
              nextPath.itemIndex = 0;
            }
            const nextItemData = props.sections[nextPath.sectionIndex].items[nextPath.itemIndex];
            let nextItem;

            //从垃圾桶选取一个最合适的Item
            props.trashItems.value.forEach((trashItem) => {
              if (isBetter(nextItem, trashItem, nextItemData)) nextItem = trashItem;
            });
            console.log(
              "bottom reuse",
              nextItem.sectionIndex,
              nextItem.itemIndex,
              nextPath.sectionIndex,
              nextPath.itemIndex,
            );
            props.trashItems.value.splice(props.trashItems.value.indexOf(nextItem), 1);
            nextItem.sectionIndex = nextPath.sectionIndex;
            nextItem.itemIndex = nextPath.itemIndex;
            nextItem.offset = props.bottomItem.value.offset + props.bottomItem.value.height;
            nextItem.height = getHeight(nextPath.sectionIndex, nextPath.itemIndex);
            nextItem.reuseType = nextItemData.reuseType;
            nextItem.animatedOffset.value = nextItem.offset;
            props.bottomItem.value = nextItem;
            console.log("bottom completed", nextItem.sectionIndex, nextItem.itemIndex);
          }
        }
      }
    },
  );

  return (
    <SpringScrollView contentContainerStyle={{ height: 1500 }} {...props}>
      {elements}
    </SpringScrollView>
  );
};
