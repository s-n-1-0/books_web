import CustomHead from "@/components/head";
import Header from "@/components/header";
import {
  faBarcode,
  faMagnifyingGlass,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <CustomHead
        title="ヘルプ:本・書店が見つからない - Share Books"
        pageUrl="https://books.sn-10.net/ja/help/find"
        ogType="article"
      ></CustomHead>
      <Header></Header>
      <main>
        <div className="w-full px-2 py-3">
          <div className="py-2">
            <h1 className="text-2xl text-my-color">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
              書籍を探す
            </h1>
            <div className="ml-2">
              書籍は
              <Link href="/ja/share">
                <a className="underline">検索ページ</a>
              </Link>
              よりISBN(書籍についている主に978から始まる番号)や書籍名、Amazon
              URLから検索することができます。
              <br />
              アプリを利用することで
              <FontAwesomeIcon icon={faBarcode} className="mx-1" />
              バーコードから読み取ることもできます。
            </div>
          </div>
          <div className="py-2">
            <h1 className="text-2xl text-my-color">
              <FontAwesomeIcon icon={faQuestion} className="mr-2" />
              書籍が見つからない
            </h1>
            <div className="ml-2">
              本サイトはISBNが付与されている日本語の書籍を主に対応しています。しかし、一部書籍は検索してもヒットしない可能性があります。
              もしそのような書籍を発見した場合、フォームへご報告いただけると幸いです。
              <p className="text-center text-xl text-my-color my-8">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdnbTsFOQfNkmUFMZ-BeJTnphk5K1Zme4o9FgUh_8sNV9jxZA/formResponse"
                  className="underline"
                >
                  書籍報告フォーム
                </a>
              </p>
            </div>
          </div>
          <div className="py-2">
            <h1 className="text-2xl text-my-color">
              <FontAwesomeIcon icon={faQuestion} className="mr-2" />
              書店が見つからない
            </h1>
            <div className="ml-2">
              現在Amazon、紀伊國屋、Hontoなど大手書店のみ対応しています。書店追加の希望がございましたらフォームへご報告いただけると幸いです。
              <br />
              <p className="text-center text-xl text-my-color my-8">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdnbTsFOQfNkmUFMZ-BeJTnphk5K1Zme4o9FgUh_8sNV9jxZA/formResponse"
                  className="underline"
                >
                  書店報告フォーム
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <hr />
        <p className="text-center">
          <a className="underline" href="https://hello.sn-10.net">
            sn-10.net
          </a>
        </p>
      </footer>
    </div>
  );
};
export default Home;
