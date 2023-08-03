import { LinkContextType } from "@/components/providers/LinkProvider";
import { SearchGoogleBooksModalContextType } from "@/components/providers/SearchGoogleBooksModalContextProvider";
import {
  checkSharePageUrl,
  convertGoogleBooksData2BookData,
} from "@/utils/links";
import {
  convertAsin2Isbn13,
  convertIsbn,
  convertUrl2Asin,
  convertUrl2Isbn13,
} from "asin2isbn";
import axios from "axios";
import { searchGoogleBooksApiByIsbn } from "./googlebooks";
import * as openbd from "./openbd";
export type BookDbType = "openbd" | "googlebooks";
export interface BookData {
  title: string;
  author: string;
  thumbnail: string;
  isbn: string;
  publisher: string;
  description: string;
  from: BookDbType;
}

export function checkIsbn10(text: string) {
  return text.length == 10 && !isNaN(Number(text.slice(0, -1)));
}

function convertBookDbType(from: string): BookDbType | "" {
  switch (from) {
    case "openbd":
    case "googlebooks":
      return from;
    default:
      return "";
  }
}
export let notsupportedKindleText =
  "Kindle(電子書籍)のURLは現在非対応です。Amazonの商品ページで紙の書籍を選択してください。";
/**
 * Title: タイトル指定
 * ISBN
 * MySite: このサイトのURL
 * Valid Amazon URL: 有効なAmazon URL
 * Kindle : KindleURL(ISBNを取得できない)
 * Othr URL : 非対応サイトのURL
 */
export type SearchFormatType =
  | "Title"
  | "ISBN"
  | "MySite"
  | "Valid Amazon URL"
  | "Kindle"
  | "Other URL";
export interface SearchData {
  isbn13: string | null;
  title: string | null;

  format: SearchFormatType;
}
/**
 * searchBook関数で渡されるanyTextのサポート形式からISBN13またはタイトルを抽出する。
 * @param anyText
 * @returns
 */
export async function extractSearchData(anyText: string): Promise<SearchData> {
  //特に抽出されない場合はそのままanyTextがタイトルになる
  let retData: SearchData = {
    isbn13: null,
    title: anyText,
    format: "Title",
  };
  const makeEmptySearchData = (format: SearchFormatType): SearchData => {
    return { isbn13: null, title: null, format };
  };
  try {
    //anyTextがURLの場合
    let url = new URL(anyText);
    //共有URLの場合
    if (checkSharePageUrl(url)) {
      let isbn = url.searchParams.get("isbn") ?? null;
      let isbn13 = isbn ? convertIsbn(isbn)?.isbn13 ?? null : null;
      retData = {
        isbn13,
        title: null,
        format: "MySite",
      };
    } else {
      //amazon URLの場合(ISBNを取得できるかどうか)
      let res = convertUrl2Isbn13(anyText);
      if (res.isbn != "") {
        retData = {
          isbn13: res.isbn,
          title: null,
          format: "Valid Amazon URL",
        };
      } else if (res.error == "KINDLE") {
        let isUnsupported = true;
        try {
          console.log(convertUrl2Asin(anyText));
          const resData = (
            await axios.get(
              "https://rails-books-app.onrender.com/amazon_books/convert?asin=" +
                convertUrl2Asin(anyText)
            )
          ).data;
          if (resData["paper_asin"]) {
            const res = convertAsin2Isbn13(resData["paper_asin"]);
            retData = {
              isbn13: res.isbn,
              title: null,
              format: "Valid Amazon URL",
            };
          }
          isUnsupported = false;
        } catch {}
        if (isUnsupported) retData = makeEmptySearchData("Other URL");
      } else if (anyText.startsWith("http"))
        retData = makeEmptySearchData("Other URL");
    }
  } catch {
    //非URL処理
    //ISBNチェック(10桁、13桁)
    if (anyText.startsWith("978") && anyText.length == 13)
      retData = { isbn13: anyText, title: null, format: "ISBN" };
    else if (checkIsbn10(anyText))
      retData = {
        isbn13: convertIsbn(anyText)!.isbn13,
        title: null,
        format: "ISBN",
      };
  }
  return retData;
}
/**
 * 任意テキストから書籍探索
 * @param anyText サポート形式:本サイト共有URL、AmazonURL、ISBN、タイトル
 * @returns エラーテキスト(問題ない場合は空文字)
 */
export async function searchBook(
  anyText: string,
  googleBooksModalContext: SearchGoogleBooksModalContextType,
  linkContext: LinkContextType,
  getBookData: ((book: BookData) => void) | null | undefined
): Promise<string> {
  let errorText = "";
  if (anyText == "") return "";
  const searchData = await extractSearchData(anyText);
  switch (searchData.format) {
    case "ISBN":
    case "MySite":
    case "Valid Amazon URL":
      let bookData = await searchBookByIsbn(searchData.isbn13!);
      if (bookData) {
        if (getBookData) getBookData(bookData);
        else
          location.href = linkContext.makeSharePageUrl(
            bookData.isbn,
            bookData.from,
            ""
          );
      } else errorText = "書籍を見つけることができませんでした...";
      break;
    case "Title":
      googleBooksModalContext.openModal(anyText, getBookData);
      break;
    /* 以下、エラー扱いになるフォーマット */
    case "Other URL":
      errorText = "無効なURLです。";
      break;
  }

  return errorText;
}

/**
 * ISBNを用いて可能な限り書籍探索をします。(サムネイルがあるOpenBD優先)
 * @param from 指定がある場合指定したDBのみ探索します。(初期値空文字)
 */
export async function searchBookByIsbn(
  isbn: string,
  _from: string = ""
): Promise<BookData | null> {
  const from = convertBookDbType(_from);
  let resBookData =
    from == "" || from == "openbd" //未指定またはopenbd検索指定ならopenbdから書籍情報を取得
      ? openbd.convertResponseData2BookData(await openbd.get(isbn))
      : null;
  if (!resBookData && (from == "" || from == "googlebooks")) {
    //未指定(=openbdにない場合)またはgooglebooks指定なら
    let googleBooksData = await searchGoogleBooksApiByIsbn(isbn);
    if (googleBooksData) {
      resBookData = convertGoogleBooksData2BookData(googleBooksData);
      if (from == "googlebooks" && resBookData.thumbnail == "") {
        //googlebooks指定で検索したが、サムネイルが見つからなかった場合openbdでチェックする
        let openbdBookData = openbd.convertResponseData2BookData(
          await openbd.get(isbn)
        );
        resBookData.thumbnail = openbdBookData?.thumbnail ?? "";
      }
    }
  }

  return resBookData;
}
