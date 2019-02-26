/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/23
 *
 */

import React from "react";
import { StickyForm } from "../../src";
import { Text, View, StyleSheet } from "react-native";
import type { IndexPath } from "../../src";

export class StickyFormExample extends React.Component {
  static navigationOptions = {
    title: "StickyFormExample"
  };

  _list: StickyForm;

  render() {
    return (
      <StickyForm
        style={{ backgroundColor: "white" }}
        contentStyle={{ alignItems: "flex-start", width: "200%" }}
        data={data}
        ref={ref => (this._list = ref)}
        heightForSection={() => 40}
        renderHeader={this._renderHeader}
        renderSection={this._renderSection}
        heightForIndexPath={() => 50}
        renderIndexPath={this._renderItem}
        onRefresh={() => {
          setTimeout(() => this._list.endRefresh(), 2000);
        }}
        onLoading={() => {
          setTimeout(() => this._list.endLoading(), 2000);
        }}
      />
    );
  }

  _renderHeader = () => {
    return (
      <View style={{ height: 80, flexDirection: "row" }}>
        <View style={styles.text}>
          <Text>汉兰达配置表</Text>
        </View>
        {this.state.titles.map((title, index) =>
          <View style={styles.headerText} key={index}>
            <Text>
              {title}
            </Text>
          </View>
        )}
      </View>
    );
  };

  _renderSection = (section: number) => {
    const sectionTitle = data[section].sectionTitle;
    return (
      <View style={{ flex: 1, backgroundColor: "lightgray", justifyContent: "center" }}>
        <View>
          <Text>
            {sectionTitle}
          </Text>
        </View>
      </View>
    );
  };

  _renderItem = (path: IndexPath) => {
    const item = data[path.section].items[path.row];
    return (
      <View style={styles.row}>
        <View style={styles.titleText}>
          <Text>
            {item.title}
          </Text>
        </View>
        {item.data.map((title, index) =>
          <View style={styles.text} key={index}>
            <Text>
              {title}
            </Text>
          </View>
        )}
      </View>
    );
  };

  state = {
    titles: [
      "汉兰达2018款2.0T两驱精英版5座",
      "汉兰达2018款2.0T两驱精英版7座",
      "汉兰达2018款2.0T两驱豪华版7座",
      "汉兰达2018款2.0T两驱尊贵版7座",
      "汉兰达2018款2.0T两驱至尊版7座",
      "汉兰达2018款2.0T四驱版至尊7座"
    ]
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#EEE"
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  headerText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEE",
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: "gray"
  },
  titleText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#EEE"
  }
});

const data = [
  {
    sectionTitle: "基本参数",
    items: [
      { title: "参考价", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "厂商指导价", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "厂商", data: ["广汽丰田", "广汽丰田", "广汽丰田", "广汽丰田", "广汽丰田", "广汽丰田"] },
      { title: "级别", data: ["中级SUV", "中级SUV", "中级SUV", "中级SUV", "中级SUV", "中级SUV"] },
      { title: "能源类型", data: ["汽油", "汽油", "汽油", "汽油", "汽油", "汽油"] },
      { title: "上市时间", data: ["2018.3", "2018.3", "2018.3", "2018.3", "2018.3", "2018.3"] },
      { title: "最大功率", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "最大扭矩", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "发动机", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "变速箱", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "长宽高", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "车身结构", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "最高车速", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "百公里加速时间", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "百公里制动", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "工信部油耗", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "实测油耗", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "整车质保", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] }
    ]
  },
  {
    sectionTitle: "车身",
    items: [
      { title: "长度", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "宽度", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "高度", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "轴距", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "前轮距", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "后轮距", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "最小离地间隙", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "车身结构2", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "车门个数", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "座位数", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "邮箱容积", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "行李箱容积", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "整车质量", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] }
    ]
  },
  {
    sectionTitle: "发动机",
    items: [
      { title: "发动机型号", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "排量", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "进气形式", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "气缸排列", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "气缸个数", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "每缸气门数", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "压缩比", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "配气结构", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "缸径", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "行程", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "最大马力", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "最大功率", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },

      { title: "最大功率转速", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "最大扭矩", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "最大扭矩转速", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "发动机特有技术", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "燃油技术", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "燃油标号", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "供油方式", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "缸盖材料", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "缸体材料", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "环保标准", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] }
    ]
  },
  {
    sectionTitle: "变速箱",
    items: [
      { title: "档位个数", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "变速箱类型", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "简称", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "驱动方式", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "四驱形式", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "中央差速锁结构", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "前悬架类型", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "后悬架类型", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "助力类型", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "车体结构", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "前制动类型", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] },
      { title: "后制动类型", data: ["23.98", "24.88", "28.98", "29.98", "25.88", "30.98"] }
    ]
  }
];
