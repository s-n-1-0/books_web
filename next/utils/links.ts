import { StoreType } from "@/components/providers/SelectedStoreContextProvider";
import { GoogleBooksApiBookData } from "@/Interfaces/googlebooks/volumes";
import { OpenBDGetResponseData } from "@/Interfaces/openbd/get";
import { searchGoogleBooksApiByIsbn } from "@/libs/googlebooks";
import * as openbd from "@/libs/openbd";

export type SharePageFromDb = "openbd" | "googlebooks";
export function makeSharePageUrl(
  isbn: string,
  from: SharePageFromDb,
  comment: string
) {
  const params = new URLSearchParams();
  params.append("isbn", isbn);
  params.append("from", from);
  if (comment != "") params.append("comment", encodeURIComponent(comment));
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
export function convertGoogleBooksData2BookData({
  volumeInfo,
}: GoogleBooksApiBookData): BookData {
  return {
    title: volumeInfo.title,
    author: volumeInfo.authors?.join(" ") ?? "",
    isbn: volumeInfo.industryIdentifiers[0].identifier,
    publisher: volumeInfo.publisher ?? "",
    thumbnail: volumeInfo?.imageLinks?.smallThumbnail ?? "",
    description: volumeInfo.description ?? "",
    from: "googlebooks",
  };
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
          return convertGoogleBooksData2BookData(book);
        } else return null;
      });
  }
  return Promise.resolve(null);
}
