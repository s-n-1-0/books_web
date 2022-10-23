import { faAmazon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertIsbn, convertIsbn2Url } from "asin2isbn";
import TwButton from "../tw-button";

type Props = {
  isbn: string;
};
function BookLinks({ isbn }: Props) {
  let amazonUrl = convertIsbn2Url(isbn);
  let isbn13 = isbn.length == 13 ? isbn : convertIsbn(isbn);
  return (
    <div className="flex justify-center items-center m-3">
      <a href={amazonUrl} target="_blank" rel="noopener noreferrer">
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
      <a
        href={"https://www.kinokuniya.co.jp/f/dsg-01-" + isbn13}
        target="_blank"
        rel="noopener noreferrer"
        className="m-2"
      >
        <img
          src="https://corp.kinokuniya.co.jp/wp-content/uploads/2020/07/logo.png"
          alt="紀伊國屋ロゴ"
          style={{
            height: "125px",
            width: "inherit",
            objectFit: "contain",
          }}
        />
      </a>
      <a
        href={"https://honto.jp/netstore/search.html?isbn=" + isbn13}
        target="_blank"
        rel="noopener noreferrer"
        className="m-2"
      >
        <img
          src="https://i.gyazo.com/ee86b2469f712858a4e1b0ce17684939.png"
          alt="紀伊國屋ロゴ"
          style={{
            height: "50px",
            width: "inherit",
            objectFit: "contain",
          }}
        />
      </a>
    </div>
  );
}

export default BookLinks;
