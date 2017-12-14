//
//  STTVCellView.h
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import <UIKit/UIKit.h>

@class STTVTableViewCell;

@interface STTVCellView : UIView

@property(nonatomic, assign) NSInteger jsRenderedRow;
@property(nonatomic, assign) BOOL shouldForceReload;
@property(nonatomic, assign) BOOL jsFree;
@property(nonatomic, assign) NSInteger nativeRow;
@property(nonatomic, assign) NSInteger jsDistanceRow;
@property(nonatomic, weak) STTVTableViewCell* cell;

- (void)updateToRow:(NSInteger)row;
- (void)checkToUpdate;

@end
