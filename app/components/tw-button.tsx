import { ReactNode } from "react";

type ButtonColor = {
  color: string;
  hoverColor: string;
};
type Props = {
  children: ReactNode;
  color?: string;
};
let colors: { [key: string]: ButtonColor } = {
  blue: {
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-700",
  },
  red: {
    color: "bg-red-500",
    hoverColor: "hover:bg-red-700",
  },
};
function TwButton({ color = "blue", children }: Props) {
  let c = colors[color];
  let classNames = `font-bold py-2 px-4 rounded ${c.color} text-white ${c.hoverColor}`;
  return <button className={classNames}>{children}</button>;
}

export default TwButton;
