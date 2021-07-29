/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:11:34
 * @LastEditTime: 2021-07-28 09:57:41
 * @LastEditors: 石破天惊
 * @Description: 
 */

declare module "react-native-largelist-v3" {
  import { SpringScrollViewPropType, Offset } from "react-native-spring-scrollview";
  import * as React from "react";
  import { Animated } from "react-native";

  export interface IndexPath {
    section: number;
    row: number;
  }

  export type LargeListDataType = { items: any[] }[];

  export interface LargeListPropType extends SpringScrollViewPropType {
    data: LargeListDataType;
    heightForSection?: (section: number) => number;
    renderSection?: (section: number) => React.ReactElement<any>;
    heightForIndexPath: (indexPath: IndexPath) => number;
    renderIndexPath: (indexPath: IndexPath) => React.ReactElement<any>;
    renderHeader?: () => React.ReactElement<any>;
    renderFooter?: () => React.ReactElement<any>;
    renderEmpty?: () => React.ReactElement<any>,

    groupCount?: number;
    groupMinHeight?: number;
    updateTimeInterval?: number;
    headerStickyEnabled?: boolean;
  }

  export class LargeList extends React.PureComponent<LargeListPropType> {
    scrollTo(offset: Offset, animated?: boolean): Promise<void>;
    scrollToIndexPath(indexPath: IndexPath, animated?: boolean): Promise<void>;
    endRefresh(): void;
    endLoading(): void;
  }

  export interface WaterfallListType<T> extends SpringScrollViewPropType {
    data: T[];
    heightForItem: (item: T, index: number) => number;
    renderItem: (item: T, index: number, columnIdx: number) => React.ReactElement<any>;
    preferColumnWidth?: number;
    numColumns?: number;
    renderHeader?: () => React.ReactElement<any>;
    renderFooter?: () => React.ReactElement<any>;
    onNativeContentOffsetExtract?: {
      x?: Animated.Value;
      y?: Animated.Value;
    };
  }

  export class WaterfallList<T> extends React.PureComponent<WaterfallListType<T>> {
    scrollTo(offset: Offset, animated?: boolean): Promise<void>;
    endRefresh(): void;
    endLoading(): void;
  }

  export interface StickyFormPropType extends LargeListPropType {}

  export class StickyForm extends React.PureComponent<StickyFormPropType> {
    scrollTo(offset: Offset, animated?: boolean): Promise<void>;
    beginRefresh():Promise<void>;
    endRefresh(): void;
    endLoading(rebound?: boolean): void;
  }
}
