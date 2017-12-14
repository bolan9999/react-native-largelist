/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/14
 *
 */

import { icons } from "./icons";

let message = [
  {
    icon: icons.icon1,
    title: "游戏推荐",
    subtitle: "热门游戏推荐：王者荣耀,英雄联盟"
  },
  {
    icon: icons.icon2,
    title: "通知提醒",
    subtitle: "您有一份快递已送达，请查收"
  },
  {
    icon: icons.icon3,
    title: "优惠活动",
    subtitle: "买999送0.1元，满9999立减100000元"
  },
  {
    icon: icons.icon4,
    title: "卡券消息",
    subtitle: "查看最新卡券福利消息，0元完全免费购机"
  },
  {
    icon: icons.icon5,
    title: "系统消息",
    subtitle: "您的智商已欠费停机，请充值！"
  }
];

let messages = [];
for (let i=0;i<1000;++i){
  messages.push(message[Math.floor(Math.random()*5)]);
}

export {messages};
