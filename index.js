/*
 * @Author: 石破天惊
 * @email: shanshang130@gmail.com
 * @Date: 2021-07-21 13:45:04
 * @LastEditTime: 2021-07-21 14:40:23
 * @LastEditors: 石破天惊
 * @Description: 
 */
import 'react-native-gesture-handler';
import { AppRegistry, UIManager } from "react-native";
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);
import App from "./App";


AppRegistry.registerComponent("LargeListExample", () => App);
