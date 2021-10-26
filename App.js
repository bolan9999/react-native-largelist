/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:45:39
 * @LastEditTime: 2021-10-26 11:25:49
 * @LastEditors: 石破天惊
 * @Description:
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Test } from "./Test";
// import * as Examples from "./Examples";
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Test">
          {/* {Object.keys(Examples).map((key) => (
            <Stack.Screen key={key} name={key} component={Examples[key]} />
          ))} */}
          <Stack.Screen name="Test" component={Test}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
