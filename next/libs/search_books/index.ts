import { convertGoogleBooksData2BookData } from "@/utils/links";
import { searchGoogleBooksApiByIsbn } from "./googlebooks";
import * as openbd from "./openbd";
export type BookDbType = "openbd" | "googlebooks";
export interface BookData {
  title: string;
  author: string;
  thumbnail: string;
  isbn: string;
  publisher: string;
  description: string;
  from: BookDbType;
}

function convertBookDbType(from: string): BookDbType | "" {
  switch (from) {
    case "openbd":
    case "googlebooks":
      return from;
    default:
      return "";
  }
}
/**
 * ISBNを用いて可能な限り探索します。(サムネイルがあるOpenBD優先)
 * @param from 指定がある場合指定したDBのみ探索します。(初期値空文字)
 */
export async function searchBook(
  isbn: string,
  _from: string = ""
): Promise<BookData | null> {
  const from = convertBookDbType(_from);
  let resBookData =
    from == "" || from == "openbd" //未指定またはopenbd検索指定ならopenbdから書籍情報を取得
      ? openbd.convertResponseData2BookData(await openbd.get(isbn))
      : null;
  if (!resBookData && (from == "" || from == "googlebooks")) {
    //未指定(=openbdにない場合)またはgooglebooks指定なら
    let googleBooksData = await searchGoogleBooksApiByIsbn(isbn);
    if (googleBooksData)
      resBookData = convertGoogleBooksData2BookData(googleBooksData);
  }
  return resBookData;
}
