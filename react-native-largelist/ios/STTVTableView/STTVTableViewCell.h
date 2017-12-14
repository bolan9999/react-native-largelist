//
//  STTVTableViewCell.h
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "STTVCellView.h"

@interface STTVTableViewCell : UITableViewCell

@property(nonatomic, strong) STTVCellView* jsView;
@property(nonatomic, assign) NSInteger createTag;

@end
