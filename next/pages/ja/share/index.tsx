import BookComment, {
  BookCommentRefType,
} from "@/components/books/BookComment";
import BookThumbnail from "@/components/books/BookThumbnail";
import { Footer } from "@/components/commons/CustomFooter";

import CustomHead from "@/components/commons/CustomHead";
import Header from "@/components/commons/CustomHeader";
import ProcessingView from "@/components/ProcessingView";
import { LinkContext } from "@/components/providers/LinkProvider";
import SharePageStartPanel from "@/components/SharePageStartPanel";
import StoreLinks from "@/components/stores/StoreLinks";
import TweetButton from "@/components/TweetButton";
import { FlutterInAppWebViewCommunicator } from "@/libs/flutter/flutter_inappwebview";
import flutterClipboard from "@/libs/flutter/flutter_inappwebview_clipboard";
import { BookData, searchBookByIsbn } from "@/libs/search_books";
import { makeShareListPageUrl } from "@/utils/links";
import { makeMarkdownSharePageLink } from "@/utils/markdown";
import {
  faCaretDown,
  faCopy,
  faImage,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertIsbn } from "asin2isbn";
import classNames from "classnames";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
interface DisplayBookData extends BookData {
  isbn10: string;
  isbn13: string;
}
const Home: NextPage = () => {
  const router = useRouter();
  const { isbn, from, comment } = router.query;
  const linkContext = useContext(LinkContext);
  const [bookData, _setBookData] = useState<DisplayBookData | null>(null);
  const setBookData = (book: BookData) => {
    _setBookData({
      ...book,
      ...convertIsbn(book.isbn)!,
    });
  };
  const [errorText, setErrorText] = useState<string>("");
  const [isHello, setIsHello] = useState<boolean>(false);
  const [isShowIsbnList, setIsShowIsbnList] = useState(false);
  const [clickedShareButtonText, setClickedShareButtonText] = useState("");
  const commentRef = useRef<BookCommentRefType>(null);
  function updateQueryComment() {
    return typeof comment == "string" ? decodeURIComponent(comment) : "";
  }
  useEffect(() => {
    setUserComment(updateQueryComment());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);
  const [userComment, setUserComment] = useState<string>(updateQueryComment());
  const [flutterInAppWebView, setFlutterInAppWebView] =
    useState<FlutterInAppWebViewCommunicator | null>();
  useEffect(() => {
    if (!router.isReady) return;
    FlutterInAppWebViewCommunicator.build().then((f) =>
      setFlutterInAppWebView(f)
    );
    if (typeof isbn == "string") {
      setIsHello(false);
      let fromDb = typeof from == "string" ? from : "";
      searchBookByIsbn(isbn, fromDb)
        .then((bookData) => {
          if (bookData) {
            setBookData(bookData);
            setIsHello(false);
          } else setErrorText("書籍情報を見つけることができませんでした。");
        })
        .catch(() => {
          setErrorText("通信エラー。時間を置いてからご確認ください。");
        });
    } else {
      //isbn未指定の場合
      setIsHello(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  function makeMainContent() {
    if (isHello || errorText != "") {
      return <SharePageStartPanel errorText={errorText} />;
    }
    if (!bookData) {
      return (
        <div>
          <ProcessingView />
        </div>
      );
    }
    return (
      <div className="mx-auto" style={{ maxWidth: "1250px" }}>
        <div className="flex items-center justify-center pt-5  pb-2">
          {(() => {
            if (bookData.thumbnail == "") return;
            return (
              <span className="mr-2">
                <BookThumbnail src={bookData.thumbnail} />
              </span>
            );
          })()}
          <div>
            <span className="text-3xl">{bookData.title}</span>
            <p className="text-center">
              <span
                className={classNames({
                  hidden: bookData.author == "",
                })}
              >
                著者: {bookData.author}
              </span>
              <span
                className={classNames({
                  hidden: bookData.author == "" || bookData.publisher == "",
                })}
              >
                {" "}
                /{" "}
              </span>
              <span
                className={classNames({
                  hidden: bookData.publisher == "",
                })}
              >
                出版社 :{bookData.publisher}
              </span>
            </p>
          </div>
        </div>
        <p className="text-secondary flex content-center justify-center items-center">
          <span className="pr-2">ISBN</span>
          <p className="flex flex-col">
            <span>
              10桁 : {bookData.isbn10}{" "}
              <button
                onClick={() => {
                  setIsShowIsbnList(!isShowIsbnList);
                }}
                className={
                  "text-xl " +
                  classNames({
                    hidden: isShowIsbnList,
                  })
                }
              >
                <FontAwesomeIcon icon={faCaretDown} />
              </button>
            </span>
            <span className={classNames({ hidden: !isShowIsbnList })}>
              13桁 : {bookData.isbn13}
            </span>
          </p>
        </p>

        <p className="text-center mt-1 line-clamp-5">{bookData.description}</p>
        <div className="p-10">
          <BookComment
            comment={userComment}
            onChange={(newValue: string) => {
              setUserComment(newValue);
            }}
            ref={commentRef}
          />
          <div className="text-center mt-6 mb-10">
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => {
                setClickedShareButtonText("共有URLをコピーしました。");
                commentRef?.current?.finishEditing();
                flutterClipboard.writeText(
                  linkContext.makeSharePageUrl(
                    bookData.isbn,
                    bookData.from,
                    userComment
                  )
                );
                flutterInAppWebView?.sendMessage({
                  key: "completedSharing",
                  data: { type: "default", url: "" },
                });
              }}
            >
              この本を共有する
              <br />
              <small>URLをコピー</small>
            </button>
            {(() => {
              if (clickedShareButtonText != "")
                return (
                  <p className="text-center text-secondary">
                    <small>{clickedShareButtonText}</small>
                  </p>
                );
            })()}
            <div>
              <div className="mt-3 flex justify-center items-center flex-wrap">
                {(() => {
                  let twText = "";
                  if (userComment != "") {
                    twText =
                      (userComment.length > 75
                        ? userComment.slice(0, 70) + "..."
                        : userComment) +
                      "\n\n" +
                      `書籍「${bookData.title}」`;
                  } else {
                    twText = `書籍「${bookData.title}」`;
                  }
                  let twUrl = linkContext.makeSharePageUrl(
                    bookData.isbn,
                    bookData.from,
                    userComment
                  );
                  return <TweetButton text={twText} url={twUrl} />;
                })()}
                <button
                  onClick={() => {
                    setClickedShareButtonText(
                      "マークダウン形式でコピーしました。"
                    );
                    commentRef?.current?.finishEditing();
                    flutterClipboard.writeText(
                      makeMarkdownSharePageLink(
                        {
                          bookData,
                          comment: userComment,
                          isWriteSiteName: true,
                        },
                        linkContext
                      )
                    );
                    flutterInAppWebView?.sendMessage({
                      key: "completedSharing",
                      data: { type: "default", url: "" },
                    });
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center m-2"
                >
                  <FontAwesomeIcon icon={faCopy} className="mr-1" />
                  <span>マークダウン形式で共有</span>
                </button>
                <button
                  onClick={async () => {
                    //TODO: webからのアクセスは非表示かアプリに誘導する
                    flutterInAppWebView?.requestCardGeneration({
                      ...bookData,
                      comment: userComment,
                    });
                  }}
                  className={
                    classNames({
                      hidden: !linkContext.checkExperimental(),
                    }) +
                    " bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full inline-flex items-center m-2"
                  }
                >
                  <FontAwesomeIcon icon={faImage} className="mr-1" />
                  <span>カードを作成</span>
                </button>
              </div>
              <small className="text-secondary">
                <b>note</b>や<b>Notion</b>
                などのサイトには「マークダウン形式で共有」がおすすめです!
              </small>
            </div>
            <a
              href={makeShareListPageUrl(
                [
                  new URL(
                    linkContext.makeSharePageUrl(
                      bookData.isbn,
                      bookData.from,
                      userComment
                    )
                  ),
                ],
                "amazon",
                ""
              )}
              className="underline text-blue-500 mt-2"
            >
              他の書籍とまとめて共有する
            </a>
          </div>
          <hr />
          <div className="pt-2">
            <h1 className="text-xl">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
              書店を探す
            </h1>
            <small>
              紙の書籍と電子書籍両方のリンクが含まれます。選択にご注意ください。
            </small>
            <StoreLinks isbn={bookData.isbn} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <CustomHead
        title="本を知り合いに紹介する - 読書日より/Share Books"
        description="登録不要で簡単に書籍を共有・紹介できるサイトです。書籍レビューや書店へのリンクを含む共有URLを発行することができます。ご自由にお使いください。"
        pageUrl="https://books.sn-10.net/ja/share"
        ogType="product"
      ></CustomHead>
      <Header></Header>
      <main>
        <div className="w-full px-2 ">{makeMainContent()}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
