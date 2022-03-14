/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2022-03-12 21:18:06
 * @LastEditTime: 2022-03-14 20:13:30
 * @LastEditors: 石破天惊
 * @Description: 电商平台的瀑布流组件，支持多section
 */

import * as React from "react";
import Reanimated, {
  useSharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  runOnJS,
} from "react-native-reanimated";
import { WaterFallPropsType } from "./Types";
import { styles } from "./styles";
import { Item } from "./WaterFallItem2";
import { Dimensions, Text } from "react-native";

const TRASH_OFFSET = -10000;
const MAX_REUSE_SIZE = 20;
const EXTRA_RENDER_HEIGHT = 1000;
const screenWidth = Dimensions.get("window").width;

export function WaterFall(props: WaterFallPropsType) {
  const contentSize = { width: useSharedValue(0), height: useSharedValue(0) };
  //TODO:分析需要初始化多少个Item

  //TODO:初始化元素
  const [trashItems] = React.useState([]);
  const [availableItems] = React.useState([]);
  const [boundary] = React.useState([
    {
      top: {
        sectionIndex: 0,
        itemIndex: 0,
        offsets: new Array(props.data[0]?.column ?? 0).fill(0),
      },
      bottom: {
        sectionIndex: 0,
        itemIndex: -1,
        offsets: new Array(props.data[0]?.column ?? 0).fill(0),
      },
    },
  ]);

  const sectionElements = [];
  const itemElements = [];
  const reuseMap = new Map();
  let height = 0;
  let id = 0;
  props.data.forEach((section, sectionIndex) => {
    sectionElements.push(
      <Reanimated.View key={sectionIndex} style={[styles.abs, { top: height }]}>
        {props.renderSectionHeader(section, sectionIndex)}
      </Reanimated.View>,
    );
    height += section.height;
    const heights = new Array(section.column).fill(height);
    section.items.forEach((item, itemIndex) => {
      const size = reuseMap.get(item.reuseType) ?? 0;
      if (size < MAX_REUSE_SIZE) {
        const itemInfo = {
          id: id++,
          sectionIndex,
          itemIndex,
          width: screenWidth / section.column,
          height: item.height,
          ref: useAnimatedRef(),
          x: useSharedValue(TRASH_OFFSET),
          y: useSharedValue(TRASH_OFFSET),
          reuseType: item.reuseType,
        };
        const itemTransform = useAnimatedStyle(() => ({
          transform: [{ translateX: itemInfo.x.value }, { translateY: itemInfo.y.value }],
        }));
        itemElements.push(
          <Item
            data={props.data}
            ref={itemInfo.ref}
            itemIndex={itemIndex}
            sectionIndex={sectionIndex}
            renderItem={props.renderItem}
            key={`${sectionIndex},${itemIndex}`}
            width={itemInfo.width}
            height={itemInfo.height}
            style={[styles.leftTop, itemTransform]}
          />,
        );
        console.log("trash", itemInfo.sectionIndex, itemInfo.itemIndex);
        trashItems.push(itemInfo);
        item.reuseType && reuseMap.set(item.reuseType, size + 1);
      }
      //寻找最短的瀑布
      let minOffset = heights[0];
      let minIndex = 0;
      heights.forEach((offset, idx) => {
        if (offset < minOffset) {
          minOffset = offset;
          minIndex = idx;
        }
      });
      heights[minIndex] += item.height;
    });
    //寻找最短的瀑布
    let maxOffset = heights[0];
    heights.forEach((offset, idx) => {
      if (offset > maxOffset) maxOffset = offset;
    });
    height = maxOffset;
  });

  const updateItem = (item) => {
    trashItems
      .find((trash) => trash.id === item.id)
      ?.ref?.current?.updateItem(
        item.sectionIndex,
        item.itemIndex,
        item.column,
        item.width,
        item.height,
      );
  };

  const onScroll = (evt) => {
    "worklet";
    const contentOffset = evt.contentOffset;
    //比较两个item谁更合适
    const isTrashBetter = (item, trash, nextItem) => {
      if (!item) return true;
      if (trash.sectionIndex === nextItem.sectionIndex && trash.itemIndex === nextItem.itemIndex) {
        return true;
      }
      if (item.reuseType !== nextItem.reuseType) {
        if (trash.reuseType === nextItem.reuseType) return true;
        if (Math.abs(trash.height - nextItem.height) < Math.abs(item.height - nextItem.height)) {
          return true;
        }
      } else if (
        trash.reuseType === nextItem.reuseType &&
        Math.abs(trash.height - nextItem.height) < Math.abs(item.height - nextItem.height)
      ) {
        return true;
      }
      return false;
    };
    //从回收站寻找一个最合适的Item
    const bestItem = (nextItem) => {
      let recyleItem;
      trashItems.forEach((trashItem) => {
        if (isTrashBetter(recyleItem, trashItem, nextItem)) recyleItem = trashItem;
      });
      return recyleItem;
    };

    //先将超出渲染视图外的Item标记为可回收
    for (let i = 0; i < availableItems.length; ) {
      const item = availableItems[i];
      if (
        item.y.value + item.height < contentOffset.y - EXTRA_RENDER_HEIGHT ||
        item.y.value > contentOffset.y + contentSize.height.value + EXTRA_RENDER_HEIGHT
      ) {
        console.log("trash", item.sectionIndex, item.itemIndex);
        trashItems.push(item);
        availableItems.splice(i, 1);
        continue;
      }
      i++;
    }

    const shouldRenderBottom = () => {
      if (
        boundary[0].bottom.sectionIndex === props.data.length - 1 &&
        boundary[0].bottom.itemIndex === props.data[props.data.length - 1].items.length - 1
      )
        return false;
      return !boundary[0].bottom.offsets.every((offset) => {
        return offset > contentOffset.y + contentSize.height.value + EXTRA_RENDER_HEIGHT;
      });
    };
    for (
      let sectionIndex = boundary[0].bottom.sectionIndex;
      sectionIndex < props.data.length && shouldRenderBottom();
      sectionIndex++
    ) {
      const section = props.data[sectionIndex];

      for (
        let itemIndex = boundary[0].bottom.itemIndex + 1;
        itemIndex < section.items.length && shouldRenderBottom();
        itemIndex++
      ) {
        const item = section.items[itemIndex];
        //寻找最短的瀑布
        let minOffset = boundary[0].bottom.offsets[0],
          minIndex = 0;
        boundary[0].bottom.offsets.forEach((offset, idx) => {
          if (offset < minOffset) {
            minOffset = offset;
            minIndex = idx;
          }
        });
        //寻找最合适的Item
        const recyleItem = bestItem({
          sectionIndex,
          itemIndex,
          height: item.height,
          reuseType: item.reuseType,
        });
        //从回收站移动到尾部
        trashItems.splice(trashItems.indexOf(recyleItem), 1);
        const nextItem = {
          ...recyleItem,
          sectionIndex,
          itemIndex,
          width: screenWidth / section.column,
          height: item.height,
          reuseType: item.reuseType,
          column: minIndex,
        };
        nextItem.x.value = (contentSize.width.value / section.column) * minIndex;
        nextItem.y.value = minOffset;
        console.log(recyleItem.sectionIndex, recyleItem.itemIndex, "==>", sectionIndex, itemIndex);
        runOnJS(updateItem)(nextItem);
        availableItems.push(recyleItem);

        //更新边界信息
        boundary[0].bottom.offsets[minIndex] = minOffset + item.height;
        if (sectionIndex < props.data.length - 1 && itemIndex === section.items.length - 1) {
          //寻找最长的瀑布
          let maxOffset = 0;
          boundary[0].bottom.offsets.forEach((offset, idx) => {
            if (offset > maxOffset) maxOffset = offset;
          });
          maxOffset += props.data[sectionIndex + 1].height;
          boundary.splice(0, 1, {
            ...boundary[0],
            bottom: {
              offsets: new Array(props.data[sectionIndex + 1].column).fill(maxOffset),
              sectionIndex: sectionIndex + 1,
              itemIndex: -1,
            },
          });
        } else {
          boundary.splice(0, 1, {
            ...boundary[0],
            bottom: { sectionIndex, itemIndex, offsets: boundary[0].bottom.offsets },
          });
        }
      }
    }

    //回收站的Item挪到不可见区域
    trashItems.forEach((item) => {
      if (item.y.value !== TRASH_OFFSET) item.y.value = TRASH_OFFSET;
    });
  };
  const scrollHandler = useAnimatedScrollHandler({ onScroll }, [
    contentSize.width.value,
    contentSize.height.value,
  ]);

  const onLayout = (evt) => {
    const { height, width } = evt.nativeEvent.layout;
    contentSize.width.value = width;
    contentSize.height.value = height;
  };

  return (
    <Reanimated.ScrollView
      contentContainerStyle={{ height }}
      scrollEventThrottle={1}
      onLayout={onLayout}
      onScroll={scrollHandler}
    >
      {sectionElements}
      {itemElements}
    </Reanimated.ScrollView>
  );
}
