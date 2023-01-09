/** @jsxImportSource @emotion/react */
import { sendMessage } from "@/libs/flutter/flutter_inappwebview";
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
    padding: 6px 16px;
    border-radius: 100vh;
    color: white;
    cursor: pointer;
  `;

  return (
    <button
      css={buttonStyle}
      onClick={() => {
        let twitterUrl =
          "https://twitter.com/share?text=" +
          encodeURIComponent(text + " - Share Books") +
          "&url=" +
          encodeURIComponent(url);
        if (
          !sendMessage({
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
      ツイートする
    </button>
  );
}

export default TweetButton;
