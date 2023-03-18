/**
 * 任意テキストからISBN、タイトルを抽出するテスト
 * SearchDataのformatパターン分のテストを実施すること
 */
import { expect, test } from "@jest/globals";
import { extractSearchData, SearchData } from "../index";
let makeAnsObj = (ans: SearchData) => ans; //予測変換用関数
test("extractSearchData : ISBN", () => {
  //isbn10
  expect(extractSearchData("4088834348")).toEqual(
    makeAnsObj({
      isbn13: "9784088834344",
      title: null,
      format: "ISBN",
    })
  );
  //isbn13
  expect(extractSearchData("9784088834344")).toEqual(
    makeAnsObj({
      isbn13: "9784088834344",
      title: null,
      format: "ISBN",
    })
  );
});
test("extractSearchData : URL->ISBN", () => {
  //Mysite
  expect(
    extractSearchData(
      location.origin + "/ja/share?isbn=4092272405&from=googlebooks"
    )
  ).toEqual(
    makeAnsObj({
      isbn13: "9784092272408",
      title: null,
      format: "MySite",
    })
  );

  //amazon(有効)
  expect(
    extractSearchData(
      "https://www.amazon.co.jp/%E5%91%AA%E8%A1%93%E5%BB%BB%E6%88%A6-22-%E3%82%B8%E3%83%A3%E3%83%B3%E3%83%97%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9-%E8%8A%A5%E8%A6%8B-%E4%B8%8B%E3%80%85/dp/4088834348"
    )
  ).toEqual(
    makeAnsObj({
      isbn13: "9784088834344",
      title: null,
      format: "Valid Amazon URL",
    })
  );
});
test("extractSearchData : タイトル", () => {
  expect(extractSearchData("これはタイトル")).toEqual(
    makeAnsObj({
      isbn13: null,
      title: "これはタイトル",
      format: "Title",
    })
  );
});

test("extractSearchData : エラーケース", () => {
  //Kindle
  expect(
    extractSearchData(
      "https://www.amazon.co.jp/%E5%91%AA%E8%A1%93%E5%BB%BB%E6%88%A6-22-%E3%82%B8%E3%83%A3%E3%83%B3%E3%83%97%E3%82%B3%E3%83%9F%E3%83%83%E3%82%AF%E3%82%B9DIGITAL-%E8%8A%A5%E8%A6%8B%E4%B8%8B%E3%80%85-ebook/dp/B0BT4Q216D/"
    )
  ).toEqual(makeAnsObj({ isbn13: null, title: null, format: "Kindle" }));
  //Othr URL
  expect(extractSearchData("https://twitter.com/home")).toEqual(
    makeAnsObj({
      isbn13: null,
      title: null,
      format: "Other URL",
    })
  );
});
