interface Window {
  flutter_inappwebview: any;
}
declare var window: Window;

//クリップボードからテキストを求める
async function readText(): Promise<string | null> {
  let view = window.flutter_inappwebview;
  if (view) {
    let text = await view.callHandler("readClipboardText", {});
    return typeof text == "string" ? text : null;
  } else return navigator.clipboard?.readText();
}
async function writeText(text: string) {
  let view = window.flutter_inappwebview;
  if (view) {
    return view.callHandler("writeClipboardText", { text });
  } else return navigator.clipboard?.writeText(text);
}
let flutterClipboard = {
  readText,
  writeText,
};
export default flutterClipboard;
