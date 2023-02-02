import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AmazonLink from "./amazon-link";
import HontoLink from "./honto-link";
import KinokuniyaLink from "./kinokuniya-link";

type Props = {
  isbn: string;
};
function StoreLinks({ isbn }: Props) {
  return (
    <div>
      <div className="flex justify-center items-center m-3">
        <AmazonLink isbn={isbn} />
        <KinokuniyaLink isbn={isbn} />
        <HontoLink isbn={isbn} />
      </div>
      <p className="text-center text-secondary">
        <Link href="/ja/help/find">
          <a className="underline">
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            取り扱い書店の追加をリクエストする...
          </a>
        </Link>
      </p>
    </div>
  );
}

export default StoreLinks;
