import { BookCell } from "@/components/books/BookCell";
import SearchBookField from "@/components/books/SearchBookField";
import CustomHead from "@/components/CustomHead";
import Header from "@/components/CustomHeader";
import {
  BookCacheContext,
  BookCacheContextProvider,
  BookCacheContextType,
} from "@/components/providers/BookCacheContextProvider";
import { LinkContext } from "@/components/providers/LinkProvider";
import {
  SelectedStoreContext,
  SelectedStoreContextProvider,
  SelectedStoreContextType,
  StoreType,
} from "@/components/providers/SelectedStoreContextProvider";
import AmazonLink from "@/components/stores/AmazonLink";
import HontoLink from "@/components/stores/HontoLink";
import KinokuniyaLink from "@/components/stores/KinokuniyaLink";
import TweetButton from "@/components/TweetButton";
import { existFlutterInAppWebView } from "@/libs/flutter/flutter_inappwebview";
import flutterClipboard from "@/libs/flutter/flutter_inappwebview_clipboard";
import { BookData } from "@/libs/search_books";
import { checkSharePageUrl, makeShareListPageUrl } from "@/utils/links";
import { makeMarkdownSharePageLinks } from "@/utils/markdown";
import { faCopy, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
type Props = {
  bookData: BookData;
  children?: ReactNode;
};
function BookCellRightMenu({ bookData, children }: Props) {
  const { selectedStore, setSelectedStore }: SelectedStoreContextType =
    useContext(SelectedStoreContext);
  const [isShowSelector, setShowSelector] = useState(false);
  return (
    <div className="flex h-full items-center">
      <div className="flex  justify-center  flex-col">
        <span className="text-center text-slate-500">購入先</span>
        {(() => {
          switch (selectedStore) {
            case "amazon":
              return <AmazonLink isbn={bookData.isbn} />;
            case "honto":
              return <HontoLink isbn={bookData.isbn} />;
            case "kinokuniya":
              return <KinokuniyaLink isbn={bookData.isbn} />;
          }
        })()}
        <button
          className="text-blue-500 mt-1 underline cursor-pointer"
          onClick={() => {
            setShowSelector(true);
          }}
        >
          他のストア...
        </button>
        {(() => {
          if (!isShowSelector) return;
          return (
            <ul className="w-full cursor-pointer text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              <li
                className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
                onClick={() => {
                  setSelectedStore("amazon");
                  setShowSelector(false);
                }}
              >
                Amazon
              </li>
              <li
                className="w-full px-4 py-2 border-b border-gray-200"
                onClick={() => {
                  setSelectedStore("kinokuniya");
                  setShowSelector(false);
                }}
              >
                紀ノ國屋
              </li>
              <li
                className="w-full px-4 py-2 rounded-b-lg"
                onClick={() => {
                  setSelectedStore("honto");
                  setShowSelector(false);
                }}
              >
                Honto
              </li>
            </ul>
          );
        })()}
      </div>
      {children}
    </div>
  );
}
function MainContent() {
  const router = useRouter();
  const { store: _store, books: _books, title: _title } = router.query;
  const context: BookCacheContextType = useContext(BookCacheContext);
  const linkContext = useContext(LinkContext);
  const { selectedStore, setSelectedStore }: SelectedStoreContextType =
    useContext(SelectedStoreContext);
  const [bookList, setBookList] = useState<URL[]>([]);
  const [_errorText, setErrorText] = useState("");
  let displayErrorText = _errorText.split("\n").map((line, i) => {
    return (
      <span key={i}>
        {line}
        <br />
      </span>
    );
  });
  const [listTitle, setListTitle] = useState("無名のリスト");
  const [isEditMode, setIsEditMode] = useState(false);
  let editModeClass = {
    hidden: !isEditMode,
  };
  const [clickedShareButtonText, setClickedShareButtonText] = useState("");
  const [isEditListTitle, setIsEditListTitle] = useState(false);
  useEffect(() => {
    let store: StoreType = (() => {
      let s = typeof _store == "string" ? _store : "";
      switch (s) {
        case "amazon":
        case "honto":
        case "kinokuniya":
          return s;
        default:
          return "amazon";
      }
    })();
    setSelectedStore(store);
    if (typeof _title == "string" && _title != "") setListTitle(_title);
  }, [_store, setSelectedStore, _title]);
  useEffect(() => {
    if (!router.isReady) return;
    try {
      let books: URL[] = [];
      if (Array.isArray(_books)) {
        books = Array.from(new Set(_books)).map(
          (params) =>
            new URL(
              linkContext.makeSharePageUrlFromSearchParams(
                new URLSearchParams(params)
              )
            )
        );
      } else if (typeof _books == "string") {
        let url = new URL(
          linkContext.makeSharePageUrlFromSearchParams(
            new URLSearchParams(_books)
          )
        );
        if (
          url.pathname.split("/")?.[2] !== "share" ||
          url.searchParams.get("isbn") == null
        )
          return;
        books = [url];
      }
      if (books.length > 0) setBookList(books);
      setIsEditMode(books.length == 0);
    } catch {}
  }, [_books, router.isReady]);
  let copyErrorText =
    "コピーしているURLが有効ではありません。\n追加する書籍の情報画面にある「この本を共有する」を押して書籍URLをコピーした状態で押してください。";
  let appendBookList = (url: URL) => {
    try {
      if (!checkSharePageUrl(url)) {
        setErrorText(copyErrorText);
        return;
      }
      let newBookList = Array.from(
        new Set([...bookList.map((x) => x.href), url.href]) //重複削除
      ).map((x) => new URL(x));
      setBookList(newBookList);
      setErrorText("");
    } catch {
      setErrorText(copyErrorText);
    }
  };

  return (
    <div className=" mx-auto mt-1 " style={{ maxWidth: "1200px" }}>
      {(() => {
        if (bookList.length > 0) return;
        return (
          <h3 className="pt-5 text-xl text-center pb-2 text-slate-700">
            <span className="ml-1">
              複数の書籍をまとめて共有することができます。
            </span>
          </h3>
        );
      })()}
      <div role="alert" className={"my-2 " + classNames(editModeClass)}>
        <div className="bg-yellow-500 text-white font-bold rounded-t px-4 py-2 mt-1">
          注意
        </div>
        <div className="border border-t-0 border-yellow-400 rounded-b bg-yellow-100 px-4 py-3 text-yellow-700">
          <ul className="list-disc px-4">
            <li>リストの内容を変更すると共有URLも更新されます!</li>
            <li>
              <b>このページは再読み込みすると元に戻ります。</b>
              <br />
              リストの編集完了後、「共有URLを生成」を押してリストURLをコピーし、メモ帳やNotionなどで保管してください。
            </li>
          </ul>
        </div>
      </div>
      {(() => {
        if (isEditListTitle)
          return (
            <input
              type="text"
              value={listTitle}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={(event) => {
                setListTitle(event.target.value);
              }}
            />
          );
        return (
          <h2
            className={classNames({
              "text-2xl": true,
              underline: isEditMode,
            })}
            onClick={() => {
              if (!isEditMode) return;
              setIsEditListTitle(true);
            }}
          >
            {listTitle}
            <span
              className={classNames({
                "text-sm": true,
                ...editModeClass,
              })}
            >
              (編集)
            </span>
          </h2>
        );
      })()}
      <div>
        <p className="text-end">
          {(() => {
            if (isEditMode)
              return (
                <span>
                  <span
                    className={classNames({
                      hidden: existFlutterInAppWebView(),
                    })}
                  >
                    <button
                      className="mr-1 text-blue-500 underline mb-1"
                      onClick={() => {
                        window.location.href = makeShareListPageUrl(
                          bookList,
                          selectedStore,
                          listTitle
                        );
                      }}
                    >
                      一時保存(リロード)
                    </button>
                    /
                  </span>
                  <button
                    className="mx-1 text-blue-500 underline mb-1"
                    onClick={() => {
                      window.open("./list");
                    }}
                  >
                    新規リスト(別タブ)
                  </button>
                </span>
              );
            return (
              <button
                className="mr-1 text-sm text-blue-500 underline mb-1"
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                リストの追加・編集する
              </button>
            );
          })()}
        </p>
        <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
          {(() => {
            return bookList.map((x, i) => {
              let position: "top" | "center" = i == 0 ? "top" : "center";
              return (
                <BookCell
                  key={x.href}
                  url={x}
                  position={position}
                  headText={String(i + 1)}
                  makeRightElement={(bookData) => {
                    return (
                      <BookCellRightMenu bookData={bookData}>
                        <div className={classNames(editModeClass)}>
                          <button
                            className="text-xl ml-5 text-yellow-600"
                            onClick={() => {
                              let newBookList = [...bookList];
                              newBookList.splice(i, 1);
                              setBookList(newBookList);
                            }}
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        </div>
                      </BookCellRightMenu>
                    );
                  }}
                  onClickTitle={
                    existFlutterInAppWebView()
                      ? undefined
                      : (book) => {
                          let comment = x.searchParams.get("comment") ?? "";
                          window.open(
                            linkContext.makeSharePageUrl(
                              book.isbn,
                              book.from,
                              comment
                            )
                          );
                        }
                  }
                />
              );
            });
          })()}
          <li
            className={
              "w-full px-4 py-2 rounded-b-lg text-center my-2 cursor-pointer " +
              classNames(editModeClass)
            }
          >
            <div>
              <p className="text-secondary">
                リストに追加する書籍を検索 (書籍共有URLも入力できます)
              </p>
              <SearchBookField
                errorText=""
                getBookData={(book) => {
                  appendBookList(
                    new URL(
                      linkContext.makeSharePageUrl(book.isbn, book.from, "")
                    )
                  );
                }}
              />
            </div>
          </li>
        </ul>
      </div>
      <div className="text-center m-3">
        <div className="w-full mt-1">
          <p
            className={classNames({
              "text-end": true,
              hidden: isEditMode,
            })}
          >
            <button
              className="mr-1 text-sm text-blue-500 underline mb-1"
              onClick={() => {
                setIsEditMode(true);
              }}
            >
              リストの追加・編集する
            </button>
          </p>

          <small className="text-red-500">{displayErrorText}</small>
        </div>
      </div>
      <hr className="my-3" />{" "}
      {(() => {
        if (bookList.length == 0) return;
        return (
          <div className="text-center">
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 m-1 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => {
                setIsEditMode(false);
                setIsEditListTitle(false);
                setErrorText("");
                setClickedShareButtonText("共有URLをコピーしました。");
                flutterClipboard.writeText(
                  makeShareListPageUrl(bookList, selectedStore, listTitle)
                );
              }}
            >
              共有URLを生成
            </button>{" "}
            <p className="text-secondary">
              <small>{clickedShareButtonText}</small>
            </p>
            <div className="flex flex-wrap justify-center items-center">
              <div className="m-1">
                <TweetButton
                  text={`「${listTitle}」の共有`}
                  url={makeShareListPageUrl(bookList, selectedStore, listTitle)}
                />
              </div>
              <button
                onClick={() => {
                  setErrorText("");
                  setIsEditMode(false);
                  setClickedShareButtonText(
                    "マークダウン形式でコピーしました。"
                  );
                  flutterClipboard.writeText(
                    makeMarkdownSharePageLinks(
                      bookList.map((url) => {
                        const isbn = url.searchParams.get("isbn") ?? "";
                        return {
                          url: url,
                          bookData: context.bookDataCaches[isbn],
                        };
                      }),
                      selectedStore,
                      listTitle,
                      linkContext
                    )
                  );
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center m-1"
              >
                <FontAwesomeIcon icon={faCopy} className="mr-1" />
                <span>マークダウン形式で共有</span>
              </button>
            </div>
            <small className="text-secondary">
              <b>note</b>や<b>Notion</b>
              などのサイトには「マークダウン形式で共有」がおすすめです!
            </small>
          </div>
        );
      })()}
    </div>
  );
}
let List: NextPage = () => {
  return (
    <SelectedStoreContextProvider>
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
            <div className="w-full px-2 ">
              <MainContent />
            </div>
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
    </SelectedStoreContextProvider>
  );
};
export default List;
