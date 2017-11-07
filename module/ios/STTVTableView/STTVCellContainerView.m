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

@end

@implementation STTVCellContainerView

- (instancetype)init {
    if (self = [super init]) {
        self.attempCells = [NSMutableDictionary dictionaryWithCapacity:16];
    }
    return self;
}

- (void)createViewOnCell:(__kindof UITableViewCell *)cell numberOfMostRows:(NSInteger)numberOfMostRows{
    [self.attempCells setObject:cell forKey:@(cell.tag)];
    NSAssert(self.onCreateCell, @"STTVTableView: error:onCreateCell is nil when createViewOnCell");
    self.onCreateCell(@{@"section":@(cell.tag/numberOfMostRows),@"row":@(cell.tag%numberOfMostRows)});
}


- (void)didUpdateReactSubviews {
    for (STTVCellView *view in self.reactSubviews) {
        STTVTableViewCell *cell = self.attempCells[@(view.jsRenderedRow)];
        if (cell && !view.superview) {
            cell.jsView = view;
            [self.attempCells removeObjectForKey:@(view.jsRenderedRow)];
        }
    }
    
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
