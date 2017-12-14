//
//  STTVTableViewModule.m
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import "STTVTableViewModule.h"
#import "STTVTableView.h"
#import <React/RCTUIManager.h>
#import "STTVTableViewManager.h"

@implementation STTVTableViewModule

- (NSArray<NSString *> *)supportedEvents {
    return @[];
}

RCT_EXPORT_MODULE(STTVTableViewModule);

RCT_EXPORT_METHOD(reloadCells:(NSArray <NSDictionary *>*)jsIndexPaths tableViewTag:(nonnull NSNumber*)tag animation:(nonnull NSNumber*)animation){
    dispatch_async(dispatch_get_main_queue(), ^{
    STTVTableView *tableView = [[STTVTableViewManager shared] tableViewForTag:tag];
    if (!tableView) {
        NSLog(@"STTVTableView: warning: can not find cell when  tag=%@", tag);
        return;
    }
    NSMutableArray <NSIndexPath *> *indexPaths = [NSMutableArray arrayWithCapacity:8];
    for (NSDictionary *indexPath in jsIndexPaths) {
        [indexPaths addObject: [NSIndexPath indexPathForRow:[indexPath[@"row"] integerValue] inSection:[indexPath[@"section"] integerValue]]];
    }
    
    
        [tableView reloadIndexPath:indexPaths withRowAnimation:[animation integerValue]];
    });
    
}

RCT_EXPORT_METHOD(reloadAll:(NSDictionary *)params onTableViewTag:(nonnull NSNumber *)tag){
    dispatch_async(dispatch_get_main_queue(), ^{
    STTVTableView *tableView = [[STTVTableViewManager shared] tableViewForTag:tag];
    if (!tableView) {
        NSLog(@"STTVTableView: warning: can not find cell when  tag=%@", tag);
        return;
    }
    
        [tableView reloadAll];
    });
}

RCT_EXPORT_METHOD(scrollTo:(NSDictionary *)params onTableViewTag:(nonnull NSNumber *)tag){
    dispatch_async(dispatch_get_main_queue(), ^{
    STTVTableView *tableView = [[STTVTableViewManager shared] tableViewForTag:tag];
    if (!tableView) {
        NSLog(@"STTVTableView: warning: can not find cell when  tag=%@", tag);
        return;
    }
    NSInteger section = [params[@"section"] integerValue];
    NSInteger row = [params[@"row"] integerValue];
    
        [tableView scrollToIndexPath:[NSIndexPath indexPathForRow:row inSection:section] atScrollPosition:0 animated:YES];
    });
}

@end
