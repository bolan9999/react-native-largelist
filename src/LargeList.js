/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-10-26 16:51:21
 * @LastEditTime: 2021-10-27 17:28:47
 * @LastEditors: 石破天惊
 * @Description:
 */

import React from "react";
import { useAnimatedReaction, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { SpringScrollView } from "react-native-spring-scrollview";
import Reanimated from "react-native-reanimated";
import { Dimensions } from "react-native";
import { Item } from "./Item";

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

  let height = 0;
  const elements = [];
  props.sections.every((section, sectionIndex) => {
    // const preHeight = height + getHeight(sectionIndex, -1);
    // if (preHeight + extraHeight >= props.contentOffset.y.value) {
    //   props.availableItemIndexes.value.push({ sectionIndex, itemIndex: -1 });
    //   elements.push(
    //     <Item renderItem={props.renderItem} sectionIndex={sectionIndex} itemIndex={-1} />,
    //   );
    //   if (preHeight - extraHeight > props.contentOffset.y.value + props.size.height.value)
    //     return false;
    // }
    // height = preHeight;
    return section.items.every((item, itemIndex) => {
      const preHeight = height + getHeight(sectionIndex, itemIndex);
      if (preHeight >= props.contentOffset.y.value - screenHeight / 2) {
        props.availableItemIndexes.value.push({ sectionIndex, itemIndex });
        const offset = useSharedValue(height);
        const translate = useAnimatedStyle(() => ({ transform: [{ translateY: offset.value }] }));
        elements.push(
          <Item
            key={`${sectionIndex},${itemIndex}`}
            translate={translate}
            offset={height}
            renderItem={props.renderItem}
            sectionIndex={sectionIndex}
            itemIndex={itemIndex}
            sections={props.sections}
          />,
        );
        if (preHeight > props.contentOffset.y.value + screenHeight * 1.5) return false;
      }
      height = preHeight;
      return true;
    });
  });

  useAnimatedReaction(
    () => props.contentOffset.y.value,
    (res, pre) => {
      if (res !== pre) {
        //TODO onScroll
      }
    },
  );
  return (
    <SpringScrollView contentContainerStyle={{ height: 1500 }} {...props}>
      {elements}
    </SpringScrollView>
  );
};
