import { LinkContextType } from "@/components/providers/LinkProvider";
import { StoreType } from "@/components/providers/SelectedStoreContextProvider";
import { BookData } from "@/libs/search_books";
import { makeShareListPageUrl } from "./links";
interface MarkdownSharePageLinkData {
  bookData: BookData;
  url: URL;
}
export function makeMarkdownSharePageLinks(
  dataList: MarkdownSharePageLinkData[],
  store: StoreType,
  listTitle: string,
  linkContext: LinkContextType
) {
  let markdownText = "";
  dataList.forEach((data, i) => {
    let newData = {
      ...data,
      isWriteSiteName: false,
    };
    markdownText += `+ ${makeMarkdownSharePageLink(newData, linkContext)}\n`;
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
export function makeMarkdownSharePageLink(
  {
    bookData,
    comment,
    url: _url,
    isWriteSiteName,
  }: {
    bookData: BookData;
    comment?: string;
    url?: URL;
    isWriteSiteName: boolean;
  },
  linkContext: LinkContextType
) {
  let url = _url
    ? _url.href
    : linkContext.makeSharePageUrl(bookData.isbn, bookData.from, comment ?? "");
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
