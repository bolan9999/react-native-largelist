//
//  STTVFooterViewManager.m
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import "STTVFooterViewManager.h"
#import "STTVFooterView.h"

@implementation STTVFooterViewManager

RCT_EXPORT_MODULE(STTVFooterView)
- (UIView *)view
{
    return [[STTVFooterView alloc] init];
}

@end
