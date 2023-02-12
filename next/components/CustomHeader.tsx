import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
type Props = {
  isMenu?: Boolean;
};
function CustomHeader({ isMenu = true }: Props) {
  const router = useRouter();
  const { noheader: _noheader } = router.query;
  const isHeader = !(typeof _noheader == "string");
  const [isLoadedQuery, setIsLoadedQuery] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!router.isReady) return;
    setIsLoadedQuery(true);
  }, [router.isReady, router.query]);
  if (!isLoadedQuery || !isHeader) return <></>;
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
              <span>Share Books</span>
            </a>
          </Link>
        </div>
        {(() => {
          if (isMenu)
            return (
              <div>
                <div className="block lg:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex ml-auto items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
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
                  <div className="my-2">
                    <Link href="/ja/share/list" className="w-fit lg:flex-grow">
                      <a className=" inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-my-color hover:bg-white">
                        リストを作成
                      </a>
                    </Link>
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
