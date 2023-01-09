export type SharePageFromDb = "openbd" | "googlebooks";
export function makeSharePageLink(
  isbn: string,
  from: SharePageFromDb,
  comment: string,
  isNoheader: boolean = false
) {
  let url = `${location.origin}/ja/share?isbn=${isbn}&from=${from}`;
  if (comment != "") url += `&comment=${encodeURIComponent(comment)}`;
  if (isNoheader) url += `&noheader`;
  return url;
}
