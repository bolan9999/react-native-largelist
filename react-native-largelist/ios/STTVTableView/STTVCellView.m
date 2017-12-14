//
//  STTVCellView.m
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import "STTVCellView.h"
#import <React/RCTComponent.h>

@interface STTVCellView ()

@property (nonatomic, copy) RCTBubblingEventBlock onUpdate;
@property (nonatomic, assign) BOOL waiting;

@end

@implementation STTVCellView

- (instancetype)init {
    if (self = [super init]) {
        self.jsRenderedRow = -1;
        self.nativeRow = -1;
        self.jsDistanceRow = -1;
    }
    return self;
}

- (void)setJsRenderedRow:(NSInteger)jsRenderedRow {
    _jsRenderedRow = jsRenderedRow;
    if (self.nativeRow == -1) {
        self.jsDistanceRow = self.nativeRow = jsRenderedRow;
    }
}

- (void)reactSetFrame:(CGRect)frame{
}

- (void)setFrame:(CGRect)frame {
    [super setFrame:CGRectMake(0, 0, frame.size.width, frame.size.height)];
}

- (void)updateToRow:(NSInteger)row{
    self.nativeRow = row;
//    if (row<15){
//        NSLog(@"updateToRow:%@",@(row));
//    }
//    if (self.jsFree) {
//        self.jsFree = NO;
//        self.jsDistanceRow = row;
//        self.onUpdate(@{@"row":@(self.nativeRow)});
//    }
//    [self waitForRefresh:YES];
}

//- (void) waitForRefresh:(BOOL) canCancel{
//    if (self.waiting && canCancel) {
//        return;
//    }
//    if (!self.shouldForceReload && self.nativeRow == self.jsRenderedRow) {
//        return;
//    }
//    if (self.jsFree) {
//        self.waiting = NO;
//        self.jsFree = NO;
//        self.shouldForceReload = NO;
//        self.onUpdate(@{@"row":@(self.nativeRow)});
//    } else {
//        self.waiting = YES;
//        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//            [self waitForRefresh:NO];
//        });
//    }
//}

- (void)checkToUpdate {
    if (self.jsFree && self.nativeRow != self.jsDistanceRow) {
        self.jsFree = NO;
        self.jsDistanceRow = self.nativeRow;
        self.onUpdate(@{@"row":@(self.nativeRow)});
    }
}


@end
