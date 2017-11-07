//
//  STTVSectionViewManager.m
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import "STTVSectionViewManager.h"
#import "STTVSectionView.h"

@implementation STTVSectionViewManager

RCT_EXPORT_MODULE(STTVSectionView)
- (UIView *)view
{
    return [[STTVSectionView alloc] init];
}
RCT_EXPORT_VIEW_PROPERTY(tag, NSInteger)

@end
