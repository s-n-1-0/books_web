/** @jsxImportSource @emotion/react */
import { FlutterInAppWebViewCommunicator } from "@/libs/flutter/flutter_inappwebview";
import { css } from "@emotion/react";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {
  text: string;
  url?: string;
};
function TweetButton({ text, url = encodeURIComponent(location.href) }: Props) {
  let buttonStyle = css`
    text-align: end;
    border: none;
    background-color: #1da1f2;
    color: white;
    cursor: pointer;
  `;

  return (
    <button
      css={buttonStyle}
      className="h-fit py-2 px-3 rounded-full"
      onClick={async () => {
        let flutterInAppWebView = await FlutterInAppWebViewCommunicator.build();
        let twitterUrl = `https://twitter.com/share?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}&hashtags=ShareBooks`;
        if (
          !flutterInAppWebView.sendMessage({
            key: "completedSharing",
            data: { type: "twitter", url: twitterUrl },
          })
        ) {
          //アプリからではなかったらそのまま開く
          window.open(twitterUrl);
        }
      }}
    >
      <FontAwesomeIcon icon={faTwitter} />
    </button>
  );
}

export default TweetButton;
