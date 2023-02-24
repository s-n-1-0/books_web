import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createContext,
  forwardRef,
  ReactNode,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  SearchGoogleBooksList,
  SearchGoogleBooksListRefType,
} from "../books/SearchGoogleBooksList";
function _SearchGoogleBooksModal(_: any, ref: Ref<unknown>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const googlebooksListRef = useRef<SearchGoogleBooksListRefType>(null);
  async function openModal(title: string) {
    setIsOpen(true);
    setSearchTitle(title);
    process.nextTick(() => {
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
        <div className="flex justify-between items-center mb-1">
          <p className="flex justify-end w-full m-1">
            <input
              type="text"
              value={searchTitle}
              className="w-full inline-block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              onChange={(event) => {
                setSearchTitle(event.target.value);
              }}
            />
            <button
              className="bg-my-color text-white font-bold py-1 px-3 rounded-lg ml-1"
              onClick={() => {
                process.nextTick(() => {
                  googlebooksListRef.current?.search(searchTitle);
                });
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </p>
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
export interface SearchGoogleBooksModalContextType {
  openModal: (title: string) => void;
  closeModal: () => void;
}

export const SearchGoogleBooksModalContext =
  createContext<SearchGoogleBooksModalContextType>({
    openModal: (tittle: string) => {},
    closeModal: () => {},
  });

export const SearchGoogleBooksModalContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const modalRef = useRef<SearchGoogleBooksModalContextType>(null);

  const newContext: SearchGoogleBooksModalContextType = {
    openModal(title) {
      modalRef.current?.openModal(title);
    },
    closeModal() {
      modalRef.current?.closeModal;
    },
  };

  return (
    <SearchGoogleBooksModalContext.Provider value={newContext}>
      <SearchGoogleBooksModal ref={modalRef} />
      {children}
    </SearchGoogleBooksModalContext.Provider>
  );
};
