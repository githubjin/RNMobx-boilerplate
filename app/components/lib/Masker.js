/**
 * @flow
 * 列表查询条件
 */
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Alert
} from "react-native";

import { Button } from "../lib";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const drawerHeight = 120;
const transformYMax = deviceHeight * 0.7;

type MaskerTypes = {
  maskerShow: boolean,
  useNativeDriver: boolean,
  toggleMasker: () => void,
  top: number
};
export default class ConditionMasker extends Component {
  props: MaskerTypes;
  state: {
    openValue: Animated.Value,
    accessibilityViewIsModal: boolean
  };
  static defaultProps: {
    useNativeDriver: true,
    maskerShow: false,
    top: 0
  };
  constructor(props: Object) {
    super(props);
    this.state = {
      maskerShow: false,
      openValue: new Animated.Value(0),
      accessibilityViewIsModal: false
    };
  }
  componentWillReceiveProps(nextProps: MaskerTypes) {
    if (this.props.maskerShow !== nextProps.maskerShow) {
      let config = { useNativeDriver: nextProps.useNativeDriver };
      if (!nextProps.maskerShow) {
        config = {
          ...config,
          toValue: 0,
          bounciness: 0,
          restSpeedThreshold: 0.1
        };
      } else {
        config = {
          ...config,
          toValue: 1,
          bounciness: 0,
          restSpeedThreshold: 0.5
        };
      }
      Animated.spring(this.state.openValue, config).start(() => {
        this.setState({ accessibilityViewIsModal: nextProps.maskerShow });
      });
    }
  }
  render() {
    const { maskerShow, toggleMasker, top } = this.props;
    const { openValue, accessibilityViewIsModal } = this.state;
    const pointerevents = maskerShow ? "auto" : "none";
    // drawer style
    let outRange = [];
    outRange = [-transformYMax, 0];
    let drawerTranslateY = openValue.interpolate({
      inputRange: [0, 1],
      outputRange: outRange,
      extrapolate: "clamp"
    });
    const drawerStyle = {
      transform: [{ translateY: drawerTranslateY }]
    };
    const drawerStaticStyle = {
      // height: drawerHeight,
      backgroundColor: "#ffffff",
      top: 32
    };
    // overlay style
    let overlayOpacity = openValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.7],
      extrapolate: "clamp"
    });
    const overlayStyle = {
      opacity: overlayOpacity
    };
    return (
      <View style={styles.constainer} pointerEvents={pointerevents}>
        <TouchableWithoutFeedback
          pointerEvents={pointerevents}
          onPress={toggleMasker}
        >
          <Animated.View
            pointerEvents={pointerevents}
            style={[styles.overlay, overlayStyle]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          accessibilityViewIsModal={accessibilityViewIsModal}
          style={[styles.drawer, drawerStaticStyle, drawerStyle]}
        >
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "transparent",
    zIndex: 999,
    ...StyleSheet.absoluteFillObject
  },
  overlay: {
    backgroundColor: "#333333",
    zIndex: 1000,
    ...StyleSheet.absoluteFillObject
  },
  drawer: {
    zIndex: 1001
  }
});
