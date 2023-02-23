import { CSSProperties } from "react";

type Props = {
  src: string;
  mode?: "default" | "small";
};
function BookThumbnail({ src, mode = "default" }: Props) {
  let style: CSSProperties = {
    position: "relative",
    minWidth: "60px",
    maxWidth: "100px",
    height: "100px",
  };

  if (mode == "small") {
    style["maxWidth"] = "60px";
    style["height"] = "50px";
  }
  return <img src={src} alt="" style={style} className="object-contain" />;
}

export default BookThumbnail;
