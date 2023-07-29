import { BookDbType } from "@/libs/search_books";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext } from "react";
export interface LinkContextType {
  makeSharePageUrl(isbn: string, from: BookDbType, comment: string): string;
  makeUrlFromSearchParams(
    relativePath: string,
    params?: URLSearchParams
  ): string;
  checkExperimental(): boolean;
}

export const LinkContext = createContext<LinkContextType>({
  makeSharePageUrl(isbn: string, from: BookDbType, comment: string) {
    return "";
  },
  makeUrlFromSearchParams(relativePath: string, params: URLSearchParams) {
    return "";
  },
  checkExperimental(): boolean {
    return false;
  },
});

export const LinkContextProvider = ({ children }: { children?: ReactNode }) => {
  const context = useContext(LinkContext);
  const router = useRouter();
  function checkExperimental() {
    return "experimental" in router.query;
  }
  function makeUrlFromSearchParams(
    relativePath: string,
    params = new URLSearchParams()
  ) {
    if (checkExperimental()) {
      params.set("experimental", "");
    }
    if (relativePath[0] != "/") relativePath = "/" + relativePath;
    return router.isReady
      ? `${location.origin}${relativePath}?${params.toString()}`
      : "";
  }
  return (
    <LinkContext.Provider
      value={{
        ...context,
        makeUrlFromSearchParams,
        checkExperimental,
        makeSharePageUrl(isbn, from, comment) {
          const params = new URLSearchParams();
          params.append("isbn", isbn);
          params.append("from", from);
          if (comment != "")
            params.append("comment", encodeURIComponent(comment));
          return makeUrlFromSearchParams("/ja/share", params);
        },
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};
