export type SharePageFromDb = "openbd" | "googlebooks";
export function makeSharePageLink(isbn: string, from: SharePageFromDb) {
  return `${location.origin}/ja/share?isbn=${isbn}&from=${from}`;
}
