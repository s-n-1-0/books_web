import { callStoreEvent } from "@/libs/analytics/events";
import { convertIsbn } from "asin2isbn";

interface Props {
  isbn: string;
}

function KinokuniyaLink({ isbn }: Props) {
  let isbn13 = isbn.length == 13 ? isbn : convertIsbn(isbn) ?? isbn;
  return (
    <a
      href={"https://www.kinokuniya.co.jp/f/dsg-01-" + isbn13}
      target="_blank"
      rel="noopener noreferrer"
      className="m-2"
      onClick={() => {
        callStoreEvent({ storeName: "kinokuniya", isbn });
      }}
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
  );
}
export default KinokuniyaLink;
