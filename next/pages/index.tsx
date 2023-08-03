import CustomHead from "@/components/commons/CustomHead";
import Header from "@/components/commons/CustomHeader";
import { LinkContext } from "@/components/providers/LinkProvider";
import { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";
const Home: NextPage = () => {
  const linkContext = useContext(LinkContext);
  return (
    <div>
      <CustomHead
        title="Share Books"
        pageUrl="https://books.sn-10.net"
        ogType="website"
      ></CustomHead>
      <Header isMenu={false}></Header>
      <main>
        <div className="w-full px-2 py-3 text-center">
          <div className="py-20">
            <Link href={linkContext.makeUrlFromSearchParams("/ja/share")}>
              <a className="inline-block text-xl px-4 py-2 leading-none border rounded border-black hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
                本を探す
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Home;
