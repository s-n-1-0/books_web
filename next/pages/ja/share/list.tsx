import { BookCell } from "@/components/books/BookCell";
import CustomHead from "@/components/CustomHead";
import Header from "@/components/CustomHeader";
import { BookCacheContextProvider } from "@/contexts/book_cache_context";
import { NextPage } from "next";
import { useState } from "react";

let Home: NextPage = () => {
  const [bookList, setBookList] = useState<URL[]>([]);
  const [errorText, setErrorText] = useState("");
  function makeMainContent() {
    return (
      <div>
        <h3 className="pt-5 text-xl text-center pb-2 text-slate-700">
          <span className="ml-1">複数の書籍をまとめて共有できます。</span>
        </h3>
        {(() => {
          if (bookList.length == 0) return;
          return (
            <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {(() => {
                return bookList.map((x, i) => {
                  let position: "top" | "bottom" | "center" =
                    i == 0
                      ? "top"
                      : i == bookList.length - 1
                      ? "bottom"
                      : "center";
                  if (bookList.length == 1) position = "bottom";
                  return <BookCell key={x.href} url={x} position={position} />;
                });
              })()}
            </ul>
          );
        })()}
        <hr className="mt-3" />
        <div className="w-full text-center m-3">
          <button
            onClick={() => {
              navigator.clipboard
                .readText()
                .then(async (text) => {
                  try {
                    let url = new URL(text);
                    if (
                      url.pathname.split("/")?.[2] !== "share" ||
                      url.searchParams.get("isbn") == null
                    ) {
                      setErrorText("コピーしているURLが有効ではありません。");
                    }
                    let newBookList = Array.from(
                      new Set([...bookList.map((x) => x.href), url.href]) //重複削除
                    ).map((x) => new URL(x));
                    setBookList(newBookList);
                  } catch {
                    setErrorText("コピーしているURLが有効ではありません。");
                  }
                })
                .catch(() => {
                  setErrorText(
                    "× ブラウザなどの設定からこのサイトに貼り付け許可を与えてください。 ×"
                  );
                });
            }}
            className="mx-auto bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded"
          >
            共有リストに追加
          </button>
          <br />
          <small className="text-red-500">{errorText}</small>
        </div>
      </div>
    );
  }
  return (
    <BookCacheContextProvider>
      <div>
        <CustomHead
          title="本を知り合いに「まとめて」紹介する - 読書日より/Share Books"
          description="登録不要で簡単に書籍を共有・紹介できるサイトです。共有先が利用する書店に合わせて複数の書籍を共有することができます!"
          pageUrl="https://books.sn-10.net/ja/share/list"
          ogType="product"
        ></CustomHead>
        {(() => {
          return <Header></Header>;
        })()}

        <main>
          <div className="w-full px-2 ">{makeMainContent()}</div>
        </main>

        <footer>
          <hr />
          <p className="text-center">
            <a className="underline" href="https://hello.sn-10.net">
              sn-10.net
            </a>
          </p>
        </footer>
      </div>
    </BookCacheContextProvider>
  );
};
export default Home;
