function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
Object.defineProperty(exports, "__esModule", { value: !0 });
var _react = require("react"),
  _react2 = _interopRequireDefault(_react),
  _reactNative = require("react-native"),
  TopView = _react2.default.createClass({
    displayName: "TopView",
    getInitialState: function() {
      return { element: null };
    },
    componentWillMount: function() {
      _reactNative.DeviceEventEmitter.addListener(
        "topViewAdd",
        this.setTopView
      ), _reactNative.DeviceEventEmitter.addListener(
        "topViewRemove",
        this.removeTopView
      );
    },
    componentWillUnmount: function() {
      _reactNative.DeviceEventEmitter.removeAllListeners(
        "topViewAdd"
      ), _reactNative.DeviceEventEmitter.removeAllListeners("topViewRemove");
    },
    setTopView: function(e) {
      return _react2.default.isValidElement(e)
        ? void this.setState({ element: e })
        : void console.error("element must be valid react elment!");
    },
    removeTopView: function() {
      this.setState({ element: null });
    },
    render: function() {
      return this.state.element;
    }
  }),
  originRegisterComponent = _reactNative.AppRegistry.registerComponent;
(_reactNative.AppRegistry.registerComponent = function(e, t) {
  var r = t();
  return originRegisterComponent(e, function() {
    return _react2.default.createClass({
      render: function() {
        return _react2.default.createElement(
          _reactNative.View,
          { style: { flex: 1 } },
          _react2.default.createElement(r, this.props),
          _react2.default.createElement(TopView, null)
        );
      }
    });
  });
}), (exports.default = {
  set: function(e) {
    _reactNative.DeviceEventEmitter.emit("topViewAdd", e);
  },
  remove: function() {
    _reactNative.DeviceEventEmitter.emit("topViewRemove");
  }
}), (module.exports = exports.default);
