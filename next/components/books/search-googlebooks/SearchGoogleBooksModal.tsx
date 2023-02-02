import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";
import {
  SearchGoogleBooksList,
  SearchGoogleBooksListRefType,
} from "./SearchGoogleBooksList";
function _SearchGoogleBooksModal(_: any, ref: Ref<unknown>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const googlebooksListRef = useRef<SearchGoogleBooksListRefType>(null);
  async function openModal(title: string) {
    setIsOpen(true);
    setSearchTitle(title);
    process.nextTick(() => {
      console.log(googlebooksListRef.current);
      googlebooksListRef.current?.search(title);
    });
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
    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 overflow-hidden z-20">
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
        <SearchGoogleBooksList ref={googlebooksListRef} isNoheader={false} />
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
