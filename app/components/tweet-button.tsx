import { useEffect } from "react";
let isLoad = false;
type Props = {
  text: string;
};
function TweetButton({ text }: Props) {
  useEffect(() => {
    if (isLoad) return;
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);
    isLoad = true;
  }, []);
  return (
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      className="twitter-share-button"
      data-text={text + " - Share Books"}
      data-show-count="false"
    >
      Tweet
    </a>
  );
}

export default TweetButton;
