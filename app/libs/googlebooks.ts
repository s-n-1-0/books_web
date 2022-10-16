import axios from "axios";
let googleBooksUrl = "https://www.googleapis.com/books/v1/volumes";

interface GoogleBooksApiRequest {
  q: {
    intitle: string;
  };
  startIndex?: number;
}
export function searchGoogleBooksApi(query: GoogleBooksApiRequest) {
  return axios.get(
    `${googleBooksUrl}?q=intitle:${encodeURI(query.q.intitle)}&startIndex=${
      query.startIndex ?? 0
    }`
  );
}
