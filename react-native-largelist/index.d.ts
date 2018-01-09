/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2018/1/9
 *
 */

import * as React from "react";
import { ViewProperties } from "react-native";

declare module "react-native-largelist" {
  export interface IndexPath {
    section: number;
    row: number;
  }

  export interface Size {
    width: number;
    height: number;
  }

  export interface Offset {
    x: number;
    y: number;
  }

  export interface Range {
    top: number;
    bottom: number;
  }

  export interface ScrollEvent {
    nativeEvent: { contentOffset: Offset };
  }

  export interface LargeListPropTypes extends ViewProperties {
    numberOfSections?: () => number;
    numberOfRowsInSection?: (section: number) => number;
    renderCell: (section: number, row: number) => React.Element<any>|null;
    heightForCell: (section: number, row: number) => number;
    renderSection?: (section: number) => React.Element<any>|null;
    heightForSection?: (section: number) => number;
    renderHeader?: () => React.Element<any>|null;
    renderFooter?: () => React.Element<any>|null;
    bounces?: boolean;
    refreshing?: boolean;
    onRefresh?: (() => any) | null;
    onScroll?: (evt: ScrollEvent) => any;
    safeMargin?: number;
    dynamicMargin?: number;
    scrollEventThrottle?: number;
    onIndexPathDidEnterSafeArea?: (indexPath: IndexPath) => any;
    onIndexPathDidLeaveSafeArea?: (indexPath: IndexPath) => any;
    showsVerticalScrollIndicator?: boolean;
    onSectionDidHangOnTop?: (section: number) => any;
    speedLevel1?: number;
    speedLevel2?: number;
    nativeOptimize?: boolean;
    onLoadMore?: () => any;
    heightForLoadMore?: () => number;
    allLoadCompleted?: boolean;
    renderLoadingMore?: () => React.Element<any>|null;
    renderLoadCompleted?: () => React.Element<any>|null;
    numberOfCellPoolSize?: number;
    numberOfSectionPoolSize?: number;
    renderEmpty?: () => React.Element<any>|null;
    widthForRightWhenSwipeOut?: (section: number, row: number) => number;
    renderRightWhenSwipeOut?: (
      section: number,
      row: number
    ) => React.Element<any>|null;
    widthForLeftWhenSwipeOut?: (section: number, row: number) => number;
    renderLeftWhenSwipeOut?: (
      section: number,
      row: number
    ) => React.Element<any>|null;
    colorForSwipeOutBgColor?: (section: number, row: number) => string;
    initialOffsetY?: number;
    renderItemSeparator?: (section: number, row: number) => React.Element<any>|null;
    onLargeListDidUpdate?: () => any;
  }

  export class LargeList extends React.Component<LargeListPropTypes> {
    size: Size;
    contentOffset: Offset;
    safeArea: Range;
    topIndexPath: IndexPath;
    bottomIndexPath: IndexPath;
    contentSize: Size;
    currentSection: number;
    headerHeight: number;
    footerHeight: number;

    scrollTo(offset: Offset, animated: boolean = true): void;
    scrollToIndexPath(indexPath: IndexPath, animated: boolean = true): void;
    scrollToEnd(animated: boolean = true): void;
    visibleIndexPaths(): IndexPath[];
    renderedIndexPaths(): IndexPath[];
    freeCount(): number;
    reloadIndexPath(indexPath: IndexPath): void;
    reloadIndexPaths(indexPaths: IndexPath[]): void;
    reloadAll(): void;
    reloadData(): void;
  }
}
