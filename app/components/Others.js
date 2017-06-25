// import React, { Component } from "react";
// import { View, Text } from "react-native";

// export default class Others extends Component {
//   render() {
//     return (
//       <View>
//         <Text>Others</Text>
//       </View>
//     );
//   }
// }

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Image,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

export default class App extends Component {
  render() {
    const { width, height } = Dimensions.get("window");
    return (
      <ScrollView style={styles.container}>
        <Text>
          PixelRatio.get() = {PixelRatio.get()}
        </Text>
        <Text>
          PixelRatio.getFontScale() = {PixelRatio.getFontScale()}
        </Text>
        <Text>
          PixelRatio.getPixelSizeForLayoutSize(22) =
          {PixelRatio.getPixelSizeForLayoutSize(22)}
        </Text>
        <Text>
          PixelRatio.getPixelSizeForLayoutSize =
          {PixelRatio.getPixelSizeForLayoutSize(200)}
        </Text>
        <Text>
          PixelRatio.roundToNearestPixel(8.4)
          = {PixelRatio.roundToNearestPixel(8.4)}
          * {PixelRatio.get()} =
          {PixelRatio.get() * PixelRatio.roundToNearestPixel(8.4)}
        </Text>
        <Text>
          (width, height) =
          ({width},{height})=
          ({width / PixelRatio.get()},{height / PixelRatio.get()})
        </Text>
        {/*<Image
          style={styles.image}
          source={{
            uri:
              "https://eightwords.oss-cn-beijing.aliyuncs.com/TkFaMm3k1i/QXJ0aWNsZTo1YjJvVHF5V3hs/rc-upload-1496495278481-3.jpg!origin_thumb?OSSAccessKeyId=LTAI2ByrdckqgrnG&Expires=1498380233&Signature=D3wW3IkRdjBABLEPwW%2Bim2yAnB0%3D"
          }}
        />
        <Image
          style={styles.px_image}
          source={{
            uri:
              "https://eightwords.oss-cn-beijing.aliyuncs.com/TkFaMm3k1i/QXJ0aWNsZTo1YjJvVHF5V3hs/rc-upload-1496495278481-3.jpg!origin_thumb?OSSAccessKeyId=LTAI2ByrdckqgrnG&Expires=1498380233&Signature=D3wW3IkRdjBABLEPwW%2Bim2yAnB0%3D"
          }}
        />*/}
        <View style={styles.bnt}>
          <Text>Item Header</Text>
        </View>
        <Icon name="user" />
        <Item first={true} />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <View style={styles.bnt}>
          <Text>Running /Users/Yo/Library/Android/sdk/platform-tools/adb</Text>
        </View>
      </ScrollView>
    );
  }
}

const Item = ({ first = false }) =>
  <View style={first ? [styles.item, styles.itemTop] : styles.item}>
    <View style={styles.row_title}>
      <Text style={styles.title}>订阅号</Text>
      <Text style={styles.meta}>12:15</Text>
    </View>
    <View style={styles.row_content}>
      <Text style={styles.content}>好好读书，才是我们读书将的最好宿命</Text>
    </View>
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F5FCFF"
    // ...Platform.select({
    //   ios: {
    //     marginTop: 22
    //   }
    // })
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  image: {
    width: PixelRatio.getPixelSizeForLayoutSize(200),
    height: PixelRatio.getPixelSizeForLayoutSize(100)
  },
  px_image: {
    width: 100,
    height: 100
  },
  itemTop: {
    borderTopWidth: 1,
    borderTopColor: "#f2f2f0"
  },
  item: {
    padding: 20 / PixelRatio.get(),
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f0"
  },
  row_title: {
    marginBottom: 20 / PixelRatio.get(),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 32 / PixelRatio.get(),
    fontWeight: "700",
    color: "#000000"
  },
  meta: {
    fontSize: 24 / PixelRatio.get(),
    color: "#838383"
  },
  row_content: {},
  content: {
    fontSize: 28 / PixelRatio.get(),
    color: "#999999"
  },
  bnt: {
    marginVertical: 10 / PixelRatio.get()
  }
});
// 1dp =

// 基于 PixelRatio.get() == 2
function getScale() {
  PixelRatio.get() === 2 ? PixelRatio.get() : PixelRatio.get() / 2;
}
