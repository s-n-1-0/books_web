import { BookData } from "@/libs/search_books";
import { convertSharePageUrl2BookData } from "@/utils/links";
import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import {
  BookCacheContext,
  BookCacheContextType,
} from "../providers/BookCacheContextProvider";
import BookThumbnail from "./BookThumbnail";

type Props = {
  onClick?: () => void;
  url?: URL;
  bookData?: BookData;
  headText?: string;
  onClickTitle?: (bookData: BookData) => void;
  position: "top" | "bottom" | "center";
  makeRightElement?: (bookData: BookData) => JSX.Element;
};
export function BookCell({
  url,
  bookData: _bookData,
  position,
  headText,
  onClick,
  onClickTitle,
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
            <span
              className={classNames({
                "mr-0.5": headText != "",
              })}
            >
              {headText ?? ""}
            </span>
            {(() => {
              if (bookData.thumbnail == "")
                return <span className="mr-2"></span>;
              return <BookThumbnail src={bookData.thumbnail} mode="small" />;
            })()}

            <div className="pl-0.5 line-clamp-2">
              <span
                className={
                  "text-sm sm:text-base " +
                  classNames({
                    underline: onClickTitle,
                    "cursor-pointer": onClickTitle,
                  })
                }
                onClick={() => {
                  if (onClickTitle) onClickTitle(bookData);
                }}
              >
                {bookData.title}
              </span>
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
          className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"
          onClick={onClick}
        >
          {makeCellUi()}
        </li>
      );
    case "center":
      return (
        <li
          className="w-full px-4 py-2 border-b border-gray-200"
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
