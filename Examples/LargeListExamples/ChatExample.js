/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/19
 *
 */

import React from "react";
import { LargeList } from "../../src";
import { iconArray } from "./icons";
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import type { IndexPath } from "../../src/Types";

export class ChatExample extends React.Component {
  static navigationOptions = {
    title: "ChatExample"
  };

  _input: TextInput;
  _text: string;

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LargeList
          inverted
          style={styles.list}
          data={this.state.histories}
          heightForIndexPath={() => 50}
          renderIndexPath={this._renderItem}
        />
        <View style={styles.inputContainer}>
          <TextInput ref={ref => (this._input = ref)} style={{ flex: 1 }} onChangeText={text => (this._text = text)} />
          <TouchableOpacity onPress={this._onSend}>
            <Text>send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  _renderItem = (path: IndexPath) => {
    const msg = this.state.histories[path.section].items[path.row];
    const isMyself = msg.senderId === this.state.myId;
    return (
      <View
        style={{
          flex:1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: isMyself ? "flex-end" : "flex-start"
        }}
      >
        <View style={[styles.message, { backgroundColor: isMyself ? "green" : "white" }]}>
          <Text>{msg.content}</Text>
        </View>
      </View>
    );
  };

  _onSend = () => {
    const histories = this.state.histories;
    histories[0].items.splice(0, 0, {
      senderId: this.state.myId,
      senderHeaderIcon: iconArray[0],
      content: this._text,
      sendTimeInterval: 1550546201000
    });
    this._input.clear();
    this.setState({ histories: [...histories] });
  };

  state = {
    histories: [
      {
        items: [
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "I can't wait any more to have a try!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "Wow, that is awesome!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 0,
            senderHeaderIcon: iconArray[0],
            content: "I'm writing a chat example, and I am fixing the inverted problem!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 0,
            senderHeaderIcon: iconArray[0],
            content: "I can agree more!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "This is an awesome large list!",
            sendTimeInterval: 1550546201000
          },
          { senderId: 0, senderHeaderIcon: iconArray[0], content: "I am fine, too!", sendTimeInterval: 1550546201000 },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "Fine, thank you. And you?",
            sendTimeInterval: 1550546201000
          },
          { senderId: 0, senderHeaderIcon: iconArray[0], content: "How are you!", sendTimeInterval: 1550546201000 },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "I can't wait any more to have a try!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "Wow, that is awesome!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 0,
            senderHeaderIcon: iconArray[0],
            content: "I'm writing a chat example, and I am fixing the inverted problem!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 0,
            senderHeaderIcon: iconArray[0],
            content: "I can agree more!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "This is an awesome large list!",
            sendTimeInterval: 1550546201000
          },
          { senderId: 0, senderHeaderIcon: iconArray[0], content: "I am fine, too!", sendTimeInterval: 1550546201000 },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "Fine, thank you. And you?",
            sendTimeInterval: 1550546201000
          },
          { senderId: 0, senderHeaderIcon: iconArray[0], content: "How are you!", sendTimeInterval: 1550546201000 },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "I can't wait any more to have a try!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "Wow, that is awesome!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 0,
            senderHeaderIcon: iconArray[0],
            content: "I'm writing a chat example, and I am fixing the inverted problem!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 0,
            senderHeaderIcon: iconArray[0],
            content: "I can agree more!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "This is an awesome large list!",
            sendTimeInterval: 1550546201000
          },
          { senderId: 0, senderHeaderIcon: iconArray[0], content: "I am fine, too!", sendTimeInterval: 1550546201000 },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "Fine, thank you. And you?",
            sendTimeInterval: 1550546201000
          },
          { senderId: 0, senderHeaderIcon: iconArray[0], content: "How are you!", sendTimeInterval: 1550546201000 },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "I can't wait any more to have a try!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "Wow, that is awesome!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 0,
            senderHeaderIcon: iconArray[0],
            content: "I'm writing a chat example, and I am fixing the inverted problem!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 0,
            senderHeaderIcon: iconArray[0],
            content: "I can agree more!",
            sendTimeInterval: 1550546201000
          },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "This is an awesome large list!",
            sendTimeInterval: 1550546201000
          },
          { senderId: 0, senderHeaderIcon: iconArray[0], content: "I am fine, too!", sendTimeInterval: 1550546201000 },
          {
            senderId: 1,
            senderHeaderIcon: iconArray[1],
            content: "Fine, thank you. And you?",
            sendTimeInterval: 1550546201000
          },
          { senderId: 0, senderHeaderIcon: iconArray[0], content: "How are you!", sendTimeInterval: 1550546201000 }
        ]
      }
    ],
    myId: 0
  };
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "lightgray"
  },
  message: {
    backgroundColor: "green",
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10
  },
  inputContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center"
  }
});
