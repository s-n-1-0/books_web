import { callStoreEvent } from "@/libs/analytics/events";
import { convertIsbn } from "asin2isbn";

interface Props {
  isbn: string;
}

function HontoLink({ isbn }: Props) {
  let isbn13 = isbn.length == 13 ? isbn : convertIsbn(isbn) ?? isbn;
  return (
    <a
      href={"https://honto.jp/netstore/search.html?isbn=" + isbn13}
      target="_blank"
      rel="noopener noreferrer"
      className="m-2"
      onClick={() => {
        callStoreEvent({ storeName: "amazon", isbn });
      }}
    >
      <img
        src="https://i.gyazo.com/ee86b2469f712858a4e1b0ce17684939.png"
        alt="hontoロゴ"
        style={{
          height: "50px",
          width: "inherit",
          objectFit: "contain",
        }}
      />
    </a>
  );
}
export default HontoLink;
