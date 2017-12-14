//
//  STTVTableViewCell.m
//  STTVTableView
//
//  Created by 石破天 on 2017/11/3.
//  Copyright © 2017年 stone. All rights reserved.
//

#import "STTVTableViewCell.h"

@implementation STTVTableViewCell

//- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
//    if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier]){
//        self.lastTime = [[NSDate date] timeIntervalSince1970];
//    }
//    return self;
//}

-(void)setJsView:(STTVCellView *)jsView{
    if (!jsView || _jsView == jsView) return;
    _jsView = jsView;
    for (UIView *subview in self.contentView.subviews) {
        [subview removeFromSuperview];
    }
    [jsView removeFromSuperview];
    [self.contentView addSubview:_jsView];
    if (self.tag != self.createTag) {
        [jsView updateToRow:self.tag];
    }
}
//- (void)setFrame:(CGRect)frame{
//    [super setFrame:frame];
//    self.jsView.frame = self.contentView.frame;
//}
//
//- (void)layoutSubviews {
//    self.jsView.frame = self.contentView.frame;
//    [super layoutSubviews];
//}

@end
