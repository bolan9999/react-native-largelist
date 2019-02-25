import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import * as Examples from "./Examples";

const AppNavigator = createStackNavigator(Examples, {
  initialRouteName: "Home"
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}
