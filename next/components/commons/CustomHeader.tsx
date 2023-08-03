import { existFlutterInAppWebView } from "@/libs/flutter/flutter_inappwebview";
import classNames from "classnames";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { LinkContext } from "../providers/LinkProvider";
type Props = {
  isMenu?: Boolean;
};
function CustomHeader({ isMenu = true }: Props) {
  const [isHeader, setIsHeader] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const linkContext = useContext(LinkContext);
  useEffect(() => {
    setIsHeader(!existFlutterInAppWebView());
  }, []);
  useEffect(() => {
    setHeaderTitle(
      linkContext.checkExperimental() ? "🧪 実験的モード" : "Share Books"
    );
  }, [linkContext]);
  if (!isHeader) return <></>;
  let menuClassNames = classNames(
    "w-full",
    "flex-grow",
    "lg:flex",
    "lg:items-center",
    "lg:w-auto",
    {
      hidden: !isOpen,
      block: isOpen,
    }
  );
  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-my-color p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link href="/ja/share">
            <a className="font-semibold text-xl tracking-tight">
              <span>{headerTitle}</span>
            </a>
          </Link>
        </div>
        {(() => {
          if (isMenu)
            return (
              <div
                style={{
                  height: isOpen ? "100px" : "30px",
                  transition: "height 1s ease",
                }}
              >
                <div className="block lg:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex ml-auto items-center px-3 py-2 border rounded text-white border-white hover:text-gray-400 hover:border-gray-400"
                  >
                    <svg
                      className="fill-current h-3 w-3"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Menu</title>
                      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                  </button>
                </div>
                <div className={menuClassNames}>
                  <div className="text-sm mt-2 md:mr-2 lg:mt-0 lg:flex-grow text-end">
                    <Link href="/ja/share">
                      <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-my-color hover:bg-white">
                        本を探す
                      </a>
                    </Link>
                  </div>
                  <div className="my-2 lg:my-0">
                    <span className="w-fit lg:flex-grow">
                      <a
                        href="/ja/share/list"
                        className=" inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-my-color hover:bg-white"
                      >
                        リストを作成
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            );
        })()}
      </nav>
    </header>
  );
}
export default CustomHeader;
