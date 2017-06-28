/**
 * @flow
 */
import React, { Component } from "react";
import { PixelRatio, Alert } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { Provider } from "mobx-react/native";

import { Home, Others, Login, Splash } from "./components";
import { JWT_KEY } from "./constants/config";
import { getFromStorage } from "./services";
import {
  ERROR_TITLE,
  ERROR_MSG_GET_JWT_FROM_LOCAL
} from "./constants/messages";
import { showShort } from "./utils";
import * as stores from "./stores";

const TabContainer: any = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "首页",
        tabBarIcon: ({ tintColor }) =>
          <Icon name="speedometer" size={20} color={tintColor} />
      }
    },
    Customer: {
      screen: Others,
      navigationOptions: {
        title: "客户",
        tabBarIcon: ({ tintColor }) =>
          <Icon name="user" size={20} color={tintColor} />
      }
    },
    Capital: {
      screen: Others,
      navigationOptions: {
        title: "资产",
        tabBarIcon: ({ tintColor }) =>
          <Icon name="grid" size={20} color={tintColor} />
      }
    },
    Business: {
      screen: Others,
      navigationOptions: {
        title: "业务",
        tabBarIcon: ({ tintColor }) =>
          <Icon name="trophy" size={20} color={tintColor} />
      }
    },
    Others: {
      screen: Others,
      navigationOptions: {
        title: "其他",
        tabBarIcon: ({ tintColor }) =>
          <Icon name="list" size={20} color={tintColor} />
      }
    }
  },
  {
    lazy: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      // activeTintColor: "#3e9ce9",
      activeTintColor: "#26344b",
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

const StackContainer = function({ initialRouteName }) {
  let Container = StackNavigator(
    {
      Main: {
        screen: TabContainer,
        navigationOptions: {
          headerLeft: null
        }
      },
      Login: {
        screen: Login,
        navigationOptions: {
          header: null
        }
      }
    },
    {
      headerMode: "screen",
      initialRouteName,
      navigationOptions: {
        headerStyle: {
          // backgroundColor: "#3e9ce9"
          backgroundColor: "#26344b"
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: 20
        },
        headerTintColor: "#fff"
      }
    }
  );
  return <Container />;
};

export default class Root extends Component {
  state: {
    loading: boolean,
    routeName: ?string
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      loading: true,
      routeName: null
    };
  }
  componentDidMount() {
    getFromStorage(JWT_KEY)
      .then(data => {
        // console.log("get jwt from local storage data ： ", data);
        if (data) {
          this.setState({
            routeName: "Main",
            loading: false
          });
        } else {
          this.setState({
            routeName: "Login",
            loading: false
          });
        }
      })
      .catch(error => {
        // console.log("get jwt from local storage error:  ", error);
        showShort(ERROR_TITLE, ERROR_MSG_GET_JWT_FROM_LOCAL);
      });
  }
  render() {
    const { loading, routeName } = this.state;
    // console.log(Object.keys(stores));
    if (loading) {
      return <Splash />;
    }
    return (
      <Provider {...stores}>
        <StackContainer initialRouteName={this.state.routeName} />
      </Provider>
    );
  }
}
