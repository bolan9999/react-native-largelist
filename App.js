/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:45:39
 * @LastEditTime: 2021-07-21 17:22:46
 * @LastEditors: 石破天惊
 * @Description:
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Examples from "./Examples";
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {Object.keys(Examples).map((key) => (
            <Stack.Screen key={key} name={key} component={Examples[key]} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
