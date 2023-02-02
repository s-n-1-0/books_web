import { OpenBDGetResponseData } from "@/Interfaces/openbd/get";
import { searchGoogleBooksApiByIsbn } from "@/libs/googlebooks";
import * as openbd from "@/libs/openbd";

export type SharePageFromDb = "openbd" | "googlebooks";
export function makeSharePageUrl(
  isbn: string,
  from: SharePageFromDb,
  comment: string,
  isNoheader: boolean = false
) {
  let url = `${location.origin}/ja/share?isbn=${isbn}&from=${from}`;
  if (comment != "") url += `&comment=${encodeURIComponent(comment)}`;
  if (isNoheader) url += `&noheader`;
  return url;
}
export interface BookData {
  title: string;
  author: string;
  thumbnail: string;
  isbn: string;
  publisher: string;
  description: string;
  from: SharePageFromDb;
}
/**
 * URLから書籍情報を取得します。
 * @param url 有効なURL
 */
export function convertSharePageUrl2BookData(url: URL) {
  let isbn = url.searchParams.get("isbn") ?? "";
  let from = url.searchParams.get("from") ?? "";
  return convertSharePageParams2BookData(isbn, from);
}
/**
 * URL Paramsから書籍情報を取得します。
 */
export async function convertSharePageParams2BookData(
  isbn: string,
  from: string
): Promise<BookData | null> {
  switch (from) {
    case "opendb":
    default:
      return openbd.get(isbn).then((res: { data: OpenBDGetResponseData }) => {
        let resBookData = res.data?.[0];
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
        } else return null;
      });
    case "googlebooks":
      return searchGoogleBooksApiByIsbn(isbn).then((book) => {
        if (book) {
          return {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors.join(" "),
            isbn: isbn,
            publisher: book.volumeInfo.publisher ?? "",
            thumbnail: book.volumeInfo?.imageLinks?.smallThumbnail ?? "",
            description: book.volumeInfo.description ?? "",
            from: "googlebooks",
          };
        } else return null;
      });
  }
  return Promise.resolve(null);
}
