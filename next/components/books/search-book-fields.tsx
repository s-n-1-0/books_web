import { makeSharePageLink } from "@/utils/links";
import {
  faArrowUpRightFromSquare,
  faBarcode,
  faBook,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertUrl2Isbn13 } from "asin2isbn";
import Link from "next/link";
import { useRef, useState } from "react";
import SearchGoogleBooksModal, {
  SearchGoogleBooksModalRefType,
} from "./search-googlebooks/modal";
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
  const [editingIsbn, setEdittingIsbn] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [editingAmazonUrl, setEdittingAmazonUrl] = useState<string>("");
  const [amazonUrlErrorText, setAmazonUrlErrorText] = useState<string>("");
  const modalRef = useRef<SearchGoogleBooksModalRefType>(null);
  let notsupportedKindleText =
    "Kindle(電子書籍)のURLは現在非対応です。Amazonの商品ページで紙の書籍を選択してください。";
  return (
    <div className="text-center mt-4 mx-auto" style={{ maxWidth: "1250px" }}>
      <div
        className="py-10 text-start px-4 bg-gray-100 relative mx-auto"
        style={{
          height: "calc( 100vw / 1250 * 400)",
          minHeight: "200px",
          maxHeight: "400px",
          fontFamily:
            "'游明朝 Medium','Yu Mincho',YuMincho,'Hiragino Mincho Pro',serif",
        }}
      >
        <div className="relative z-10 bg-white bg-opacity-90 w-fit rounded ml-2 p-2">
          <h1 className="text-3xl text-my-color md:text-4xl">
            <span className="inline-flex justify-center">
              <FontAwesomeIcon
                icon={faBook}
                className="mr-1 text-xl md:text-2xl"
              />
            </span>
            読書日より
          </h1>
          <hr className="mt-1" />
          <p className="text-slate-500 text-sm md:text-base">
            登録不要で簡単に書籍を共有することができます。
          </p>
        </div>
        <div className="absolute py-4 px-2 h-full w-full top-0 right-0">
          <div className="relative h-full w-full">
            <img
              className="object-cover ml-auto z-0 rounded-md h-full w-full"
              src="https://hello.sn-10.net/apps/books/mid_thumbnail.webp"
              alt="Painted by Midjourney"
            />
            <p className="absolute bottom-0 right-0 p-2 text-white opacity-90">
              <small>
                Painted by{" "}
                <a href="https://www.midjourney.com/" className="underline">
                  Midjourney
                </a>
                .
              </small>
            </p>
          </div>
        </div>
      </div>
      <hr className="mb-4" />
      <h3 className="pt-5 text-xl pb-2 text-slate-700">
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        <span className="ml-1">以下の方法で書籍を共有することができます。</span>
      </h3>
      <p className="text-red-600">{errorText}</p>
      <div className="mb-4">
        <div className="flex items-end">
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
              ISBNで共有
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              inputMode="email"
              placeholder="9784798056920"
              value={editingIsbn}
              onChange={(e) => {
                setEdittingIsbn(e.target.value);
              }}
            />
          </div>
          <SearchBookButton
            buttonText="共有"
            editingText={editingIsbn}
            onClick={() => {
              location.href = makeSharePageLink(editingIsbn, "openbd", "");
            }}
          />
        </div>
        <p className="text-left text-secondary">
          <small>
            🎉
            <span className="ml-1">
              <FontAwesomeIcon icon={faBarcode} />
              バーコードからISBNを読み取る機能は、アプリをダウンロードすると利用可能です!
            </span>
          </small>
        </p>
      </div>
      <div className="mb-4">
        <div className="flex items-end">
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
              タイトルで調べる
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              inputMode="text"
              placeholder="この素晴らしい..."
              value={editingTitle}
              onChange={(e) => {
                setEditingTitle(e.target.value);
              }}
            />
          </div>
          <SearchBookButton
            buttonText="調べる"
            editingText={editingTitle}
            onClick={() => {
              modalRef.current?.openModal(editingTitle);
            }}
          />
        </div>
        <p className="text-left text-secondary">
          <small>
            タイトル検索で書籍が見つからない場合はISBN検索をお試しください。
          </small>
        </p>
        <SearchGoogleBooksModal ref={modalRef} />
      </div>
      <div className="mb-4">
        <div className="flex items-end">
          <div className="w-full">
            <label className="block text-gray-700 text-sm mb-2 text-left">
              <span className="font-bold">Amazon URLで共有</span>
              <small className="ml-2 text-secondary">
                商品ページのURLを張り付けてください
              </small>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              inputMode="url"
              placeholder="https://www.amazon.co.jp/dp/4088831209/..."
              value={editingAmazonUrl}
              onChange={(e) => {
                setEdittingAmazonUrl(e.target.value);
              }}
            />
          </div>
          <SearchBookButton
            buttonText="共有"
            editingText={editingAmazonUrl}
            onClick={() => {
              let res = convertUrl2Isbn13(editingAmazonUrl);
              if (res.isbn != "")
                location.href = makeSharePageLink(res.isbn, "openbd", "");
              else if (res.error == "KINDLE") {
                setAmazonUrlErrorText(notsupportedKindleText);
              } else setAmazonUrlErrorText("無効なURLです。");
            }}
          />
        </div>
        <p className="text-red-600">{amazonUrlErrorText}</p>
        {(() => {
          if (amazonUrlErrorText == notsupportedKindleText)
            return (
              <div className="p-10 mx-auto">
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
            );
          return;
        })()}
      </div>
      <p className="text-left text-secondary">
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
