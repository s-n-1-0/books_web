import { callStoreEvent } from "@/libs/analytics/events";
import { faAmazon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertIsbn2Url } from "asin2isbn";
import TwButton from "../tw-button";

interface Props {
  isbn: string;
}
function AmazonLink({ isbn }: Props) {
  let amazonUrl = convertIsbn2Url(isbn);
  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        callStoreEvent({ storeName: "amazon", isbn });
      }}
    >
      <TwButton
        color={{
          color: "bg-neutral-700",
          hoverColor: "hover:bg-neutral-900",
        }}
      >
        <span>
          <FontAwesomeIcon icon={faAmazon} />
          <span className="ml-2">Amazon</span>
        </span>
      </TwButton>
    </a>
  );
}
export default AmazonLink;
