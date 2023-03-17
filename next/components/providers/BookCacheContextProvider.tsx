import { BookData } from "@/libs/search_books";
import { createContext, ReactNode, useContext, useState } from "react";

export interface BookCacheContextType {
  bookDataCaches: { [isbn: string]: BookData };
  addBookData: (isbn: string, bookData: BookData) => void;
}

export const BookCacheContext = createContext<BookCacheContextType>({
  bookDataCaches: {},
  addBookData: (isbn: string, bookData: BookData) => {},
});

export const BookCacheContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const context: BookCacheContextType = useContext(BookCacheContext);
  const [bookDataCaches, setBookDataCaches] = useState(context.bookDataCaches);

  const newContext: BookCacheContextType = {
    bookDataCaches: bookDataCaches,
    addBookData(isbn, bookData) {
      if (!(isbn in bookDataCaches)) {
        let newCaches = { ...bookDataCaches };
        newCaches[isbn] = bookData;
        setBookDataCaches(newCaches);
      }
    },
  };

  return (
    <BookCacheContext.Provider value={newContext}>
      {children}
    </BookCacheContext.Provider>
  );
};
