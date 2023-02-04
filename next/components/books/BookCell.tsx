import {
  BookCacheContext,
  BookCacheContextType,
} from "@/contexts/book_cache_context";
import { BookData, convertSharePageUrl2BookData } from "@/utils/links";
import { useContext, useEffect, useState } from "react";
import BookThumbnail from "./BookThumbnail";

type Props = {
  onClick?: () => void;
  url?: URL;
  bookData?: BookData;
  position: "top" | "bottom" | "center";
  makeRightElement?: (bookData: BookData) => JSX.Element;
};
export function BookCell({
  url,
  bookData: _bookData,
  position,
  onClick,
  makeRightElement,
}: Props) {
  const context: BookCacheContextType = useContext(BookCacheContext);
  const [bookData, setBookData] = useState<BookData | null>(_bookData ?? null);
  useEffect(() => {
    if (!url) return;
    const isbn = url.searchParams.get("isbn");
    if (isbn && isbn in context.bookDataCaches) {
      setBookData(context.bookDataCaches[isbn]);
    } else {
      convertSharePageUrl2BookData(url).then((data) => {
        if (!data) return;
        context.addBookData(data.isbn, data);
        setBookData(data);
      });
    }
  }, [context, url]);
  function makeCellUi() {
    if (bookData) {
      return (
        <div className="flex justify-between">
          <div className="flex items-center">
            <BookThumbnail src={bookData.thumbnail} />
            <div className="pl-2">
              {bookData.title}
              <br />
              <small className="text-secondary">ISBN : {bookData.isbn}</small>
            </div>
          </div>
          <div>{makeRightElement?.(bookData)}</div>
        </div>
      );
    } else return;
  }
  switch (position) {
    case "top":
      return (
        <li
          className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
          onClick={onClick}
        >
          {makeCellUi()}
        </li>
      );
    case "center":
      return (
        <li
          className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"
          onClick={onClick}
        >
          {makeCellUi()}
        </li>
      );
    case "bottom":
      return (
        <li className="w-full px-4 py-2 rounded-b-lg" onClick={onClick}>
          {makeCellUi()}
        </li>
      );
  }
}
