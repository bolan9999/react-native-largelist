//
//  STTVHeaderViewManager.m
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import "STTVHeaderViewManager.h"
#import "STTVHeaderView.h"

@implementation STTVHeaderViewManager

RCT_EXPORT_MODULE(STTVHeaderView)
- (UIView *)view
{
    return [[STTVHeaderView alloc] init];
}

@end
