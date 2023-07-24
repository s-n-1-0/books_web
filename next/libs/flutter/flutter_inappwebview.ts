import { BookData } from "../search_books";

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
export class FlutterInAppWebViewCommunicator {
  buildNumber: number | null = null;
  constructor(buildNumber: number | null) {
    this.buildNumber = buildNumber;
  }
  public static async build() {
    let buildNum = await this.getAppBuildNumber();
    return new FlutterInAppWebViewCommunicator(buildNum);
  }
  //buildNum: 3以上で実装(1、2はnull)
  static async getAppBuildNumber() {
    let view = window.flutter_inappwebview;
    if (view) {
      let num = await view.callHandler("getAppBuildNumber");
      return typeof num == "number" ? num : null;
    } else return null;
  }
  sendMessage(message: FlutterInAppWebViewMessage): boolean {
    let view = window.flutter_inappwebview;
    if (view) {
      view.callHandler(message.key, message.data);
      return true;
    }
    return false;
  }
  async requestBarcodeReader() {
    let view = window.flutter_inappwebview;
    if (view) {
      let text = await view.callHandler("requestBarcodeReader");
      return typeof text == "string" ? text : "";
    } else return "";
  }
  async requestCardGeneration(bookData: BookData) {
    let view = window.flutter_inappwebview;
    if (view) {
      let text = await view.callHandler("requestCardGeneration", bookData);
      return typeof text == "string" ? text : "";
    } else return "";
  }
}
export function existFlutterInAppWebView() {
  try {
    return window.flutter_inappwebview != null;
  } catch {
    return false;
  }
}
