//
//  STTVCellViewManager.m
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import "STTVCellViewManager.h"
#import "STTVCellView.h"

@implementation STTVCellViewManager

RCT_EXPORT_MODULE(STTVCellView)
- (UIView *)view
{
    return [[STTVCellView alloc] init];
}
RCT_EXPORT_VIEW_PROPERTY(jsRenderedRow, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(jsFree, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onUpdate, RCTBubblingEventBlock)

@end
