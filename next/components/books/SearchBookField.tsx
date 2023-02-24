import {
  existFlutterInAppWebView,
  requestBarcodeReader,
} from "@/libs/flutter/flutter_inappwebview";
import { searchBook } from "@/libs/search_books";
import { BookData, makeSharePageUrl } from "@/utils/links";
import { faBarcode, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertUrl2Isbn13 } from "asin2isbn";
import classNames from "classnames";
import { useContext, useState } from "react";
import { SearchGoogleBooksModalContext } from "../providers/SearchGoogleBooksModalContextProvider";

type Props = {
  errorText: string;
  /** このプロパティを使用するとBookDataを返す代わりに書籍情報ページへの遷移を行いません */
  getBookData?: ((book: BookData) => void) | null;
};
function SearchBookField({ errorText, getBookData }: Props) {
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [amazonUrlErrorText, setAmazonUrlErrorText] = useState<string>("");
  const googleBooksModalContext = useContext(SearchGoogleBooksModalContext);
  let notsupportedKindleText =
    "Kindle(電子書籍)のURLは現在非対応です。Amazonの商品ページで紙の書籍を選択してください。";
  async function search(searchText: string) {
    let isbn: string | null = null;
    //amazon URLチェック(ISBNを取得できるかどうか)
    let res = convertUrl2Isbn13(searchText);
    if (res.isbn != "") isbn = res.isbn;
    else if (res.error == "KINDLE") {
      setAmazonUrlErrorText(notsupportedKindleText);
      return;
    } else if (searchText.startsWith("http")) {
      setAmazonUrlErrorText("無効なURLです。");
      return;
    }

    //ISBNチェック
    if (searchText.startsWith("978")) isbn = searchText;

    //isbn or タイトル検索
    if (isbn) {
      let bookData = await searchBook(isbn);
      if (bookData) {
        if (getBookData) getBookData(bookData);
        else location.href = makeSharePageUrl(bookData.isbn, bookData.from, "");
      } else setAmazonUrlErrorText("書籍を見つけることができませんでした...");
    } else googleBooksModalContext.openModal(searchText, getBookData);
  }
  return (
    <div className="bg-slate-100 px-2 lg:px-4 rounded">
      <p className="text-red-600 text-center">{errorText}</p>

      <div className="flex justify-end items-center w-full">
        <div className="relative mb-1 w-full py-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            className="shadow appearance-none border rounded w-full py-2 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            inputMode="text"
            placeholder="ISBN、書籍タイトル または Amazon URL..."
            value={editingTitle}
            onChange={(e) => {
              setEditingTitle(e.target.value);
            }}
            onKeyDown={async (e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                e.currentTarget.blur();
                search(editingTitle);
              }
            }}
          />
        </div>
        <button
          className={
            "bg-my-color text-white font-bold rounded-lg ml-1 h-8 w-8 " +
            classNames({
              hidden: !existFlutterInAppWebView(),
            })
          }
          onClick={async () => {
            let isbn = await requestBarcodeReader();
            if (isbn != "") search(isbn);
          }}
        >
          <FontAwesomeIcon icon={faBarcode} />
        </button>
      </div>

      <p
        className={
          "text-secondary text-center text-xs " +
          classNames({
            hidden: amazonUrlErrorText != "" || existFlutterInAppWebView(),
          })
        }
      >
        <FontAwesomeIcon icon={faBarcode} className="px-1" />
        バーコードからISBNを読み取る機能は、アプリをダウンロードすると利用可能です!
      </p>
      <div className="mb-2">
        <p className="text-red-600 text-center">{amazonUrlErrorText}</p>

        <div
          className={
            "p-10 mx-auto " +
            classNames({
              hidden: !(amazonUrlErrorText == notsupportedKindleText),
            })
          }
        >
          <img
            src="https://i.gyazo.com/c13353fcbacce087b7dd3a42985d19c0.png"
            style={{
              maxHeight: "89px",
              width: "100%",
              objectFit: "contain",
            }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBookField;
