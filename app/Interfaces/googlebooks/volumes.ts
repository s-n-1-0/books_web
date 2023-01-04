interface GoogleBooksApiBookDataIndustryIdentifier {
  type: "ISBN_10" | "ISBN_13" | "PKEY";
  identifier: string;
}
interface GoogleBooksApiBookDataInfo {
  title: string;
  authors: string[];
  publisher?: string;
  industryIdentifiers: GoogleBooksApiBookDataIndustryIdentifier[];
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
  description?: string;
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
