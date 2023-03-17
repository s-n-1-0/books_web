import { OpenBDGetResponseData } from "@/Interfaces/openbd/get";
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
/**
 * ISBNを用いて可能な限り探索します。(サムネイルがあるOpenBD優先)
 */
export async function searchBook(isbn: string): Promise<BookData | null> {
  let openbdRes: { data: OpenBDGetResponseData } = await openbd.get(isbn);
  let resBookData = openbdRes.data?.[0];
  if (resBookData) {
    return {
      title: resBookData.summary.title,
      author: resBookData.summary.author,
      isbn: resBookData.summary.isbn,
      publisher: resBookData.summary.publisher,
      thumbnail: resBookData.summary.cover,
      description:
        resBookData.onix.CollateralDetail.TextContent?.[0].Text ?? "",
      from: "openbd",
    };
  } else {
    //openbdにないならgooglebooks
    let book = await searchGoogleBooksApiByIsbn(isbn);
    if (book) {
      return convertGoogleBooksData2BookData(book);
    } else return null;
  }
}
