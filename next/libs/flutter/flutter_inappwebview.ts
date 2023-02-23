interface Window {
  flutter_inappwebview: any;
}
declare var window: Window;
export interface FlutterInAppWebViewMessage {
  key: "completedSharing";
  data: FlutterInAppWebViewMessageCompletedSharingType;
}

export interface FlutterInAppWebViewMessageCompletedSharingType {
  type: "default" | "twitter";
  url: string; //twitterの場合twitterリンク
}
export function sendMessage(message: FlutterInAppWebViewMessage): boolean {
  let view = window.flutter_inappwebview;
  if (view) {
    view.callHandler(message.key, message.data);
    return true;
  }
  return false;
}

export function existFlutterInAppWebView() {
  return window.flutter_inappwebview != null;
}
