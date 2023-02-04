import { StoreType } from "@/contexts/selected_store_context";
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
  const params = new URLSearchParams();
  params.append("isbn", isbn);
  params.append("from", from);
  if (comment != "") params.append("comment", encodeURIComponent(comment));
  if (isNoheader) params.append("noheader", "");
  return makeSharePageUrlFromSearchParams(params);
}
export function makeSharePageUrlFromSearchParams(params: URLSearchParams) {
  return `${location.origin}/ja/share?${params.toString()}`;
}
export function checkSharePageUrl(url: URL) {
  if (!url.href.startsWith(location.origin)) return false;
  return !(
    url.pathname.split("/")?.[2] !== "share" ||
    url.searchParams.get("isbn") == null
  );
}
export function makeShareListPageUrl(
  books: URL[],
  store: StoreType,
  title: string
) {
  const params = new URLSearchParams();
  books.forEach((url) => params.append("books", url.searchParams.toString()));
  params.append("store", store);
  params.append("title", title);
  return `${location.origin}/ja/share/list?${params.toString()}`;
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
            author: book.volumeInfo.authors?.join(" ") ?? "",
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
