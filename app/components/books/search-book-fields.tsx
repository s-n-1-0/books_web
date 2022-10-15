import { useState } from "react";

type Props = { errorText: string };
function SearchBookFields({ errorText }: Props) {
  const [editingIsbn, setEdittingIsbn] = useState<string>("");
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
        {(() => {
          if (editingIsbn != "")
            return (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2 w-100 whitespace-nowrap"
                onClick={() => {
                  location.href = "./share?isbn=" + editingIsbn;
                }}
              >
                調べる
              </button>
            );
          else return;
        })()}
      </div>
    </div>
  );
}

export default SearchBookFields;
