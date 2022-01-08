import React from "react";
import Webview from "react-native-webview";
import WebViewComponent from '@/Components/WebView/WebView';

const WebViewScreen = ({ route }) => {
  const { id } = route.params;
  const url = `https://www.youtube.com/watch?v=${id}`;
  return (
    <WebViewComponent>
      <Webview source={{ uri: url }} />
    </WebViewComponent>
  );
};

export default WebViewScreen;
