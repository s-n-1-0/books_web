import { makeSharePageLink } from "@/utils/links";
import {
  faBarcode,
  faBook,
  faPaperPlane,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertUrl2Isbn13 } from "asin2isbn";
import Link from "next/link";
import { useRef, useState } from "react";
import SearchGoogleBooksModal, {
  SearchGoogleBooksModalRefType,
} from "./search-google-books-modal";
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
    <div className="text-center">
      <hr className="mt-4" />
      <div className="py-10 text-start pl-8 bg-gray-100">
        <h1 className="text-4xl text-my-color">
          <FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
          書籍を紹介する
        </h1>
        <p className="text-slate-500">
          登録不要で書籍をお知り合いに共有することができます。
        </p>
      </div>
      <hr className="mb-4" />
      <h3 className="pt-5 text-xl pb-2 text-slate-700">
        <FontAwesomeIcon icon={faBook} />
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
            <FontAwesomeIcon icon={faBarcode} />
            <span className="ml-1">
              書籍のバーコードからISBNを読み取る機能は今後実装予定です。
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
