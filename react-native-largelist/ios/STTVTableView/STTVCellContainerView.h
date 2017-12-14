//
//  STTVCellContainerView.h
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>

@interface STTVCellContainerView : UIView

@property (nonatomic, assign) BOOL scrolling;
@property (nonatomic, assign) BOOL fastScrolling;

- (void)createViewOnCell:(__kindof UITableViewCell *)cell numberOfMostRows:(NSInteger)numberOfMostRows;

@end


@interface STTVCellContainerViewManager : RCTViewManager

@end

