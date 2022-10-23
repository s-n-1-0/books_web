/** @jsxImportSource @emotion/react */
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
        window.open(
          "https://twitter.com/share?text=" +
            text +
            " - Share Books" +
            "&url=" +
            encodeURIComponent(url)
        );
      }}
    >
      <FontAwesomeIcon icon={faTwitter} />
      ツイートする
    </button>
  );
}

export default TweetButton;
