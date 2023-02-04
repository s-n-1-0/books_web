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
    color: white;
    cursor: pointer;
  `;

  return (
    <button
      css={buttonStyle}
      className="h-fit py-2 px-4 rounded-full"
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
      ツイート
    </button>
  );
}

export default TweetButton;
