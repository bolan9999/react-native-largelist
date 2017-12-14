//
//  STTVCellContainerView.m
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import "STTVCellContainerView.h"
#import "STTVCellView.h"
#import "STTVTableViewCell.h"

@interface STTVCellContainerView ()

@property (nonatomic, copy) RCTBubblingEventBlock onCreateCell;

@property (nonatomic, strong) NSMutableDictionary <NSNumber *, __kindof STTVTableViewCell *>*attempCells;

@property (nonatomic, strong) NSMutableArray *cellViews;

@end

@implementation STTVCellContainerView

- (instancetype)init {
    if (self = [super init]) {
        self.attempCells = [NSMutableDictionary dictionaryWithCapacity:32];
        self.cellViews = [NSMutableArray arrayWithCapacity:32];
        [self beginMonitorThread];
    }
    return self;
}

- (void)createViewOnCell:(STTVTableViewCell *)cell numberOfMostRows:(NSInteger)numberOfMostRows{
    [self.attempCells setObject:cell forKey:@(cell.createTag)];
    NSAssert(self.onCreateCell, @"STTVTableView: error:onCreateCell is nil when createViewOnCell");
    self.onCreateCell(@{@"section":@(cell.createTag/numberOfMostRows),@"row":@(cell.createTag%numberOfMostRows)});
}


- (void)didUpdateReactSubviews {
    for (STTVCellView *view in self.reactSubviews) {
        STTVTableViewCell *cell = self.attempCells[@(view.jsRenderedRow)];
        if (cell && !view.superview) {
            cell.jsView = view;
            if (![self.cellViews containsObject:view]) {
                [self.cellViews addObject:view];
            }
            [self.attempCells removeObjectForKey:@(view.jsRenderedRow)];
        }
    }
}

- (void)setScrolling:(BOOL)scrolling {
    _scrolling = scrolling;
    if (_scrolling==NO) {
        self.fastScrolling = NO;
    }
}

- (void) beginMonitorThread {
    __block __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_global_queue(0, 0), ^{
        NSInteger freeCount = 0, waitForUpdateCount = 1,busyCount=0;
        while (weakSelf) {
            freeCount=waitForUpdateCount=busyCount=0;
            NSArray *cellViews = [NSArray arrayWithArray:self.cellViews];
            for (STTVCellView *view in cellViews) {
                if (view.jsFree) {
                    freeCount++;
                } else {
                    busyCount ++;
                }
                if (view.nativeRow != view.jsDistanceRow) {
                    waitForUpdateCount++;
                }
            }
            if (waitForUpdateCount>0 && busyCount<3 && !self.fastScrolling) {
                for (STTVCellView *view in cellViews) {
                    [view checkToUpdate];
                }
            }
            [NSThread sleepForTimeInterval:0.05];
//            while (!weakSelf.scrolling) {
//                [NSThread sleepForTimeInterval:0.2];
//            }
        }
    });
}

@end




@implementation STTVCellContainerViewManager

RCT_EXPORT_MODULE(STTVCellContainerView)
- (UIView *)view
{
    return [[STTVCellContainerView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(onCreateCell, RCTBubblingEventBlock)

@end
