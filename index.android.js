/**
 * @providesModule WebViewAndroid
 */
'use strict';

try {
  var React = require('react');
} catch(ex) {
  var React = require('react-native');
}

var createClass = require('create-react-class');
var PropTypes = require('prop-types');
var RN = require("react-native");

var { requireNativeComponent, NativeModules } = require('react-native');
var RCTUIManager = NativeModules.UIManager;

var WEBVIEW_REF = 'androidWebView';

var WebViewAndroid = createClass({
  propTypes: {
    url: PropTypes.string,
    source: PropTypes.object,
    baseUrl: PropTypes.string,
    html: PropTypes.string,
    htmlCharset: PropTypes.string,
    userAgent: PropTypes.string,
    injectedJavaScript: PropTypes.string,
    disablePlugins: PropTypes.bool,
    disableCookies: PropTypes.bool,
    javaScriptEnabled: PropTypes.bool,
    geolocationEnabled: PropTypes.bool,
    allowUrlRedirect: PropTypes.bool,
    builtInZoomControls: PropTypes.bool,
    onMessage: PropTypes.func,
    onNavigationStateChange: PropTypes.func
  },
  _onNavigationStateChange: function(event) {
    if (this.props.onNavigationStateChange) {
      this.props.onNavigationStateChange(event.nativeEvent);
    }
  },
  goBack: function() {
    RCTUIManager.dispatchViewManagerCommand(
      this._getWebViewHandle(),
      RCTUIManager.RNWebViewAndroid.Commands.goBack,
      null
    );
  },
  goForward: function() {
    RCTUIManager.dispatchViewManagerCommand(
      this._getWebViewHandle(),
      RCTUIManager.RNWebViewAndroid.Commands.goForward,
      null
    );
  },
  stopLoading: function() {
     RCTUIManager.dispatchViewManagerCommand(
       this._getWebViewHandle(),
       RCTUIManager.RNWebViewAndroid.Commands.stopLoading,
       null
     );
   },
   postMessage: function(data) {
     RCTUIManager.dispatchViewManagerCommand(
       this._getWebViewHandle(),
       RCTUIManager.RNWebViewAndroid.Commands.postMessage,
       [String(data)]
     );
   },
   injectJavaScript: function(data) {
     RCTUIManager.dispatchViewManagerCommand(
       this._getWebViewHandle(),
       RCTUIManager.RNWebViewAndroid.Commands.injectJavaScript,
       [data]
     );
   },
  reload: function() {
    RCTUIManager.dispatchViewManagerCommand(
      this._getWebViewHandle(),
      RCTUIManager.RNWebViewAndroid.Commands.reload,
      null
    );
  },
  render: function() {
    console.log(this.props)
    return <RNWebViewAndroid ref={WEBVIEW_REF} messagingEnabled={true} {...this.props} onMessage={this._onMessage} onNavigationStateChange={this._onNavigationStateChange} />;
  },
  _getWebViewHandle: function() {
    return RN.findNodeHandle(this.refs[WEBVIEW_REF]);
  },
  _onMessage: function(event: Event) {
    console.log(event)
    var {onMessage} = this.props;
    onMessage && onMessage(event);
  },
});

var RNWebViewAndroid = requireNativeComponent('RNWebViewAndroid', null);

module.exports = WebViewAndroid;
