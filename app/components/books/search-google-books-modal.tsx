import {
  GoogleBooksApiBookData,
  GoogleBooksApiVolumesResponseData,
} from "@/Interfaces/googlebooks/volumes";
import { searchGoogleBooksApi } from "@/libs/googlebooks";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import BookThumbnail from "./book-thumbnail";
function _SearchGoogleBooksModal(_: any, ref: Ref<unknown>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [googleBooksResults, setGoogleBooksResults] = useState<
    GoogleBooksApiBookData[]
  >([]);
  async function openModal(title: string) {
    let res = await searchGoogleBooksApi({
      q: {
        intitle: title,
      },
    });
    setSearchTitle(title);
    setGoogleBooksResults(
      (res.data as GoogleBooksApiVolumesResponseData)?.items ?? []
    );
    setIsOpen(true);
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
        <div className="flex justify-end">
          <FontAwesomeIcon
            className="text-3xl p-2 cursor-pointer"
            icon={faXmark}
            onClick={closeModal}
          />
        </div>
        <h3 className="text-left">
          <b>「{searchTitle}」</b>で検索
        </h3>
        <hr className="my-3" />
        <ul className="m-2 text-left text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer">
          {googleBooksResults
            .filter((item) => {
              let id = item?.volumeInfo?.industryIdentifiers?.[0];
              return id.type == "ISBN_10" || id.type == "ISBN_13";
            })
            .map((item) => {
              return (
                <a
                  key={item.id}
                  href={
                    "/ja/share?isbn=" +
                    item.volumeInfo.industryIdentifiers[0].identifier
                  }
                  target="_blank"
                  className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600"
                  rel="noreferrer"
                >
                  <div className="flex items-center">
                    <BookThumbnail
                      src={item.volumeInfo.imageLinks.smallThumbnail}
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
                </a>
              );
            })}
        </ul>
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
