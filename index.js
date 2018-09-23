import { AppRegistry, UIManager } from "react-native";
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);
import App from "./App";

AppRegistry.registerComponent("LargeListDemo", () => App);
