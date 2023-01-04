import {
  SearchGoogleBooksList,
  SearchGoogleBooksListRefType,
} from "@/components/books/search-googlebooks/list";
import CustomHead from "@/components/head";
import Header from "@/components/header";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";

const Search: NextPage = () => {
  const router = useRouter();
  var { title: _title } = router.query;
  let title = typeof _title == "string" ? _title : "";
  const listRef = useRef<SearchGoogleBooksListRefType>(null);
  listRef.current?.search(title);
  return (
    <div>
      <CustomHead
        title="Share Books"
        pageUrl="https://books.sn-10.net/app/search"
        ogType="website"
        noindex={true}
      ></CustomHead>
      <Header isMenu={false}></Header>
      <main>
        <div className="w-full px-2 py-3">
          <SearchGoogleBooksList ref={listRef} />
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
export default Search;
