import {
  SearchGoogleBooksList,
  SearchGoogleBooksListRefType,
} from "@/components/books/search-googlebooks/list";
import CustomHead from "@/components/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const Search: NextPage = () => {
  const router = useRouter();
  var { title: _title } = router.query;
  let title = typeof _title == "string" ? _title : "";
  const listRef = useRef<SearchGoogleBooksListRefType>(null);
  useEffect(() => {
    if (!router.isReady || title == "") return;
    listRef.current?.search(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <div>
      <CustomHead
        title="Share Books"
        pageUrl="https://books.sn-10.net/app/search"
        ogType="website"
        noindex={true}
      ></CustomHead>
      <main>
        <div className="w-full px-2 py-3">
          <SearchGoogleBooksList ref={listRef} isNoheader={true} />
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
