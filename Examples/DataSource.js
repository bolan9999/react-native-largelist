/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/14
 *
 */

import { iconObject as icons, iconArray } from "./icons";

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

let messages = [{items:[]}];
for (let i = 0; i < 1000; ++i) {
  messages[0].items.push(message[Math.floor(Math.random() * 5)]);
}

let contacts = [
  {
    header: "A",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Apple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "App",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Aee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Aliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Amliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Anni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Akali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "All",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Aba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Appqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "B",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Bpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Bpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Bee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Bliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Bmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Bnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Bkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Bll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Bba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Bppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "C",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Cpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Cpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Cee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Cliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Cmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Cnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ckali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Cll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Cba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Cppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "D",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Dpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Dpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Dee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Dliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Dmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Dnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Dkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Dll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Dba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Dppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "E",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Epple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Epp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Eee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Eliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Emliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Enni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ekali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ell",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Eba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Eppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "F",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Fpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Fpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Fee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Fliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Fmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Fnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Fkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Fll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Fba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Fppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "G",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Gpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Gpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Gee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Gliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Gmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Gnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Gkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Gll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Gba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Gppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "H",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Hpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Hpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Hee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Hliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Hmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Hnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Hkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Hll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Hba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Hppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "I",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ipple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ipp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Iee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Iliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Imliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Inni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ikali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ill",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Iba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ippqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "J",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Jpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Jpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Jee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Jliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Jmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Jnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Jkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Jll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Jba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Jppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "K",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Kpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Kpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Kee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Kliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Kmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Knni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Kkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Kll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Kba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Kppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "L",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Lpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Lpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Lee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Lliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Lmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Lnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Lkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Lll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Lba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Lppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "M",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Mpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Mpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Mee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Mliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Mmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Mnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Mkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Mll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Mba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Mppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "N",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Npple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Npp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Nee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Nliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Nmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Nnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Nkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Nll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Nba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Nppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "O",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Opple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Opp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Oee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Oliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Omliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Onni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Okali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Oll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Oba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Oppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "P",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ppple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ppp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Pee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Pliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Pmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Pnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Pkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Pll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Pba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Pppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "Q",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Qpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Qpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Qee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Qliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Qmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Qnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Qkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Qll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Qba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Qppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "R",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Rpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Rpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ree",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Rliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Rmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Rnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Rkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Rll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Rba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Rppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "S",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Spple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Spp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "See",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Sliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Smliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Snni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Skali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Sll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Sba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Sppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "T",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Tpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Tpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Tee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Tliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Tmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Tnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Tkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Tll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Tba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Tppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "U",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Upple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Upp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Uee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Uliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Umliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Unni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ukali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ull",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Uba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Uppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "V",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Vpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Vpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Vee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Vliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Vmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Vnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Vkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Vll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Vba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Vppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "W",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Wpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Wpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Wee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Wliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Wmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Wnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Wkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Wll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Wba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Wppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "X",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Xpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Xpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Xee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Xliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Xmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Xnni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Xkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Xll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Xba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Xppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "Y",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ypple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ypp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Yee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Yliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ymliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ynni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Ykali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Yll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Yba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Yppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "Z",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Zpple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Zpp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Zee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Zliy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Zmliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Znni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Zkali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Zll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Zba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "Zppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "#",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "#pple",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "#pp",
        phone: "13333333443"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "#ee",
        phone: "13333333553"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "#liy",
        phone: "13336633333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "#mliy",
        phone: "13333333003"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "#nni",
        phone: "13123333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "#kali",
        phone: "13322333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "#ll",
        phone: "13333333333"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "#ba",
        phone: "13333333310"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        name: "#ppqq",
        phone: "13333333333"
      }
    ]
  }
];

let foods = [
  {
    header: "热销",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "加菜",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "泡菜",
        subtitle: "含米饭一份",
        sales: "月销2020份",
        praise: "赞4",
        prise: "¥0.00",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加青菜",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    "header": "米饭", items:[
    {
      icon: iconArray[Math.floor(Math.random() * 11)],
      title: "米饭",
      subtitle: "",
      sales: "月销22000份",
      praise: "赞4",
      prise: "¥2",
      activity: ""
    },
  ]},
  {
    header: "砂锅黄焖鸡套餐",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡小份加豆皮",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥20.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡小份加香菇",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡小份加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡小份加青菜",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "砂锅黄焖猪脚套餐",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖猪脚小份加香菇",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥25.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖猪脚小份加百事可乐",
        subtitle: "含米饭一份",
        sales: "月销2份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖猪脚小份加金针菇",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥24",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖猪脚小份加豆皮",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖猪脚小份加青菜",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "砂锅黄焖排骨套餐",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份加百事可乐",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥28.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份加香菇",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份加豆皮",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份加青菜",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "招牌菜",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "铁山坪麻辣跑山鸡",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "奉节二师兄烤猪头",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "热销1",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "热销2",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "热销3",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "热销4",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "热销5",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "热销6",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "热销7",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "热销8",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "热销9",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "热销10",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "热销11",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
  {
    header: "热销12",
    items: [
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        icon: iconArray[Math.floor(Math.random() * 11)],
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      },
    ]
  },
];

export { messages, contacts,foods };
