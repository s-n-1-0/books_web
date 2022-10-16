interface GoogleBooksApiBookDataIndustryIdentifier {
  type: string;
  identifier: "ISBN_10" | "ISBN_13" | "PKEY";
}
interface GoogleBooksApiBookDataInfo {
  title: string;
  authors: string[];
  publisher: string;
  industryIdentifiers: GoogleBooksApiBookDataIndustryIdentifier[];
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
}
interface GoogleBooksApiBookData {
  id: string;
  volumeInfo: GoogleBooksApiBookDataInfo;
}
interface GoogleBooksApiVolumesResponseData {
  kind: string;
  totalItems: number;
  items: GoogleBooksApiBookData[];
}

export type { GoogleBooksApiVolumesResponseData, GoogleBooksApiBookData };
