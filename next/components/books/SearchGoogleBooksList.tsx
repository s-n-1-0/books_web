import {
  GoogleBooksApiBookData,
  GoogleBooksApiVolumesResponseData,
} from "@/Interfaces/googlebooks/volumes";
import { sendMessage } from "@/libs/flutter/flutter_inappwebview";
import flutterClipboard from "@/libs/flutter/flutter_inappwebview_clipboard";
import { searchGoogleBooksApi } from "@/libs/search_books/googlebooks";
import {
  BookData,
  convertGoogleBooksData2BookData,
  makeSharePageUrl,
} from "@/utils/links";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import ProcessingView from "../ProcessingView";
import TwButton from "../TwButton";
import { BookCell } from "./BookCell";

type RightDefaultCellElementProps = {
  bookData: BookData;
};
function RightDefaultCellElement({ bookData }: RightDefaultCellElementProps) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div
      className="flex flex-col justify-end"
      onClick={(e) => {
        flutterClipboard.writeText(
          makeSharePageUrl(bookData.isbn, bookData.from, "")
        );
        sendMessage({
          key: "completedSharing",
          data: { type: "default", url: "" },
        });
        setIsCopied(true);
        e.stopPropagation();
      }}
    >
      <FontAwesomeIcon className="text-my-color" icon={faCopy} />
      <span
        className={classNames({
          hidden: !isCopied,
        })}
      >
        <small className="text-secondary">コピー!</small>
      </span>
    </div>
  );
}
type Props = {
  /** このプロパティが使用された場合SearchGoogleBookListは選択モードになります。 */
  selectModeFunc?: ((book: BookData) => void) | null;
};
function _SearchGoogleBooksList({ selectModeFunc }: Props, ref: Ref<unknown>) {
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
      <ul className="m-2 text-left text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer">
        {googleBooksResults
          .filter((item) => {
            let id = item?.volumeInfo?.industryIdentifiers?.[0];
            if (!id) return false;
            return id.type == "ISBN_10" || id.type == "ISBN_13";
          })
          .map((item, i) => {
            let bookData = convertGoogleBooksData2BookData(item);
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
                  if (selectModeFunc) return;
                  let url = makeSharePageUrl(
                    item.volumeInfo.industryIdentifiers[0].identifier,
                    "googlebooks",
                    ""
                  );
                  window.open(url, "_blank");
                }}
                bookData={bookData}
                position={position}
                headText={String(i + 1)}
                makeRightElement={() => {
                  if (selectModeFunc)
                    return (
                      <div className="flex items-center h-full">
                        <TwButton
                          color={{
                            color: "bg-neutral-700",
                            hoverColor: "hover:bg-neutral-900",
                          }}
                          onClick={() => {
                            console.log(selectModeFunc);
                            selectModeFunc(bookData);
                          }}
                        >
                          <span>選択</span>
                        </TwButton>
                      </div>
                    );
                  return <RightDefaultCellElement bookData={bookData} />;
                }}
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
export type SearchGoogleBooksListRefType = Props & {
  search: (title: string) => Promise<void>;
};
