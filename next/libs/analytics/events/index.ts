import { isRelease } from "@/build_conf";

export type StoreNameType = "amazon" | "honto" | "kinokuniya";
interface StoreEvent {
  storeName: StoreNameType;
  isbn13: string;
}
export function callStoreEvent(store: StoreEvent) {
  if (!isRelease) return;
  gtag("event", "to_store", {
    event_category: store.storeName,
    event_label: store.isbn13,
    value: "1",
  });
}
