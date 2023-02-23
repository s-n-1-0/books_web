import { searchBook } from "@/libs/search_books";
import { makeSharePageUrl } from "@/utils/links";
import {
  faBarcode,
  faQuestion,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertUrl2Isbn13 } from "asin2isbn";
import classNames from "classnames";
import Link from "next/link";
import { useRef, useState } from "react";
import SearchGoogleBooksModal, {
  SearchGoogleBooksModalRefType,
} from "./search-googlebooks/SearchGoogleBooksModal";
type SearchBookButtonProps = {
  buttonText: string;
  editingText: string;
  onClick: () => void;
};
function SearchBookButton({
  buttonText,
  editingText,
  onClick,
}: SearchBookButtonProps) {
  if (editingText != "")
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2 w-100 whitespace-nowrap"
        onClick={onClick}
      >
        {buttonText}
      </button>
    );
  else return <span></span>;
}
type Props = { errorText: string };
function SearchBookFields({ errorText }: Props) {
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [amazonUrlErrorText, setAmazonUrlErrorText] = useState<string>("");
  const modalRef = useRef<SearchGoogleBooksModalRefType>(null);
  let notsupportedKindleText =
    "Kindle(電子書籍)のURLは現在非対応です。Amazonの商品ページで紙の書籍を選択してください。";
  return (
    <div className="text-center mt-2 mx-auto" style={{ maxWidth: "1250px" }}>
      <div
        className="py-10 text-start px-3 bg-gray-100 relative mx-auto"
        style={{
          height: "80vh",
          maxHeight: "800px",
        }}
      >
        <div className="relative flex flex-col justify-between z-10 h-full">
          <div
            className="bg-white rounded w-fit mx-2 p-2"
            style={{
              fontFamily:
                "'游明朝 Medium','Yu Mincho',YuMincho,'Hiragino Mincho Pro',serif",
            }}
          >
            <h1 className="text-3xl text-my-color md:text-4xl">読書日より</h1>
            <hr className="mt-1" />
            <p className="text-slate-500 text-sm md:text-base">
              登録不要で簡単に書籍を共有することができます。
            </p>
          </div>
          <div className="bg-slate-100 rounded py-4 px-2">
            <p className="text-red-600 text-center">{errorText}</p>

            <div className="w-full">
              <div className="relative mb-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <input
                  className="shadow appearance-none border rounded w-full py-2 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  inputMode="text"
                  placeholder="ISBN、書籍タイトル または URL..."
                  value={editingTitle}
                  onChange={(e) => {
                    setEditingTitle(e.target.value);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key == "Enter") {
                      e.preventDefault();
                      e.currentTarget.blur();
                      let searchText = editingTitle;
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
                          location.href = makeSharePageUrl(
                            bookData.isbn,
                            bookData.from,
                            ""
                          );
                        } else
                          setAmazonUrlErrorText(
                            "書籍を見つけることができませんでした..."
                          );
                      } else modalRef.current?.openModal(searchText);
                    }
                  }}
                />
              </div>
            </div>

            <p
              className={
                "text-secondary text-center text-xs " +
                classNames({
                  hidden: amazonUrlErrorText != "",
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
          <p className="pt-2 px-2 text-white text-end opacity-90">
            <small>
              Painted by{" "}
              <a href="https://www.midjourney.com/" className="underline">
                Midjourney
              </a>
              .
            </small>
          </p>
        </div>

        <div className="absolute py-3 px-1 h-full w-full top-0 right-0">
          <div className="relative h-full w-full">
            <img
              className="object-cover ml-auto z-0 rounded-md h-full w-full"
              src="https://hello.sn-10.net/apps/books/mid_thumbnail.webp"
              alt="Painted by Midjourney"
            />
          </div>
        </div>
      </div>
      <SearchGoogleBooksModal ref={modalRef} />

      <p className="text-center text-secondary">
        <Link href="/ja/help/find">
          <a className="underline">
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            書籍が見つからない場合...
          </a>
        </Link>
      </p>
    </div>
  );
}

export default SearchBookFields;
