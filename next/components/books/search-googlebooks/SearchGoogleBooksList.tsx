import {
  GoogleBooksApiBookData,
  GoogleBooksApiVolumesResponseData,
} from "@/Interfaces/googlebooks/volumes";
import { searchGoogleBooksApi } from "@/libs/googlebooks";
import {
  convertGoogleBooksData2BookData,
  makeSharePageUrl,
} from "@/utils/links";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import ProcessingView from "../../ProcessingView";
import { BookCell } from "../BookCell";
type Props = {
  isNoheader: boolean;
};
function _SearchGoogleBooksList({ isNoheader }: Props, ref: Ref<unknown>) {
  const [googleBooksResults, setGoogleBooksResults] = useState<
    GoogleBooksApiBookData[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  async function search(title: string) {
    setIsLoading(true);
    let res = await searchGoogleBooksApi({
      q: {
        intitle: title,
      },
    });
    setGoogleBooksResults(
      (res.data as GoogleBooksApiVolumesResponseData)?.items ?? []
    );
    setIsLoading(false);
  }
  useImperativeHandle(ref, () => ({
    search,
  }));

  if (isLoading)
    return (
      <div className="text-center">
        <ProcessingView />
      </div>
    );
  return (
    <div>
      {" "}
      <ul className="m-2 text-left text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer">
        {googleBooksResults
          .filter((item) => {
            let id = item?.volumeInfo?.industryIdentifiers?.[0];
            if (!id) return false;
            return id.type == "ISBN_10" || id.type == "ISBN_13";
          })
          .map((item, i) => {
            let position: "top" | "bottom" | "center" =
              i == 0
                ? "top"
                : i == googleBooksResults.length - 1
                ? "bottom"
                : "center";
            return (
              <BookCell
                key={item.id}
                onClick={() => {
                  let url = makeSharePageUrl(
                    item.volumeInfo.industryIdentifiers[0].identifier,
                    "googlebooks",
                    "",
                    isNoheader
                  );
                  window.open(url, "_blank");
                }}
                bookData={convertGoogleBooksData2BookData(item)}
                position={position}
              />
            );
          })}
      </ul>
      {(() => {
        if (googleBooksResults.length == 0)
          return (
            <p className="text-center text-secondary">
              該当する書籍がヒットしませんでした...
            </p>
          );
      })()}
    </div>
  );
}
export let SearchGoogleBooksList = forwardRef(_SearchGoogleBooksList);
export type SearchGoogleBooksListRefType = {
  search: (title: string) => Promise<void>;
};
