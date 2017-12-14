//
//  STTVTableView.m
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import "STTVTableView.h"
#import "STTVCellView.h"
#import "STTVSectionView.h"
#import "STTVHeaderView.h"
#import "STTVFooterView.h"
#import "STTVTableViewCell.h"
#import <React/RCTComponent.h>
#import <React/UIView+React.h>
#import "STTVCellContainerView.h"

@interface STTVTableView ()<UITableViewDelegate, UITableViewDataSource>

@property (nonatomic, strong) UITableView* table;
@property (nonatomic, strong) UIRefreshControl *refreshControl;
@property (nonatomic, assign) NSInteger waitingForRefreshTimes;
@property (nonatomic, strong) STTVCellContainerView *cellContainer;
@property (nonatomic, strong) NSMutableArray <NSIndexPath *>* reloadingIndexPaths;

#pragma mark == Export React Native Props ==
@property (nonatomic, copy) RCTBubblingEventBlock onDequeueCell;
@property (nonatomic, copy) NSArray <NSDictionary*> *summary;
@property (nonatomic, assign) NSInteger numberOfMaxCell;
@property (nonatomic, assign) BOOL bounces;
@property (nonatomic, assign) BOOL refreshable;
@property (nonatomic, copy) RCTBubblingEventBlock onTopRefresh;


@end

@implementation STTVTableView

- (instancetype)init {
    if (self = [super init]) {
        self.table = [[UITableView alloc] init];
        self.table.delegate = self;
        self.table.dataSource = self;
        [self addSubview:self.table];
    }
    return self;
}

- (void)setBounces:(BOOL)bounces {
    _bounces = bounces;
    self.table.bounces = bounces;
}

- (void) setRefreshable:(BOOL)refreshable {
    _refreshable = refreshable;
    if (refreshable && !self.refreshControl) {
        self.refreshControl = [[UIRefreshControl alloc] init];
        [self.refreshControl addTarget:self action:@selector(onRefreshBegin:) forControlEvents:UIControlEventValueChanged];
        [self.table addSubview:self.refreshControl];
    }
    if (!refreshable && self.refreshControl) {
        [self.refreshControl removeTarget:self action:@selector(onRefreshBegin:) forControlEvents:UIControlEventValueChanged];
        self.refreshControl = nil;
    }
}

- (void)didUpdateReactSubviews {
    for (UIView *view in self.reactSubviews) {
        if ([view isKindOfClass:[STTVHeaderView class]]) {
            self.table.tableHeaderView = view;
        } else if ([view isKindOfClass:[STTVFooterView class]]) {
            self.table.tableFooterView = view;
        } else if ([view isKindOfClass:[STTVCellContainerView class]]) {
            self.cellContainer = (STTVCellContainerView *)view;
        }
    }
}

-(void)layoutSubviews{
    self.table.frame = self.bounds;
    [super layoutSubviews];
}

#pragma mark ===== UITableViewDelegate & UITableViewDataSource =====
//- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
//    return YES;
//}
//- (UITableViewCellEditingStyle)tableView:(UITableView *)tableView editingStyleForRowAtIndexPath:(NSIndexPath *)indexPath {
//    return UITableViewCellEditingStyleDelete;
//}
//- (NSArray<UITableViewRowAction *> *)tableView:(UITableView *)tableView editActionsForRowAtIndexPath:(NSIndexPath *)indexPath {
//    UITableViewRowAction *layTopRowAction1 = [UITableViewRowAction rowActionWithStyle:UITableViewRowActionStyleDestructive title:@"删除" handler:^(UITableViewRowAction *action, NSIndexPath *indexPath) {
//        NSLog(@"点击了删除");
//        [tableView setEditing:NO animated:YES];
//    }];
//    return @[layTopRowAction1];
//}
-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
    for (UIView *subview in self.reactSubviews) {
        if (subview.tag == section && [subview isKindOfClass:[STTVSectionView class]]) {
            return subview;
        }
    }
    return [[UIView alloc] init];
}
-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section {
    return [self.summary[section][@"height"] doubleValue];
}

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return self.summary.count;
}
-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return [self.summary[indexPath.section][@"rows"][indexPath.row][@"height"] doubleValue];
}
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [self.summary[section][@"rows"] count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    NSInteger rowTag = indexPath.section * self.numberOfMaxCell + indexPath.row;
    STTVTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"cell"];
    if (!cell) {
        cell = [[STTVTableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"cell"];
        cell.tag = rowTag;
        cell.createTag = rowTag;
        NSAssert(self.cellContainer, @"STTVTableView : error: cellContainer not found when dequeue cell");
        [self.cellContainer createViewOnCell:cell numberOfMostRows:self.numberOfMaxCell];
        return cell;
    }
    cell.tag = rowTag;
    cell.contentView.backgroundColor = cell.jsView.subviews.firstObject.backgroundColor;
    [cell.jsView updateToRow:rowTag];
    return cell;
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView{
    self.cellContainer.scrolling = YES;
}

- (BOOL)scrollViewShouldScrollToTop:(UIScrollView *)scrollView {
    self.cellContainer.fastScrolling = YES;
    return YES;
}

- (void)scrollViewDidScrollToTop:(UIScrollView *)scrollView {
    self.cellContainer.scrolling = NO;
}

- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate {
    if (!decelerate) {
        self.cellContainer.scrolling = NO;
    }
}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView{
    self.cellContainer.scrolling = NO;
}

- (void)scrollViewDidEndScrollingAnimation:(UIScrollView *)scrollView {
    self.cellContainer.scrolling = NO;
}

-(void)onRefreshBegin:(UIRefreshControl *)sender{
    [sender beginRefreshing];
    if (self.onTopRefresh) {
        self.onTopRefresh(@{});
    }
}

- (void)reloadIndexPath:(NSArray <NSIndexPath *> *)indexPaths withRowAnimation:(NSInteger)animation {
    self.reloadingIndexPaths = [NSMutableArray arrayWithArray:indexPaths];
    for (NSIndexPath *indexPath in indexPaths) {
        for (STTVCellView *cellView in self.cellContainer.reactSubviews) {
            if (cellView.nativeRow == indexPath.section * self.numberOfMaxCell + indexPath.row) {
                cellView.shouldForceReload = YES;
            }
        }
    }
    [self.table reloadRowsAtIndexPaths:indexPaths withRowAnimation:animation];
}

- (void)reloadAll {
    for (STTVCellView *cellView in self.cellContainer.reactSubviews) {
        cellView.shouldForceReload = YES;
    }
    [self.table reloadData];
}

- (void)scrollToIndexPath:(NSIndexPath *)indexPath atScrollPosition:(UITableViewScrollPosition)position animated:(BOOL)animated{
    self.cellContainer.fastScrolling = YES;
    [self.table scrollToRowAtIndexPath:indexPath atScrollPosition:UITableViewScrollPositionMiddle animated:YES];
}

@end
