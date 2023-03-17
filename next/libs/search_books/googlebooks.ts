import { GoogleBooksApiVolumesResponseData } from "@/Interfaces/googlebooks/volumes";
import axios from "axios";
let googleBooksUrl = "https://www.googleapis.com/books/v1/volumes";

interface GoogleBooksApiRequest {
  q: {
    intitle?: string;
    isbn?: string;
  };
  startIndex?: number;
}
export function searchGoogleBooksApi(query: GoogleBooksApiRequest) {
  let url = `${googleBooksUrl}?q=`;
  let q = query.q;
  let isQ = false;
  if (q?.intitle) {
    isQ = true;
    url += `intitle:${encodeURI(q.intitle)}`;
  }
  if (q?.isbn) {
    if (isQ) url += "+";
    isQ = true;
    url += "isbn:" + q.isbn;
  }
  return axios.get(`${url}&startIndex=${query.startIndex ?? 0}`);
}

export async function searchGoogleBooksApiByIsbn(isbn: string) {
  let res = await searchGoogleBooksApi({
    q: {
      isbn,
    },
  });
  let data = res.data as GoogleBooksApiVolumesResponseData;
  let book = (data?.items ?? []).find((item) => {
    let id = item.volumeInfo.industryIdentifiers.find((id) => {
      return id.identifier == isbn;
    });
    return id;
  });
  return book ?? null;
}
