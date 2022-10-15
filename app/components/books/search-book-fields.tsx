import { convertUrl2Isbn13 } from "asin2isbn";
import { useState } from "react";
type SearchBookButtonProps = { editingText: string; onClick: () => void };
function SearchBookButton({ editingText, onClick }: SearchBookButtonProps) {
  if (editingText != "")
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2 w-100 whitespace-nowrap"
        onClick={onClick}
      >
        調べる
      </button>
    );
  else return <span></span>;
}
type Props = { errorText: string };
function SearchBookFields({ errorText }: Props) {
  const [editingIsbn, setEdittingIsbn] = useState<string>("");
  const [editingAmazonUrl, setEdittingAmazonUrl] = useState<string>("");
  const [amazonUrlErrorText, setAmazonUrlErrorText] = useState<string>("");
  return (
    <div className="text-center">
      <h1 className="pt-5 text-3xl pb-2">書籍情報を共有</h1>
      <p className="text-red-600">{errorText}</p>
      <div className="mb-4 flex items-end">
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
            ISBNで調べる
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="9784798056920"
            value={editingIsbn}
            onChange={(e) => {
              setEdittingIsbn(e.target.value);
            }}
          />
        </div>
        <SearchBookButton
          editingText={editingIsbn}
          onClick={() => {
            location.href = "./share?isbn=" + editingIsbn;
          }}
        />
      </div>
      <div className="mb-4">
        <div className="flex items-end">
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Amazon URLで調べる
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="https://www.amazon.co.jp/dp/4088831209/..."
              value={editingAmazonUrl}
              onChange={(e) => {
                setEdittingAmazonUrl(e.target.value);
              }}
            />
          </div>
          <SearchBookButton
            editingText={editingAmazonUrl}
            onClick={() => {
              try {
                let res = convertUrl2Isbn13(editingAmazonUrl);
                if (res.isbn != "") location.href = "./share?isbn=" + res.isbn;
                else if (res.error == "KINDLE") {
                  setAmazonUrlErrorText(
                    "Kindle(電子書籍)は非対応です。紙の書籍のURLを指定してください。"
                  );
                } else setAmazonUrlErrorText("無効なURLです。");
              } catch (err) {
                setAmazonUrlErrorText("無効なURLです。");
              }
            }}
          />
        </div>
        <p className="text-red-600">{amazonUrlErrorText}</p>
      </div>
    </div>
  );
}

export default SearchBookFields;
