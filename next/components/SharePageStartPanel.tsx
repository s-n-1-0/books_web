import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SearchBookField from "./books/SearchBookField";

type Props = { errorText: string };
function SharePageStartPanel({ errorText }: Props) {
  return (
    <div className="text-center mt-2 mx-auto" style={{ maxWidth: "1250px" }}>
      <div
        className="py-10 text-start px-3 bg-gray-100 relative mx-auto"
        style={{
          height: "80vh",
          minHeight: "500px",
          maxHeight: "800px",
        }}
      >
        <div className="relative flex flex-col justify-between z-10 h-full">
          <div
            className="bg-white rounded w-fit mx-2 p-2"
            style={{
              fontFamily:
                "'游明朝 Medium','Yu Mincho',YuMincho,'Hiragino Mincho Pro',serif",
            }}
          >
            <h1 className="text-3xl text-my-color md:text-4xl">読書日より</h1>
            <hr className="mt-1" />
            <p className="text-slate-500 text-sm md:text-base">
              登録不要で簡単に書籍を共有することができます。
            </p>
          </div>
          <div
            className="mx-auto w-full"
            style={{
              maxWidth: "800px",
            }}
          >
            <SearchBookField errorText={errorText} />
          </div>
          <p className="pt-2 px-2 text-white text-end opacity-90">
            <small>
              Painted by{" "}
              <a href="https://www.midjourney.com/" className="underline">
                Midjourney
              </a>
              .
            </small>
          </p>
        </div>

        <div className="absolute py-3 px-1 h-full w-full top-0 right-0">
          <div className="relative h-full w-full">
            <img
              className="object-cover ml-auto z-0 rounded-md h-full w-full"
              src="/mid_thumbnail.webp"
              alt="Painted by Midjourney"
            />
          </div>
        </div>
      </div>

      <p className="text-center text-secondary">
        <Link href="/ja/help/find">
          <a className="underline">
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            書籍が見つからない場合...
          </a>
        </Link>
      </p>
    </div>
  );
}

export default SharePageStartPanel;
