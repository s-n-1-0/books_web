import { isRelease } from "@/build_conf";
import { convertIsbn } from "asin2isbn";

export type StoreNameType = "amazon" | "honto" | "kinokuniya";
interface StoreEvent {
  storeName: StoreNameType;
  /**
   * ISBN10 or ISBN13
   */
  isbn: string;
}
export function callStoreEvent({ storeName, isbn }: StoreEvent) {
  let isbn13 = isbn.length == 13 ? isbn : convertIsbn(isbn) ?? isbn;
  if (!isRelease) return;
  gtag("event", "to_store", {
    event_category: storeName,
    event_label: isbn13,
    value: "1",
  });
}
