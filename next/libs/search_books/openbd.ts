import { OpenBDGetResponseData } from "@/Interfaces/openbd/get";
//@ts-ignore
import openbd from "openbd";
import { BookData } from ".";
async function get(isbn: string | Array<string>) {
  let res: { data: OpenBDGetResponseData } = await openbd.get(isbn);
  return res.data;
}
/**
 * openbdのapi形式からbookdata形式に変換(できないならnull)
 */
export function convertResponseData2BookData(
  resData: OpenBDGetResponseData
): BookData | null {
  let resBookData = resData?.[0];
  if (resBookData) {
    return {
      title: resBookData.summary.title,
      author: resBookData.summary.author,
      isbn: resBookData.summary.isbn,
      publisher: resBookData.summary.publisher,
      thumbnail: resBookData.summary.cover,
      description:
        resBookData.onix.CollateralDetail.TextContent?.[0].Text ?? "",
      from: "openbd",
    };
  }
  return null;
}
export { get };
