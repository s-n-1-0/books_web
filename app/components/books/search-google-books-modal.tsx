import {
  GoogleBooksApiBookData,
  GoogleBooksApiVolumesResponseData,
} from "@/Interfaces/googlebooks/volumes";
import { searchGoogleBooksApi } from "@/libs/googlebooks";
import { makeSharePageLink } from "@/utils/links";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import ProcessingView from "../processing-view";
import BookThumbnail from "./book-thumbnail";
function _SearchGoogleBooksModal(_: any, ref: Ref<unknown>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [googleBooksResults, setGoogleBooksResults] = useState<
    GoogleBooksApiBookData[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  async function openModal(title: string) {
    setIsLoading(true);
    setIsOpen(true);
    let res = await searchGoogleBooksApi({
      q: {
        intitle: title,
      },
    });
    setSearchTitle(title);
    setGoogleBooksResults(
      (res.data as GoogleBooksApiVolumesResponseData)?.items ?? []
    );
    setIsLoading(false);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));
  if (!isOpen) return <span></span>;
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 overflow-hidden">
      <div className="relative h-5/6 w-full mx-4 lg:mx-0 lg:w-3/4 md:p-4 bg-white rounded-md shadow-xl overflow-y-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-left">
            <b>「{searchTitle}」</b>で検索
          </h3>
          <FontAwesomeIcon
            className="text-3xl p-2 cursor-pointer"
            icon={faXmark}
            onClick={closeModal}
          />
        </div>
        <hr className="mb-3" />
        {(() => {
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
                            ISBN :{" "}
                            {item.volumeInfo.industryIdentifiers[0].identifier}
                          </small>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          );
        })()}
      </div>
    </div>
  );
}
let SearchGoogleBooksModal = forwardRef(_SearchGoogleBooksModal);
export type SearchGoogleBooksModalRefType = {
  openModal: (title: string) => void;
  closeModal: () => void;
};
export default SearchGoogleBooksModal;
