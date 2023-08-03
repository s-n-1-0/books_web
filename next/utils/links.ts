import { StoreType } from "@/components/providers/SelectedStoreContextProvider";
import { GoogleBooksApiBookData } from "@/Interfaces/googlebooks/volumes";
import { BookData, searchBookByIsbn } from "@/libs/search_books";

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
  return searchBookByIsbn(isbn, from);
}
