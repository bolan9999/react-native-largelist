//
//  STTVTableView.h
//  STTVTableView
//
//  Created by 石破天 on 2017/11/2.
//  Copyright © 2017年 stone. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface STTVTableView : UIView

- (void) reloadIndexPath:(NSArray <NSIndexPath *> *)indexPaths withRowAnimation:(NSInteger)animation;
- (void) reloadAll;
- (void) scrollToIndexPath:(NSIndexPath *)indexPath atScrollPosition:(UITableViewScrollPosition)position animated:(BOOL)animated;

@end
