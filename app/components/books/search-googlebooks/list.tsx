import {
  GoogleBooksApiBookData,
  GoogleBooksApiVolumesResponseData,
} from "@/Interfaces/googlebooks/volumes";
import { searchGoogleBooksApi } from "@/libs/googlebooks";
import { makeSharePageLink } from "@/utils/links";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import ProcessingView from "../../processing-view";
import BookThumbnail from "../book-thumbnail";
function _SearchGoogleBooksList(_: any, ref: Ref<unknown>) {
  const [googleBooksResults, setGoogleBooksResults] = useState<
    GoogleBooksApiBookData[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  async function search(title: string) {
    console.log("test");
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
    <ul className="m-2 text-left text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer">
      {googleBooksResults
        .filter((item) => {
          let id = item?.volumeInfo?.industryIdentifiers?.[0];
          if (!id) return false;
          return id.type == "ISBN_10" || id.type == "ISBN_13";
        })
        .map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => {
                let url = makeSharePageLink(
                  item.volumeInfo.industryIdentifiers[0].identifier,
                  "googlebooks",
                  ""
                );
                window.open(url, "_blank");
              }}
              className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center">
                <BookThumbnail
                  src={item.volumeInfo.imageLinks?.smallThumbnail ?? ""}
                />
                <div className="pl-2">
                  {item.volumeInfo.title}
                  <br />
                  <small className="text-secondary">
                    ISBN : {item.volumeInfo.industryIdentifiers[0].identifier}
                  </small>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
export let SearchGoogleBooksList = forwardRef(_SearchGoogleBooksList);
export type SearchGoogleBooksListRefType = {
  search: (title: string) => Promise<void>;
};
