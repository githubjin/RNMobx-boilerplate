/**
 * @flow
 */
import React, { Component } from "react";
import { PixelRatio, Image, Text, View, Alert } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { Provider } from "mobx-react/native";
import { observer, inject } from "mobx-react";
import _ from "lodash/lang";

import {
  Home,
  Others,
  Login,
  Splash,
  Borrower,
  Vehicle,
  Borrowing,
  BorrowerDetail,
  VehicleDetail,
  VehicleConditions,
  Appointment,
  Account,
  Users,
  PermissonManager,
  ShopManager
} from "./components";
import { JWT_KEY } from "./constants/config";
import { getFromStorage } from "./services";
import {
  ERROR_TITLE,
  ERROR_MSG_GET_JWT_FROM_LOCAL
} from "./constants/messages";
import { showShort } from "./utils";
import * as stores from "./stores";
import { CurrentUser } from "./stores/currentUser";
import { AuthStore } from "./stores/authUser";

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
    Borrower: {
      screen: Borrower,
      navigationOptions: {
        title: "客户",
        headerBackTitle: null,
        tabBarIcon: ({ tintColor }) =>
          <Icon name="user" size={20} color={tintColor} />
      }
    },
    Capital: {
      screen: Vehicle,
      navigationOptions: {
        title: "资产",
        tabBarIcon: ({ tintColor }) =>
          <Icon name="grid" size={20} color={tintColor} />
      }
    },
    Business: {
      screen: Borrowing,
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
        headerBackTitle: null,
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
      activeTintColor: "#53cac3",
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
      BorrowerDetail: {
        screen: BorrowerDetail,
        headerBackTitle: null,
        navigationOptions: ({ navigation }) => {
          const {
            state: {
              params: {
                borrower: { created_at, id_no, avatar, mobile, id, name }
              }
            }
          } = navigation;
          // console.log("navigationOptions : - : ", arguments);
          return {
            title: name,
            headerRight: (
              <Icon
                name="phone"
                size={22}
                color="#ffffff"
                style={{ marginRight: 16 / PixelRatio.get() }}
                onPress={() => {
                  Alert.alert("Alert", "Alert");
                }}
              />
            )
          };
        }
      },
      VehicleDetail: {
        screen: VehicleDetail
      },
      Appointment: {
        screen: Appointment
      },
      Account: {
        screen: Account
      },
      PermissonManager: {
        screen: PermissonManager
      },
      ShopManager: {
        screen: ShopManager
      },
      Users: {
        screen: Users
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
          // backgroundColor: "#26344b"
          backgroundColor: "#53cac3"
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

@inject("authStore", "currentUserStore")
@observer
class ContainerWraper extends Component {
  props: {
    initialRouteName: string,
    jwt: string,
    authStore: AuthStore,
    currentUserStore: CurrentUser
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { jwt, authStore, currentUserStore } = this.props;
    if (jwt) {
      authStore.setJwt(jwt).getOrgBaceInfo(jwt);
      if (_.isEmpty(currentUserStore.shopuser)) {
        currentUserStore.loadFromLocalstorage();
      }
      // this.props.currentUserStore.refresh(jwt);
    }
  }
  render() {
    const { initialRouteName } = this.props;
    return <StackContainer initialRouteName={initialRouteName} />;
  }
}

export default class Root extends Component {
  state: {
    loading: boolean,
    routeName: ?string,
    jwt: ?string
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      loading: true,
      routeName: null,
      jwt: null
    };
  }
  componentDidMount() {
    getFromStorage(JWT_KEY)
      .then(data => {
        // console.log("get jwt from local storage data ： ", data);
        if (data) {
          this.setState({
            routeName: "Main",
            loading: false,
            jwt: data
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
    // console.log("stores are : ", stores);
    return (
      <Provider {...stores}>
        <ContainerWraper
          jwt={this.state.jwt}
          initialRouteName={this.state.routeName}
        />
      </Provider>
    );
  }
}
