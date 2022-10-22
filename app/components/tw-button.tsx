import { ReactNode } from "react";

type ButtonColor = {
  color: string;
  hoverColor: string;
};
type Props = {
  children: ReactNode;
  color?: ButtonColor;
};

function TwButton({
  color = {
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-700",
  },
  children,
}: Props) {
  let c = color;
  let classNames = `font-bold py-2 px-4 rounded ${c.color} text-white ${c.hoverColor}`;
  return <button className={classNames}>{children}</button>;
}

export default TwButton;
