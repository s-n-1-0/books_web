import SearchBookFields from "@/components/books/search-book-fields";
import Header from "@/components/header";
import ProcessingView from "@/components/processing-view";
import { OpenBDBookData, OpenBDGetResponseData } from "@/Interfaces/openbd/get";
import * as openbd from "@/libs/openbd";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
const Home: NextPage = () => {
  const router = useRouter();
  const { isbn } = router.query;
  const [bookData, setBookData] = useState<OpenBDBookData | null>(null);
  const [errorText, setErrorText] = useState<string>("");
  let isHello = false;
  if (typeof isbn == "string") {
    openbd
      .get(isbn)
      .then((res: { data: OpenBDGetResponseData }) => {
        let resBookData = res.data?.[0];
        if (resBookData) setBookData(resBookData);
        else setErrorText("書籍情報を見つけることができませんでした。");
      })
      .catch(() => {
        setErrorText("通信エラー。時間を置いてからご確認ください。");
      });
  } else {
    //isbn未指定の場合
    isHello = true;
  }

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
        <h1 className="text-center pt-5 text-3xl pb-2">
          {bookData.summary.title}
        </h1>
        <p className="text-center">
          著者 : {bookData.summary.author} / 出版社 :
          {bookData.summary.publisher}
        </p>
        <p className="text-secondary text-center">
          <span className="text-2xl">ISBN : {bookData.summary.isbn}</span>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded ml-2"
            onClick={() => {
              navigator.clipboard.writeText(bookData.summary.isbn);
            }}
          >
            コピー
          </button>
        </p>
        <div className="text-center p-10">
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={() => {
              navigator.clipboard.writeText(
                `${location.origin + location.pathname}?isbn=${
                  bookData.summary.isbn
                }`
              );
            }}
          >
            この本を共有する
          </button>
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
