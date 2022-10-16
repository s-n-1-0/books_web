import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
function _SearchGoogleBooksModal(_: any, ref: Ref<unknown>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function openModal() {
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
      <div className="relative h-5/6 w-full mx-4 lg:mx-0 lg:w-3/4 md:p-4 bg-white rounded-md shadow-xl overflow-y-scroll">
        <div className="flex justify-end">
          <FontAwesomeIcon
            className="text-3xl"
            icon={faXmark}
            onClick={closeModal}
          />
        </div>
        ここにList
      </div>
    </div>
  );
}
let SearchGoogleBooksModal = forwardRef(_SearchGoogleBooksModal);
export type SearchGoogleBooksModalRefType = {
  openModal: () => void;
  closeModal: () => void;
};
export default SearchGoogleBooksModal;
