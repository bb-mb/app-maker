import React from "react";
import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import setting from "./setting.json";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: `https://${setting.identifier}.selleree.shop` }}
      />
    </SafeAreaView>
  );
}
