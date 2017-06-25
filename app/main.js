import React, { Component } from "react";
import { PixelRatio } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import Home from "./components/Home";
import Others from "./components/Others";

const TabContainer = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "首页",
        tabBarIcon: ({ tintColor }) =>
          <Icon name="home" size={20} color={tintColor} />
      }
    },
    Others: {
      screen: Others,
      navigationOptions: {
        title: "其他",
        tabBarIcon: ({ tintColor }) =>
          <Icon name="grid" size={20} color={tintColor} />
      }
    }
  },
  {
    lazy: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#3e9ce9",
      inactiveTintColor: "#999999",
      showIcon: true,
      style: {
        backgroundColor: "#fff"
      },
      indicatorStyle: {
        opacity: 0
      },
      tabStyle: {
        padding: 0
      }
    }
  }
);

const StackContainer = StackNavigator(
  {
    Main: {
      screen: TabContainer,
      navigationOptions: {
        headerLeft: null
      }
    }
  },
  {
    headerMode: "screen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#3e9ce9"
      },
      headerTitleStyle: {
        color: "#fff",
        fontSize: 20
      },
      headerTintColor: "#fff"
    }
  }
);

export default StackContainer;
