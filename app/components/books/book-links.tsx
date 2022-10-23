import { faAmazon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertIsbn2Url } from "asin2isbn";
import TwButton from "../tw-button";

type Props = {
  isbn: string;
};
function BookLinks({ isbn }: Props) {
  return (
    <div className="flex justify-center m-3">
      <a
        href={(() => {
          return convertIsbn2Url(isbn);
        })()}
      >
        <TwButton
          color={{
            color: "bg-neutral-500",
            hoverColor: "hover:bg-neutral-700",
          }}
        >
          <span>
            <FontAwesomeIcon icon={faAmazon} />
            <span className="ml-2">Amazon</span>
          </span>
        </TwButton>
      </a>
    </div>
  );
}

export default BookLinks;
