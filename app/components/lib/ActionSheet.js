/**
 * @flow
 */

import {
  ActionSheetIOS,
  StyleSheet,
  View,
  Text,
  Platform,
  DeviceEventEmitter,
  AppRegistry
} from "react-native";

let ActionSheet = ActionSheetIOS;

if (Platform.OS !== "ios") {
  ActionSheet = {};
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  drawer: {
    ...StyleSheet.absoluteFillObject
  }
});

export default ActionSheet;
