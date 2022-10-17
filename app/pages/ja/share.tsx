import BookComment from "@/components/books/book-comment";
import SearchBookFields from "@/components/books/search-book-fields";
import Header from "@/components/header";
import ProcessingView from "@/components/processing-view";
import { OpenBDGetResponseData } from "@/Interfaces/openbd/get";
import { searchGoogleBooksApiByIsbn } from "@/libs/googlebooks";
import * as openbd from "@/libs/openbd";
import { makeSharePageLink, SharePageFromDb } from "@/utils/links";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
interface BookData {
  title: string;
  author: string;
  thumbnail: string;
  isbn: string;
  publisher: string;
  from: SharePageFromDb;
}
const Home: NextPage = () => {
  const router = useRouter();
  const { isbn, from, comment } = router.query;
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [errorText, setErrorText] = useState<string>("");
  const [isHello, setIsHello] = useState<boolean>(false);
  function updateQueryComment() {
    return typeof comment == "string" ? decodeURIComponent(comment) : "";
  }
  useEffect(() => {
    setUserComment(updateQueryComment());
  }, [comment]);
  const [userComment, setUserComment] = useState<string>(updateQueryComment());

  useEffect(() => {
    if (typeof isbn == "string") {
      let fromDb = typeof from == "string" ? from : "";
      switch (fromDb) {
        case "opendb":
        default:
          openbd
            .get(isbn)
            .then((res: { data: OpenBDGetResponseData }) => {
              let resBookData = res.data?.[0];
              if (resBookData) {
                setBookData({
                  title: resBookData.summary.title,
                  author: resBookData.summary.author,
                  isbn: resBookData.summary.isbn,
                  publisher: resBookData.summary.publisher,
                  thumbnail: resBookData.summary.cover,
                  from: "openbd",
                });
                setIsHello(false);
              } else setErrorText("書籍情報を見つけることができませんでした。");
            })
            .catch(() => {
              setErrorText("通信エラー。時間を置いてからご確認ください。");
            });
          break;
        case "googlebooks":
          searchGoogleBooksApiByIsbn(isbn)
            .then((book) => {
              if (book) {
                setBookData({
                  title: book.volumeInfo.title,
                  author: book.volumeInfo.authors.join(" "),
                  isbn: isbn,
                  publisher: book.volumeInfo.publisher,
                  thumbnail: book.volumeInfo?.imageLinks?.smallThumbnail ?? "",
                  from: "googlebooks",
                });
                setIsHello(false);
              } else setErrorText("書籍情報を見つけることができませんでした。");
            })
            .catch(() => {
              setErrorText("通信エラー。時間を置いてからご確認ください。");
            });
          break;
      }
    } else {
      //isbn未指定の場合
      setIsHello(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, isbn]);

  function makeMainContent() {
    if (isHello || errorText != "") {
      return <SearchBookFields errorText={errorText}></SearchBookFields>;
    }
    if (!bookData) {
      return (
        <div>
          <ProcessingView />
        </div>
      );
    }
    return (
      <div>
        <h1 className="text-center pt-5 text-3xl pb-2">{bookData.title}</h1>
        <p className="text-center">
          著者 : {bookData.author} / 出版社 :{bookData.publisher}
        </p>
        <p className="text-secondary text-center">
          <span className="text-2xl">ISBN : {bookData.isbn}</span>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded ml-2"
            onClick={() => {
              navigator.clipboard.writeText(bookData.isbn);
            }}
          >
            コピー
          </button>
        </p>
        <div className="p-10">
          <BookComment
            comment={userComment}
            onChange={(newValue: string) => {
              setUserComment(newValue);
            }}
          />
          <div className="text-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => {
                navigator.clipboard.writeText(
                  makeSharePageLink(bookData.isbn, bookData.from, userComment)
                );
              }}
            >
              この本を共有する
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>本を友だちに紹介する - Share Books</title>
        <meta
          name="description"
          content="書籍共有できるURLを発行します。ご自由にお使いください。"
        />
        <link rel="icon" href="/images/icon.png" />
      </Head>
      <Header></Header>
      <main className="container mx-auto">{makeMainContent()}</main>

      <footer>
        <hr />
        <p className="text-center">
          <a className="underline" href="https://hello.sn-10.net">
            sn-10.net
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
