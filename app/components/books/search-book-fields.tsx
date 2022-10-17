import { makeSharePageLink } from "@/utils/links";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertUrl2Isbn13 } from "asin2isbn";
import Image from "next/image";
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
    <div className="text-center mx-2">
      <h1 className="pt-5 text-3xl pb-2">書籍情報を共有</h1>
      <p className="text-red-600">{errorText}</p>
      <hr className="mb-4" />
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
              makeSharePageLink(editingIsbn, "openbd", "");
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
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Amazon URLで共有
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
              <div className="p-10">
                <Image
                  src="/images/guides/amazon-pepper-book-ss.png"
                  width={439}
                  height={89}
                  alt=""
                />
              </div>
            );
          return;
        })()}
      </div>
    </div>
  );
}

export default SearchBookFields;
