import { StoreType } from "@/contexts/selected_store_context";
import { BookData, makeShareListPageUrl, makeSharePageUrl } from "./links";
interface MarkdownSharePageLinkData {
  bookData: BookData;
  url: URL;
}
export function makeMarkdownSharePageLinks(
  dataList: MarkdownSharePageLinkData[],
  store: StoreType,
  listTitle: string
) {
  let markdownText = "";
  dataList.forEach((data, i) => {
    let newData = {
      ...data,
      isWriteSiteName: false,
    };
    markdownText += `+ ${makeMarkdownSharePageLink(newData)}\n`;
  });
  markdownText +=
    "\n" +
    makeMarkdownLink(
      "リスト一覧 - Share Books",
      makeShareListPageUrl(
        dataList.map((x) => x.url),
        store,
        listTitle
      )
    );
  return markdownText;
}
export function makeMarkdownSharePageLink({
  bookData,
  comment,
  url: _url,
  isWriteSiteName,
}: {
  bookData: BookData;
  comment?: string;
  url?: URL;
  isWriteSiteName: boolean;
}) {
  let url = _url
    ? _url.href
    : makeSharePageUrl(bookData.isbn, bookData.from, comment ?? "");
  let authorText = bookData.author == "" ? "" : `(${bookData.author})`;
  return makeMarkdownLink(
    `「${bookData.title}」${authorText} ${
      isWriteSiteName ? "- Share Books" : ""
    }`,
    url
  );
}
export function makeMarkdownLink(title: string, url: string) {
  return `[${title}](${url})`;
}
