//@ts-ignore
import openbd from "openbd";
function get(isbn: string | Array<string>) {
  return openbd.get(isbn);
}

export { get };
