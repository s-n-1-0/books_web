import { BookData, makeSharePageUrl } from "./links";

export function makeMarkdownSharePageLink(bookData: BookData, comment: string) {
  let url = makeSharePageUrl(bookData.isbn, bookData.from, comment);
  let authorText = bookData.author == "" ? "" : `(${bookData.author})`;
  return makeMarkdownLink(`「${bookData.title}」${authorText}`, url);
}
export function makeMarkdownLink(title: string, url: string) {
  return `[${title} - Share Books](${url})`;
}
