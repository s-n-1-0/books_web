import { BookDbType } from "@/libs/search_books";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext } from "react";
export interface LinkContextType {
  makeSharePageUrl(isbn: string, from: BookDbType, comment: string): string;
  makeSharePageUrlFromSearchParams(params: URLSearchParams): string;
}

export const LinkContext = createContext<LinkContextType>({
  makeSharePageUrl(isbn: string, from: BookDbType, comment: string) {
    return "";
  },
  makeSharePageUrlFromSearchParams(params: URLSearchParams) {
    return "";
  },
});

export const LinkContextProvider = ({ children }: { children?: ReactNode }) => {
  const context = useContext(LinkContext);
  const router = useRouter();
  function makeSharePageUrlFromSearchParams(params: URLSearchParams) {
    return `${location.origin}/ja/share?${params.toString()}`;
  }
  return (
    <LinkContext.Provider
      value={{
        ...context,
        makeSharePageUrlFromSearchParams,
        makeSharePageUrl(isbn, from, comment) {
          const params = new URLSearchParams();
          params.append("isbn", isbn);
          params.append("from", from);
          if (comment != "")
            params.append("comment", encodeURIComponent(comment));
          return makeSharePageUrlFromSearchParams(params);
        },
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};
