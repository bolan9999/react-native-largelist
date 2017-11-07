//
//  STTVTableViewManager.m
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import "STTVTableViewManager.h"
#import "STTVTableView.h"

@interface STTVTableViewManager()

@property (nonatomic, strong) NSMutableArray <STTVTableView *> *tableViews;

@end

static STTVTableViewManager *s_instance = nil;

@implementation STTVTableViewManager

+ (instancetype)shared {
    if (!s_instance) {
        s_instance = [[self alloc] init];
    }
    return s_instance;
}

- (instancetype)init {
    if (self = [super init]) {
        self.tableViews = [NSMutableArray arrayWithCapacity:16];
    }
    return self;
}


+ (instancetype)allocWithZone:(struct _NSZone *)zone{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (s_instance == nil) {
            s_instance = [super allocWithZone:zone];
        }
    });
    return s_instance;
}

- (STTVTableView *)tableViewForTag:(NSNumber *)tag {
    for (STTVTableView *view in self.tableViews) {
        if (view.tag == [tag integerValue]) {
            return view;
        }
    }
    return nil;
}

RCT_EXPORT_MODULE(STTVTableView)

- (UIView *)view {
    STTVTableView *view = [[STTVTableView alloc] init];
    [self.tableViews addObject:view];
    return view;
}

RCT_EXPORT_VIEW_PROPERTY(summary, NSArray)
RCT_EXPORT_VIEW_PROPERTY(numberOfMaxCell, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(tag, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(bounces, BOOL)
RCT_EXPORT_VIEW_PROPERTY(refreshable, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onTopRefresh, RCTBubblingEventBlock)

@end
